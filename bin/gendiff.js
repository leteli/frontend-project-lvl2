#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/gendiff-code.js';
import * as fs from 'fs';
import _ from 'lodash';

const program = new Command();

program
    .argument('<filepath1>')
    .argument('<filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      const data1 = fs.readFileSync(filepath1, 'utf8');
      const data2 = fs.readFileSync(filepath2, 'utf8');
      const obj1 = JSON.parse(data1);
      const obj2 = JSON.parse(data2);
      console.log(genDiff(obj1, obj2));
    });

program.parse();
