export type availability = "available" | "loaned" | "unavailable"

export interface Libraries {
    [library: string]: {
        name: string
        available: availability
    }
}

const library: Libraries = {
    "CLL": {
        "name": "Central Public Library",
        "available": "unavailable"
    },
    "TPPL": {
        "name": "Toa Payoh Public Library",
        "available": "unavailable"
    },
    "OCPL": {
        "name": "Library@Orchard",
        "available": "unavailable"
    },
    "SRPL": {
        "name": "Serangoon Public Library",
        "available": "unavailable"
    },
    "BIPL": {
        "name": "Bishan Public Library",
        "available": "unavailable"
    },
    "HBPL": {
        "name": "HarbourFront Public Library",
        "available": "unavailable"
    }
}

export default library
