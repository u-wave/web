const fetch = require('node-fetch')
const { CLIEngine } = require('eslint')

process.stdin.pipe(require('concat-stream')({ encoding: 'string' }, (json) => {
  format(JSON.parse(json))
}))

async function format (results) {
  const {
    FORMATTER = 'stylish',
    GITHUB_ACTION,
    GITHUB_REPOSITORY,
    GITHUB_SHA,
    GITHUB_TOKEN,
    GITHUB_WORKSPACE
  } = process.env

  const annotations = []
  let errorCount = 0
  let warningCount = 0

  for (const result of results) {
    annotations.push(...toAnnotations(result))
    errorCount += result.errorCount
    warningCount += result.warningCount
  }

  const headers = {
    'content-type': 'application/json',
    accept: 'application/vnd.github.antiope-preview+json',
    authorization: `Bearer ${GITHUB_TOKEN}`,
    'user-agent': 'eslint-formatter-actions'
  }

  const check = {
    name: GITHUB_ACTION,
    head_sha: GITHUB_SHA,
    status: 'complete',
    started_at: new Date(),
    conclusion: errorCount > 0 ? 'failure' : 'success',
    output: {
      title: GITHUB_ACTION,
      summary: `${errorCount} error(s), ${warningCount} warning(s) found`,
      annotations
    }
  }

  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/check-runs`, {
    method: 'POST',
    headers,
    body: JSON.stringify(check)
  })

  const formatter = CLIEngine.getFormatter(FORMATTER)
  console.log(formatter(results, {}))

  if (response.status !== 201) {
    console.error(await response.json())
    process.exit(1)
  }

  if (errorCount > 0 || warningCount > 0) {
    process.exit(1)
  }

  function toAnnotations ({ filePath, messages }) {
    const path = filePath.substr(GITHUB_WORKSPACE.length + 1)
    return messages.map(({ line, severity, ruleId, message }) => {
      const annotationLevel = {
        1: 'warning',
        2: 'failure'
      }[severity]
      return {
        path,
        start_line: line,
        end_line: line,
        annotation_level: annotationLevel,
        message: `[${ruleId}] ${message}`
      }
    })
  }
}
