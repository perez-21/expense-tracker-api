const { LoginRateLimiter } = require("./../services/rate-limiters");
const loginRateLimiterService = new LoginRateLimiter(); // don't have to include mongo client because it is already setup in index.js

// Rate Limiting for login endpoint
const maxWrongAttemptsByIPperDay = loginRateLimiterService.maxWrongAttemptsByIPperDay;
const maxConsecutiveFailsByUsernameAndIP = loginRateLimiterService.maxConsecutiveFailsByUsernameAndIP;
const getUsernameIPkey = loginRateLimiterService.getUsernameIPkey;

const slowBruteByIP = loginRateLimiterService.slowBruteByIP;

const consecutiveFailsByUsernameAndIP = loginRateLimiterService.consecutiveFailsByUsernameAndIP;

const limit = async (req, res, next) => {

  const ipAddr = req.ip;
  const usernameIPkey = getUsernameIPkey(req.body.username, ipAddr);
  const [resUsernameAndIP, resSlowByIP] = await Promise.all([
    consecutiveFailsByUsernameAndIP.get(usernameIPkey),
    slowBruteByIP.get(ipAddr),
  ]);

  let retrySecs = 0;

  // Check if IP or Username + IP is already blocked

  if (resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
    retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
  }
  else if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP) {
    retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
  }

  if (retrySecs > 0) {
    res.set('Retry-After', String(retrySecs));
    res.status(429).send('Too Many Requests');
  }

  next();
}

module.exports = { limit }
