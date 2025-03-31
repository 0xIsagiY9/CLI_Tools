import { Command } from 'commander';
import PerformOperation from './utils/fetchHandler.js';

const program = new Command();

program
  .name('TMDB_CLI')
  .description(
    'In this project, you will build a simple command line interface (CLI) to fetch data from The Movie Database (TMDB) and display it in the terminal. '
  )
  .version('1.0.0');

program
  .command('get')
  .description('Get Movie')
  .option('-t , --type <string>', 'Type of Movies')
  .action((option) => PerformOperation(option));

program.parse();
