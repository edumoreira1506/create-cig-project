const { program } = require('commander');
const chalk = require('chalk');
const shell = require('shelljs');
const { join } = require('path');

const package = require('../package.json');

const { readJson, saveJson } = require('./json');
const { readFile, saveFile } = require('./file')

program.version(package.version);

program
  .command('create-cig-service [service]')
  .description('Create a service')
  .action((service) => {
    console.log(chalk.green('Creating service: ', service));
    console.log(chalk.green('Cloning template...'));

    shell.exec(`git clone git@github.com:edumoreira1506/cig-service-template.git ${service}`);

    const packageJsonPath = join(service, 'package.json');
    const packageJsonData = readJson(packageJsonPath);
    const newPackageJsonData = {
      ...packageJsonData,
      name: service,
      description: '',
      repository: {},
      bugs: {},
      homepage: ''
    }

    console.log(chalk.green('Repository cloned!'));
    console.log(chalk.green('Editing package.json...'));

    saveJson(packageJsonPath, newPackageJsonData);

    console.log(chalk.green('Package.json edited!'));

    shell.cd(service);

    console.log(chalk.green('Installing dependencies...'));

    shell.exec('npm install');

    console.log(chalk.green('Dependencies installed!'))
    console.log(chalk.green('Editing README...'))

    const readMeString = readFile('README.md')
    const newReadMeString = readMeString.replace(/cig-service-template/g, service);

    shell.rm('README.md');

    saveFile('README.md', newReadMeString)

    console.log(chalk.green('README edited!'))
    console.log(chalk.green('Editing staging.yml...'))

    const ymlString = readFile('.github/workflows/staging.yml')
    const newYmlString = ymlString.replace(/cig-service-template/g, service);

    shell.rm('.github/workflows/staging.yml');

    saveFile('.github/workflows/staging.yml', newYmlString)

    console.log(chalk.green('staging.yml edited!'))
    console.log(chalk.green(`${service} created! Run cd ${service}`));
  });

program.parse(process.argv);
