const browser = require('webextension-polyfill')

const infoWell = document.getElementsByClassName('info-well')[0]
const data = document.createElement('div')
data.classList.add('well-segment')
infoWell.append(data)
const createGitlabApiQuery = (url) => {
  const regex = /https:\/\/gitlab.com\/(.+)\/-\/pipelines\/(\d+)/
  const found = url.match(regex)
  if (found.length !== 3) {
    throw new Error(url + ' doesnt match expected regex ' + regex)
  }
  const projectId = encodeURIComponent(found[1])
  const pipelineId = found[2]
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
      data.prepend(jsonInPreTag(result))
    })
  })
} catch (e) {
  console.error(e)
  data.textContent = e
}
