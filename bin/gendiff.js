#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/gendiff-code.js';

const program = new Command();

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

program.parse();
