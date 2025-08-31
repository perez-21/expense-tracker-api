const express = require("express");
const router = express.Router();
const authService = require("./../services/auth");
const authMid = require("./../middleware/auth");
const userModel = require("./../models/User");
const loginRateLimit = require("./../middleware/login-rate-limit");




router.post("/login", loginRateLimit.limit, async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    // rate-limiting check
    const loginRateLimiterService = req.app.locals.loginRateLimiterService;
    const slowBruteByIP = loginRateLimiterService.slowBruteByIP;
    const consecutiveFailsByUsernameAndIP = loginRateLimiterService.consecutiveFailsByUsernameAndIP;
    const getUsernameIPkey = loginRateLimiterService.getUsernameIPkey;

    const ipAddr = req.ip;
    const usernameIPkey = getUsernameIPkey(req.body.username, ipAddr);
    const [resUsernameAndIP] = await Promise.all([
      consecutiveFailsByUsernameAndIP.get(usernameIPkey),
    ]);

    if (result.error) {
      if (!(result.errorCode >= 500)) {
        // Consume 1 point from limiters on wrong attempt and block if limits reached
        try {
          const promises = [slowBruteByIP.consume(ipAddr)];
          if (result.errorCode !== 404) {
            // Count failed attempts by Username + IP only for registered users
            promises.push(consecutiveFailsByUsernameAndIP.consume(usernameIPkey));
          }

          await Promise.all(promises);

          res.status(400).end('email or password is wrong');
        } catch (rlRejected) {
          if (rlRejected instanceof Error) {
            throw rlRejected;
          } else {
            res.set('Retry-After', String(Math.round(rlRejected.msBeforeNext / 1000)) || 1);
            res.status(429).send('Too Many Requests');
          }
        }
      }
      return res
        .status(result.errorCode)
        .json({ message: "Failed to login", error: result.error });
    }

    if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
      // Reset on successful authorisation
      await consecutiveFailsByUsernameAndIP.delete(usernameIPkey);
    }
    res
      .status(200)
      .json({ message: "Logged in successfully", access_token: result.token });
  } catch (err) {
    res.status(500).json({ message: "Failed to login" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.register(username, password);
    if (result.error) {
      return res
        .status(result.errorCode)
        .json({ message: "Failed to register", error: result.error });
    }

    res
      .status(200)
      .json({ message: "Registered successfully", access_token: result.token });
  } catch (err) {
    res.status(500).json({ message: "Failed to register" });
  }
});

module.exports = router;
