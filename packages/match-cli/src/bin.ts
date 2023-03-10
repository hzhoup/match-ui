#!/usr/bin/env node
import { Command } from 'commander'
import { getVersion } from './common/helpers.js'

const program = new Command()

program.version(`match-cli ${getVersion()}`).usage('<command> [options]')

program
  .command('lint')
  .description('Lint code')
  .action(async () => {
    const { lint } = await import('./commands/lint.js')

    await lint()
  })

program
  .command('changelog')
  .option('-rc --releaseCount <releaseCount>', 'Release count')
  .option('-f --file <file>', 'Changelog filename')
  .description('Generate changelog')
  .action(async (option) => {
    const { changelog } = await import('./commands/changelog.js')

    return changelog(option)
  })

program
  .command('commit-lint <gitParams>')
  .description('Lint commit message')
  .action(async (option) => {
    const { commitlint } = await import('./commands/commitlint.js')

    return commitlint(option)
  })

program.on('command:*', async ([cmd]) => {
  const { default: logger } = await import('./common/logger.js')

  program.outputHelp()
  logger.error(`\nUnknown command ${cmd}.\n`)
  process.exitCode = 1
})

program.parse()
