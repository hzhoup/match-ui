import type { Ora } from 'ora'
import ora from 'ora'
import { execa } from 'execa'
import { isDir } from '../common/helpers.js'
import { resolve } from 'path'
import { CWD, ESLINT_EXTENSIONS } from '../common/constant.js'

export async function lint() {
  let spinner: Ora = ora()
  try {
    spinner = ora('prettier starting...').start()
    await execa('prettier', ['--write', '--cache', '.'])
    spinner.succeed('prettier success')

    // spinner = ora('stylelint starting...').start()
    // const stylelintPattern = ['./src/**/*.css', './src/**/*.less']
    // const hasPackages = isDir(resolve(CWD, 'packages'))
    // hasPackages && stylelintPattern.push('./packages/**/*.css', './packages/**/*.less')
    // await execa('stylelint', [...stylelintPattern, '--fix', '--cache'])
    // spinner.succeed('stylelint success')

    spinner = ora('eslint starting...').start()
    const eslintPattern = ['./src', './packages/match-ui/src']
    const { stdout } = await execa('eslint', [
      ...eslintPattern.filter((pattern) => isDir(resolve(CWD, pattern))),
      '--fix',
      '--cache',
      '--ext',
      ESLINT_EXTENSIONS.join()
    ])
    const type = stdout ? 'warn' : 'succeed'
    spinner[type](stdout || 'eslint success')
  } catch (e: any) {
    spinner.fail(e.toString())
    process.exit(1)
  }
}
