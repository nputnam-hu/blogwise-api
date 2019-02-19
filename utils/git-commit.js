// From https://www.npmjs.com/package/git-commit-push-via-github-api
Object.defineProperty(exports, '__esModule', { value: true })
const GitHubApi = require('@octokit/rest')
const debug = require('debug')('git-commit-push-via-github-api')

const getReferenceCommit = function getReferenceCommit(github, options) {
  console.log('Entered getReferenceCommit', github.git.getRef)
  return new Promise(async (resolve, reject) => {
    try {
      const res = await github.git.getRef({
        owner: options.owner,
        repo: options.repo,
        ref: options.fullyQualifiedRef,
      })
      debug('getReferenceCommit Response: %O', res)
      console.log(res.data.object.sha)
      return resolve({ referenceCommitSha: res.data.object.sha })
    } catch (err) {
      debug('getReferenceCommit Error', JSON.stringify(err, null, '  '))
      return reject(err)
    }
  })
}
const createTree = function createTree(github, options, data) {
  return new Promise((resolve, reject) => {
    const promises = options.files.map(file => {
      if (typeof file.path === 'string' && typeof file.content === 'string') {
        return github.git
          .createBlob({
            owner: options.owner,
            repo: options.repo,
            content: file.content,
            encoding: 'utf-8',
          })
          .then(blob => ({
            sha: blob.data.sha,
            path: file.path,
            mode: '100644',
            type: 'blob',
          }))
      } else if (
        typeof file.path === 'string' &&
        Buffer.isBuffer(file.content)
      ) {
        return github.git
          .createBlob({
            owner: options.owner,
            repo: options.repo,
            content: file.content.toString('base64'),
            encoding: 'base64',
          })
          .then(blob => ({
            sha: blob.data.sha,
            path: file.path,
            mode: '100644',
            type: 'blob',
          }))
      }
      throw new Error(`This file can not handled: ${file}`)
    })
    return Promise.all(promises).then(async files => {
      debug('files: %O', files)
      // TODO: d.ts bug?
      try {
        const res = await github.git.createTree({
          owner: options.owner,
          repo: options.repo,
          tree: files,
          base_tree: data.referenceCommitSha,
        })
        console.log('DONE HERE', res.data.sha)
        debug('createTree Response: %O', res)
        return resolve(Object.assign(data, { newTreeSha: res.data.sha }))
      } catch (err) {
        debug('createTree', JSON.stringify(err, null, '  '))
        return reject(err)
      }
    })
  })
}
const createCommit = function createCommit(github, options, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await github.git.createCommit({
        owner: options.owner,
        repo: options.repo,
        message: options.commitMessage || 'commit',
        tree: data.newTreeSha,
        parents: [data.referenceCommitSha],
      })
      debug('createCommit Response: %O', res)
      return resolve(Object.assign(data, { newCommitSha: res.data.sha }))
    } catch (err) {
      debug('createCommit', JSON.stringify(err, null, '  '))
      return reject(err)
    }
  })
}
const updateReference = function updateReference(github, options, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await github.git.updateRef({
        owner: options.owner,
        repo: options.repo,
        ref: options.fullyQualifiedRef,
        sha: data.newCommitSha,
        force: options.forceUpdate,
      })
      debug('updateReference Response: %O', data)
      return resolve(data)
    } catch (err) {
      debug('updateReference', JSON.stringify(err, null, '  '))
      return reject(err)
    }
  })
}
exports.gitCommitPush = function gitCommitPush(options) {
  if (
    !options.owner ||
    !options.repo ||
    !options.files ||
    !options.files.length
  ) {
    return ''
  }
  const { token } = options
  if (!token) {
    throw new Error('token is not defined')
  }
  const gitHub = new GitHubApi({
    auth: token,
  })
  const filledOptions = {
    owner: options.owner,
    repo: options.repo,
    files: options.files,
    fullyQualifiedRef: options.fullyQualifiedRef || 'heads/dev',
    forceUpdate: options.forceUpdate || false,
    commitMessage:
      options.commitMessage || `Commit - ${new Date().getTime().toString()}`,
  }
  debug('options %O', options)
  return getReferenceCommit(gitHub, filledOptions)
    .then(data => createTree(gitHub, filledOptions, data))
    .then(data => createCommit(gitHub, filledOptions, data))
    .then(data => updateReference(gitHub, filledOptions, data))
}
