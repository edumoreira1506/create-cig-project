const { program } = require('commander');
const chalk = require('chalk');
const shell = require('shelljs');

const package = require('../package.json');

const { readFile, saveFile } = require('./file');
const { clone } = require('./repository');

program.version(package.version);

program
  .command('service [service]')
  .description('Create a service using the default template')
  .action((service) => {
    console.log(chalk.green('Creating service: ', service));
    console.log(chalk.green('Cloning template...'));

    clone('git@github.com:edumoreira1506/cig-service-template.git', service);

    const readMeString = readFile('README.md');
    const newReadMeString = readMeString.replace(/cig-service-template/g, service);

    shell.rm('README.md');

    saveFile('README.md', newReadMeString);

    console.log(chalk.green('README edited!'));
    console.log(chalk.green('Editing staging.yml...'));

    const ymlString = readFile('.github/workflows/staging.yml');
    const newYmlString = ymlString.replace(/cig-service-template/g, service);

    shell.rm('.github/workflows/staging.yml');
    shell.rm('-rf', '.git');

    saveFile('.github/workflows/staging.yml', newYmlString);

    console.log(chalk.green('staging.yml edited!'));
    console.log(chalk.green(`${service} created! Run cd ${service}`));
  });

program
  .command('library [library]')
  .description('Create a library using the default template')
  .action((libraryName) => {
    console.log(chalk.green('Creating library: ', libraryName));
    console.log(chalk.green('Cloning template...'));

    clone('git@github.com:edumoreira1506/cig-library-template.git', libraryName);

    const readMeString = `## ${libraryName}`;

    shell.rm('README.md');
    shell.rm('-rf', '.git');

    saveFile('README.md', readMeString);

    console.log(chalk.green('README edited!'));
    console.log(chalk.green(`${libraryName} created! Run cd ${libraryName}`));
  });

program.parse(process.argv);
