const chalk = require('chalk');

const { log } = console;

const theme = {
  success: chalk.bold.green,
  error: chalk.bold.red,
  warning: chalk.bold.yellow
};

const info = (message) => log(message);
const error = (message) => log(theme.error(message));
const success = (message) => log(theme.success(message));
const warning = (message) => log(theme.warning(message));

module.exports = {
  info,
  error,
  success,
  warning
};
