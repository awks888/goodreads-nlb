import { setDefaultTab, setLibrariesStorage } from '../utils/storage'
import { defaultLibraries } from '../utils/libraries'


chrome.runtime.onInstalled.addListener(() => {
  setDefaultTab("AllBooks")
  setLibrariesStorage(defaultLibraries)
})

