import fse from 'fs-extra'
import ora from 'ora'
import convventionalChangelog from 'conventional-changelog'
import { resolve as resolvePath } from 'path'
import { CWD } from '../common/constant.js'

const { createWriteStream } = fse

export interface ChangelogCommandOptions {
  file?: string
  releaseCount?: number
}

export function changelog({ releaseCount = 0, file = 'CHANGELOG.md' }: ChangelogCommandOptions = {}): Promise<void> {
  const s = ora().start(`generating changelog...`)

  return new Promise((resolve) => {
    convventionalChangelog({
      preset: 'angular',
      releaseCount
    })
      .pipe(createWriteStream(resolvePath(CWD, file)))
      .on('close', () => {
        s.succeed('changelog generated success!')
        resolve()
      })
  })
}
