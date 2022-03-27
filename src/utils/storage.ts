import { availability, Library, Libraries, defaultLibraries } from './libraries'

export interface LocalStorageOptions {
    defaultTab?: tabType,
    libraries?: Libraries
}

export type tabType = "AllBooks" | "EBooks"



// *********** TABS **************

export function setDefaultTab(tab: tabType): Promise<void> {
    const vals: LocalStorageOptions = {
        defaultTab: tab
    }
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getDefaultTab(): Promise<tabType> {
    const keys = ['defaultTab']
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStorageOptions) => {
            resolve(res.defaultTab)
        })
    })
}

// *********** LIBRARIES **************


export function setLibrariesStorage(libraries: Libraries): Promise<void> {
    const vals: LocalStorageOptions = {
        libraries: libraries
    }
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getLibrariesStorage(): Promise<Libraries> {
    const keys = ['libraries']
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: Libraries) => {
            resolve(res['libraries'])
        })
    })
}