#!/usr/bin/env node
const commander = require('commander');
const pkg = require('../package.json');
const program = new commander.Command();
program
  .name(pkg.name)
  .usage('<command>[options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --envName <envName>', '获取环境变量名称');


program.debug;
program.envName;
program.outputHelp();
program.opts();
// command api注册命令
const clone = program.command('clone <source> [destination]');
clone
  .description('clone a repository')
  .option('-f,--force', '是否强制克隆')
  .action((source, destination, cmdObj) => {
    console.log('do clone', source, destination, cmdObj.force);
  })
//addCommand api注册命令
const service = new commander.Command('service');
service
  .command('start [port]')
  .description('start service at some port')
  .action((port) => {
    console.log('do service start', port);
  });
service
  .command('stop')
  .description('stop service')
  .action(() => {
    console.log('stop service')
  })
program.addCommand(service);
program
  .command('install [name]', 'install package', {
    executableFile: 'immoc-cli',
    isDefault: true
  })
  .alias('i');
program
  .arguments('<cmd> [options]')
  .description('test command', {
    cmd: 'command to run',
    options: 'options for command'
  })
  .action(function (cmd, options) {
    console.log(cmd, options)
  });
//高级定制1：自定义help信息
// program.outputHelp();
program.helpInformation = function () {
  return '';
}
program.on('--help', function () {
  console.log('your help information');
});

//高级定制2：实现debug模式
program.on('option:debug', function () {
  if (program.debug) {
    process.env.LOG_LEVEL = 'verbose';
  }
  console.log('debug');
})
console.log(program.helpInformation());

program.parse(program.argv);