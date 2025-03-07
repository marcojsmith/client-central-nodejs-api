#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk').default;
const ApiClient = require('./apiClient');
const config = require('./config');

const program = new Command();
const apiClient = new ApiClient();

function formatTicket(ticket) {
  if (!ticket || !ticket.data) {
    return chalk.red('Invalid ticket data');
  }

  const ticketData = ticket.data;
  return `
${chalk.bold('Ticket ID:')} ${ticketData.id}
${chalk.bold('Subject:')} ${ticketData.subject}
${chalk.bold('Status:')} ${config.statuses[ticketData.status?.id] || 'Unknown'}
${chalk.bold('Priority:')} ${config.priorities[ticketData.priority?.id] || 'Not set'}
${chalk.bold('Created:')} ${new Date(ticketData.created_at).toLocaleString()}
${chalk.bold('Description:')}
${ticketData.description || 'No description available'}
${'-'.repeat(50)}`;
}

program
  .name('cc-cli')
  .description('CLI for interacting with the CC API')
  .version('1.0.0');

program
  .command('list')
  .description('List tickets')
  .option('-p, --page <number>', 'Page number', parseInt)
  .option('-s, --size <number>', 'Page size', parseInt)
  .action(async (options) => {
    try {
      const { data: tickets, page, more, total_pages } = await apiClient.getTickets(
        options.page || 1,
        options.size || config.cli.pageSize
      );
      
      console.log(chalk.green.bold(`\nPage ${page} of ${total_pages}`));
      console.log(chalk.green(`Showing ${tickets.length} tickets\n`));
      
      tickets.forEach(ticket => {
        console.log(formatTicket({ data: ticket }));
      });

      if (more) {
        console.log(chalk.yellow('\nThere are more tickets available. Use --page to view next page.'));
      }
    } catch (error) {
      console.error(chalk.red(error.toString()));
    }
  });

program
  .command('show <id>')
  .description('Show ticket details')
  .action(async (id) => {
    try {
      const ticket = await apiClient.getTicketById(id);
      console.log(chalk.green.bold(`\nTicket Details (ID: ${id})`));
      console.log(formatTicket(ticket));
    } catch (error) {
      console.error(chalk.red(error.toString()));
    }
  });

program.parse(process.argv);