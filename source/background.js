const browser = window.browser
browser.contextMenus.create({
  id: 'open-in-bundle-viewer',
  title: 'Open in Bundle Viewer',
  contexts: ['link'],
  documentUrlPatterns: [
    '*://gitlab.com/*'
  ]
})
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'open-in-bundle-viewer') {

    browser.tabs.query({
      active: true,
      windowId: browser.windows.WINDOW_ID_CURRENT
    })
      .then(tabs => browser.tabs.get(tabs[0].id))
      .then(currentTab => {
        const url = info.linkUrl
        const PIPELINE_STRING = '/-/pipelines/'
        const projectName = url.substring('https://gitlab.com/'.length, url.indexOf(PIPELINE_STRING))
        const projectId = encodeURIComponent(projectName)
        const pipelineId = url.substring(url.indexOf(PIPELINE_STRING) + PIPELINE_STRING.length)

        const gitlabApiQuery = 'https://gitlab.com/api/v4/projects/' + projectId + '/pipelines/' + pipelineId
        console.log(info, projectId, pipelineId)
        console.log(url)
        browser.storage.sync.get('gitlabToken').then(result => {
          const gitlabToken = result.gitlabToken
          var myHeaders = new Headers()
          myHeaders.append('PRIVATE-TOKEN', gitlabToken)
          var myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
          }

          fetch(gitlabApiQuery, myInit)
            .then(function (response) {
              return response.json()
            })
            .then(function (myBlob) {
              console.log(myBlob)
            })
        })
        /*
        browser.tabs.create({
          active: true,
          index: currentTab.index + 1,
          url: url
        })
         */
      })
  }
})
