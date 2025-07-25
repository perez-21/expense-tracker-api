

class LoginRateLimiter {

  static #instance = null;

  #maxWrongAttemptsByIPperDay = 100;
  #maxConsecutiveFailsByUsernameAndIP = 15;

  #slowBruteByIP;
  #consecutiveFailsByUsernameAndIP;

  constructor(mongooseInstance, mongoConn) {
    if (LoginRateLimiter.#instance) {
      return LoginRateLimiter.#instance;
    }

    // initialization

    this.#slowBruteByIP = new RateLimiterMongo({
      storeClient: mongooseInstance || mongoConn,
      keyPrefix: 'login_fail_ip_per_day',
      points: this.maxWrongAttemptsByIPperDay,
      duration: 60 * 60 * 24,
      blockDuration: 60 * 60 * 24
    });

    this.#consecutiveFailsByUsernameAndIP = new RateLimiterMongo({
      storeClient: mongooseInstance || mongoConn,
      keyPrefix: 'login_fail_consecutive_username_and_ip',
      points: this.maxConsecutiveFailsByUsernameAndIP,
      duration: 60 * 60 * 24 * 90,
      blockDuration: 60 * 60
    });


    LoginRateLimiter.#instance = this;
  }


  get slowBruteByIP() {
    return this.#slowBruteByIP;
  }

  get consecutiveFailsByUsernameAndIP() {
    return this.#consecutiveFailsByUsernameAndIP;
  }

  get maxConsecutiveFailsByUsernameAndIP() {
    return this.#maxConsecutiveFailsByUsernameAndIP;
  }

  get maxWrongAttemptsByIPperDay() {
    return this.#maxWrongAttemptsByIPperDay
  }

  static getUsernameIPkey(username, ip) {
    return `${username}_${ip}`;
  }

}


module.exports = { LoginRateLimiter, }