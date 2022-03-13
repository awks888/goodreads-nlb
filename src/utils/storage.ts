export type tabType = "AllBooks" | "EBooks"

export interface LocalStorageOptions {
    defaultTab: tabType
}

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