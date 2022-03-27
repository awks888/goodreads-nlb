export type availability = "available" | "loaned" | "unavailable"

export interface Library {
    code: string
    saved: boolean
    available: availability

}
export interface Libraries extends Array<Library> { }

export const defaultLibraries: Library[] = [
    { "code": "AMKPL", "saved": false, "available": "unavailable" },
    { "code": "BEPL", "saved": false, "available": "unavailable" },
    { "code": "BIPL", "saved": true, "available": "unavailable" },
    { "code": "BBPL", "saved": false, "available": "unavailable" },
    { "code": "BMPL", "saved": false, "available": "unavailable" },
    { "code": "BPPL", "saved": false, "available": "unavailable" },
    { "code": "CLL", "saved": false, "available": "unavailable" },
    { "code": "CSPL", "saved": false, "available": "unavailable" },
    { "code": "CCKPL", "saved": false, "available": "unavailable" },
    { "code": "CMPL", "saved": false, "available": "unavailable" },
    { "code": "GEPL", "saved": false, "available": "unavailable" },
    { "code": "HBPL", "saved": true, "available": "unavailable" },
    { "code": "JRL", "saved": false, "available": "unavailable" },
    { "code": "JWPL", "saved": false, "available": "unavailable" },
    { "code": "LKCRL", "saved": false, "available": "unavailable" },
    { "code": "11LKCRL", "saved": false, "available": "unavailable" },
    { "code": "07LKCRL", "saved": false, "available": "unavailable" },
    { "code": "08LKCRL", "saved": false, "available": "unavailable" },
    { "code": "09LKCRL", "saved": false, "available": "unavailable" },
    { "code": "LSC", "saved": false, "available": "unavailable" },
    { "code": "LSCAV", "saved": false, "available": "unavailable" },
    { "code": "CNPL", "saved": false, "available": "unavailable" },
    { "code": "EPPL", "saved": false, "available": "unavailable" },
    { "code": "OCPL", "saved": true, "available": "unavailable" },
    { "code": "MPPL", "saved": false, "available": "unavailable" },
    { "code": "MOLLEY", "saved": false, "available": "unavailable" },
    { "code": "LOLC", "saved": false, "available": "unavailable" },
    { "code": "PRPL", "saved": false, "available": "unavailable" },
    { "code": "QUPL", "saved": false, "available": "unavailable" },
    { "code": "SBPL", "saved": false, "available": "unavailable" },
    { "code": "SKPL", "saved": false, "available": "unavailable" },
    { "code": "SRPL", "saved": true, "available": "unavailable" },
    { "code": "TRL", "saved": false, "available": "unavailable" },
    { "code": "TPPL", "saved": true, "available": "unavailable" },
    { "code": "WRL", "saved": false, "available": "unavailable" },
    { "code": "YIPL", "saved": false, "available": "unavailable" }
]



//list of libraries for reference
export const libraryCodeNameMap = {
    "AMKPL": "Ang Mo Kio Public Library",
    "BEPL": "Bedok Public Library",
    "BIPL": "Bishan Public Library",
    "BBPL": "Bukit Batok Public Library",
    "BMPL": "Bukit Merah Public Library",
    "BPPL": "Bukit Panjang Public Library",
    "CLL": "Central Public Library",
    "CSPL": "Cheng San Public Library",
    "CCKPL": "Choa Chu Kang Public Library",
    "CMPL": "Clementi Public Library",
    "GEPL": "Geylang East Public Library",
    "HBPL": "HarbourFront Public Library",
    "JRL": "Jurong Regional Library",
    "JWPL": "Jurong West Public Library",
    "LKCRL": "Lee Kong Chian Reference Library",
    "11LKCRL": "Lee Kong Chian Reference Library Level 11",
    "07LKCRL": "Lee Kong Chian Reference Library Level 7",
    "08LKCRL": "Lee Kong Chian Reference Library Level 8",
    "09LKCRL": "Lee Kong Chian Reference Library Level 9",
    "LSC": "Library Supply Centre",
    "LSCAV": "Library Supply Centre for AV",
    "CNPL": "Library@Chinatown",
    "EPPL": "Library@Esplanade",
    "OCPL": "Library@Orchard",
    "MPPL": "Marine Parade Public Library",
    "MOLLEY": "Mobile Bus",
    "LOLC": "NL Heritage",
    "PRPL": "Pasir Ris Public Library",
    "QUPL": "Queenstown Public Library",
    "SBPL": "Sembawang Public Library",
    "SKPL": "Sengkang Public Library",
    "SRPL": "Serangoon Public Library",
    "TRL": "Tampines Regional Library",
    "TPPL": "Toa Payoh Public Library",
    "WRL": "Woodlands Regional Library",
    "YIPL": "Yishun Public Library"
}

export default defaultLibraries


