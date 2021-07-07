#!/usr/bin/env node
const commander = require('commander');
const { version, description } = require('./package.json');

commander
  .version(version)
  .description(description)
  .command('duplications', 'Check for code duplications')
  .alias('d');

commander.parse(process.argv);
