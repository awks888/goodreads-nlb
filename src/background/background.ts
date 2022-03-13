import { setDefaultTab } from '../utils/storage'


chrome.runtime.onInstalled.addListener(() => {
  setDefaultTab("AllBooks")
})

