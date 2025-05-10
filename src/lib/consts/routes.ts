// ROUTES.APP.URL
// ROUTES.APP.ADD_FORM.URL
// ROUTES.AUTH.RESET_PASSWORD.URL
const ROUTES = {
  ROOT: { PATH: "/", URL: "/" },
  APP: {
    URL: "/app",
    PATH: "app",
    get ADD_TRANSACTION() {
      return { URL: `${this.URL}/add-transaction` };
    },
    get CHARTS() {
      return { URL: `${this.URL}/charts` };
    },
    get DESKTOP() {
      return { URL: `${this.URL}/desktop` };
    },
    get TRANSACTION_HISTORY() {
      return { URL: `${this.URL}/transaction-history` };
    },
  },
  AUTH: {
    URL: "/auth",
    PATH: "auth",
    get FORGOT_PASSWORD() {
      return { URL: `${this.URL}/forgot-password` };
    },
    get LOGIN() {
      return { URL: `${this.URL}/login` };
    },
    get REGISTER() {
      return { URL: `${this.URL}/register` };
    },
    get RESET_PASSWORD() {
      return { URL: `${this.URL}/reset-password` };
    },
  },
};

export default ROUTES;
