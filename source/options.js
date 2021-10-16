const browser = require('webextension-polyfill')

function saveOptions (e) {
  e.preventDefault()
  browser.storage.sync.set({
    gitlabToken: document.querySelector('#gitlabToken').value
  })
}

function restoreOptions () {
  function setCurrentChoice (result) {
    document.querySelector('#gitlabToken').value = result.gitlabToken || 'N/A'
  }

  function onError (error) {
    console.log(`Error: ${error}`)
  }

  const getting = browser.storage.sync.get('gitlabToken')
  getting.then(setCurrentChoice, onError)
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)
