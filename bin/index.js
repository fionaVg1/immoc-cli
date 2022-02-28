#!/usr/bin/env node
const lib = require('immoc-cli-lib')
const argv = require('process').argv;
const command = argv[2];

if (command.startsWith('--') || command.startsWith('-')) {
  //实现参数解析 --version
  const globalOption = command.replace(/--|-/g, '');
  if (globalOption === 'version' || globalOption === 'V') {
    console.log('1.0.0')
  }
} else {
  //注册一个命令 immoc-cli init 和 init --name
  const options = argv.slice(3);
  let [option, param] = options;
  option = option.replace('--', '');
  console.log(options)
  if (command) {
    if (lib[command]) {
      lib[command]({ option, param });
    } else {
      console.log('请输入有效的命令')
    }
  } else {
    console.log('请输入命令！');
  }
}