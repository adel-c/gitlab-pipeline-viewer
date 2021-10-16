const browser = require('webextension-polyfill')

const infoWell = document.getElementsByClassName('info-well')[0]
const data = document.createElement('div')
data.classList.add('well-segment')
const createGitlabApiQuery = (url) => {
  const PIPELINE_STRING = '/-/pipelines/'
  const projectName = url.substring('https://gitlab.com/'.length, url.indexOf(PIPELINE_STRING))
  const projectId = encodeURIComponent(projectName)
  const pipelineId = url.substring(url.indexOf(PIPELINE_STRING) + PIPELINE_STRING.length)
  return 'https://gitlab.com/api/v4/projects/' + projectId + '/pipelines/' + pipelineId
}
const jsonInPreTag = (json) => {
  const pre = document.createElement('pre')
  pre.textContent = JSON.stringify(json, null, 2)
  return pre
}
const fetchWithToken = (gitlabToken, gitlabApiQuery) => {
  const myHeaders = new Headers()
  myHeaders.append('PRIVATE-TOKEN', gitlabToken)
  const params = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
  }
  return fetch(gitlabApiQuery, params)
    .then(function (response) {
      const json = response.json()
      console.log(json)
      return json
    })
}

try {
  browser.storage.sync.get('gitlabToken').then(result => {
    const gitlabToken = result.gitlabToken

    const currentTab = document.documentURI
    const apiUrl = createGitlabApiQuery(currentTab)
    fetchWithToken(gitlabToken, apiUrl).then(function (result) {
      data.append(jsonInPreTag(result))
    })
    fetchWithToken(gitlabToken, apiUrl + '/variables').then(function (result) {
      data.append(jsonInPreTag(result))
    })
  })
} catch (e) {
  console.error(e)
  data.textContent = e
}



infoWell.append(data)
