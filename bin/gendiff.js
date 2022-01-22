#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import { getPath, genDiff } from '../src/gendiff-code.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', stylish)
  .action((filepath1, filepath2) => {
    console.log(stylish(genDiff(getPath(filepath1), getPath(filepath2))));
  });

program.parse();
