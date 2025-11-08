import { Command } from 'commander';

export function setupCLI(): Command {
  const program = new Command();

  program
    .version('1.0.0')
    .description('A smart file sorter powered by AI')
    .argument('[directory]', 'The directory to sort (optional in interactive mode)')
    .option('-d, --db <path>', 'Path to the categorization database')
    .option('--no-subcategories', 'Do not create subdirectories for subcategories')
    .option('--dry-run', 'Show what would be moved without actually moving files')
    .option('-i, --interactive', 'Run in interactive mode')
    .option('--verbose', 'Enable detailed logging for debugging')
    .option('--json', 'Output results as JSON for programmatic use')
    .parse(process.argv);

  return program;
}