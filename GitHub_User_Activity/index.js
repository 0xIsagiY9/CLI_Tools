import { Command } from 'commander';
import performOperation from './utils/fetchHandler.js';

const program = new Command();

program
  .name('github-user-activity')
  .description(
    'Simple command line interface (CLI) to fetch the recent activity of a GitHub user and display it in the terminal.'
  )
  .version('1.0.0');

program
  .command('get')
  .description('Get User Activity')
  .argument('<username>, Username ')
  .action((username) => performOperation(username));

program.parse();
