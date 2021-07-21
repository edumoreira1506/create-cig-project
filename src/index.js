const program = require('commander');
const chalk = require('chalk');
const shell = require('shelljs');

const package = require('../package.json');

program.version(package.version);

program
  .command('create-cig-service [service]')
  .description('Create a service')
  .action((service) => {
    console.log(chalk.green('Creating service: ', service));

    shell.exec(`git clone git@github.com:edumoreira1506/cig-service-template.git ${service}`);
  });

program.parse(process.argv);
