import semver from 'semver'
import fse from 'fs-extra'
import logger from '../common/logger.js'

const { readFileSync } = fse

function isVersion(msg: string) {
  return msg.startsWith('v') && semver.valid(msg.slice(1))
}

export function commitlint(gitParams: string) {
  const msg = readFileSync(gitParams, 'utf-8').trim()

  const COMMIT_MESSAGE_RE =
    /^(revert|fix|feat|docs|perf|test|types|style|build|chore|release|refactor)(\(.+\))?!?: (.|\n)+/

  if (!isVersion(msg) && !COMMIT_MESSAGE_RE.test(msg)) {
    logger.error('commit message invalid')
    logger.warning(`\
The rules for commit messages are as follows
Example:
feat: add a new feature
feat(ui/button): add a new feature in the ui/button scope
fix: fix a bug
fix(ui/button): fix a bug in the ui/button scope
docs: fix an error in the documentation
docs(ui/button): fix a documentation error in the ui/button scope
Allowed types:
- fix
- feat
- docs
- perf
- test
- types
- style
- build
- chore
- release
- refactor
- revert
Commit message reference: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y
参考阮一峰Commit message编写指南: https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html`)
    process.exit(1)
  }
}
