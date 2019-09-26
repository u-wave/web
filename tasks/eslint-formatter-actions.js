const fetch = require('node-fetch')

module.exports = function format (results, opts) {
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

  fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/check-runs`, {
    method: 'POST',
    headers,
    body: JSON.stringify(check)
  }).catch((err) => {
    console.error(err)
    process.exit(1)
  })

  const formatter = require('eslint').CLIEngine.getFormatter(FORMATTER)
  return formatter(results, opts)

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
