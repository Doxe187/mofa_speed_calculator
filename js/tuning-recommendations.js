// Tuning-Vorschläge für verschiedene Geschwindigkeitsbereiche
// Jedes Setup enthält die exakten Werte für die Dropdowns
const TUNING_RECOMMENDATIONS = {
    35: {
        title: "32 km/h - Original Setup",
        description: "Standardkonfiguration für legale Mofa-Nutzung",
        setups: [
            {
                name: "Original Setup",
                cylinder: "stock",           // Dropdown-Wert
                carburetor: 0,               // 12mm = Index 0
                frontSprocket: 13,           // 13 Zähne
                rearSprocket: 45,            // 45 Zähne
                exhaust: 0,                  // 18mm = Index 0
                displayCylinder: "50ccm Original Zylinder",
                displayCarb: "12mm Vergaser",
                displayGearing: "13/45",
                displayExhaust: "18mm Auspuff",
                notes: "Legale Mofa-Konfiguration"
            }
        ]
    },
    40: {
        title: "40 km/h",
        description: "Leichte Leistungssteigerung",
        setups: [
            {
                name: "Basis 40er Setup",
                cylinder: "50",              // 50ccm
                carburetor: 2,               // 15mm = Index 2
                frontSprocket: 12,           // 12 Zähne
                rearSprocket: 45,            // 45 Zähne
                exhaust: 1,                  // 22mm = Index 1
                displayCylinder: "50ccm Zylinder",
                displayCarb: "15mm Vergaser",
                displayGearing: "12/45",
                displayExhaust: "22mm Auspuff",
                notes: "Erste Tuning-Stufe"
            }
        ]
    },
    45: {
        title: "45 km/h",
        description: "Mittlere Geschwindigkeit",
        setups: [
            {
                name: "45er Setup",
                cylinder: "60",              // 60ccm
                carburetor: 2,               // 15mm
                frontSprocket: 12,
                rearSprocket: 45,
                exhaust: 1,                  // 22mm
                displayCylinder: "60ccm Zylinder",
                displayCarb: "15mm Vergaser",
                displayGearing: "12/45",
                displayExhaust: "22mm Auspuff",
                notes: "Ausgewogenes Setup"
            }
        ]
    },
    50: {
        title: "50 km/h",
        description: "Beliebtes Tuning-Ziel",
        setups: [
            {
                name: "50er Setup - Variante 1",
                cylinder: "50",              // 50ccm
                carburetor: 2,               // 15mm
                frontSprocket: 12,
                rearSprocket: 45,
                exhaust: 2,                  // 28mm = Index 2
                displayCylinder: "50ccm Zylinder",
                displayCarb: "15mm Vergaser",
                displayGearing: "12/45",
                displayExhaust: "28mm Auspuff",
                notes: "Standard 50er Setup"
            },
            {
                name: "50er Setup - Variante 2",
                cylinder: "65",              // 65ccm
                carburetor: 2,               // 15mm
                frontSprocket: 12,
                rearSprocket: 45,
                exhaust: 1,                  // 22mm
                displayCylinder: "65ccm Zylinder",
                displayCarb: "15mm Vergaser",
                displayGearing: "12/45",
                displayExhaust: "22mm Auspuff",
                notes: "Mehr Hubraum, kleinerer Auspuff"
            }
        ]
    },
    55: {
        title: "55-60 km/h",
        description: "Sportliche Konfiguration",
        setups: [
            {
                name: "55-60 km/h - Variante 1",
                cylinder: "50",              // 50ccm
                carburetor: 2,               // 15mm
                frontSprocket: 15,
                rearSprocket: 45,
                exhaust: 2,                  // 28mm
                displayCylinder: "50ccm Zylinder",
                displayCarb: "15mm Vergaser",
                displayGearing: "15/45",
                displayExhaust: "28mm Auspuff",
                notes: "Kürzere Übersetzung mit 50ccm"
            },
            {
                name: "55-60 km/h - Variante 2",
                cylinder: "65",              // 65ccm
                carburetor: 2,               // 15mm
                frontSprocket: 12,
                rearSprocket: 45,
                exhaust: 2,                  // 28mm
                displayCylinder: "65ccm Zylinder",
                displayCarb: "15mm Vergaser",
                displayGearing: "12/45",
                displayExhaust: "28mm Auspuff",
                notes: "Mehr Hubraum, größerer Auspuff"
            },
            {
                name: "55-60 km/h - Variante 3",
                cylinder: "70",              // 70ccm
                carburetor: 3,               // 17mm = Index 3
                frontSprocket: 12,
                rearSprocket: 47,
                exhaust: 2,                  // 28mm
                displayCylinder: "70ccm Zylinder",
                displayCarb: "17mm Vergaser",
                displayGearing: "12/47",
                displayExhaust: "28mm Auspuff",
                notes: "High-Performance Setup mit 70ccm (Alternative: 11/45)"
            }
        ]
    },
    65: {
        title: "65-70 km/h",
        description: "High-Performance Bereich",
        setups: [
            {
                name: "65-70 km/h Setup",
                cylinder: "65",              // 65ccm
                carburetor: 2,               // 15mm (Alternative: 17mm = Index 3)
                frontSprocket: 15,
                rearSprocket: 45,
                exhaust: 2,                  // 28mm
                displayCylinder: "65ccm Zylinder",
                displayCarb: "15mm Vergaser",
                displayGearing: "15/45",
                displayExhaust: "28mm Auspuff",
                notes: "Hohe Geschwindigkeit mit 65ccm (Alternative: 17mm Vergaser)"
            }
        ]
    },
    75: {
        title: "75 km/h",
        description: "Sehr sportliche Konfiguration",
        setups: [
            {
                name: "75 km/h Setup",
                cylinder: "72",              // 72ccm
                carburetor: 7,               // 21mm = Index 7
                frontSprocket: 15,
                rearSprocket: 45,
                exhaust: 2,                  // 28mm
                displayCylinder: "72ccm Zylinder",
                displayCarb: "21mm Vergaser",
                displayGearing: "15/45",
                displayExhaust: "28mm Auspuff",
                notes: "Großer Hubraum erforderlich"
            }
        ]
    },
    80: {
        title: "80+ km/h",
        description: "Maximum Performance",
        setups: [
            {
                name: "80+ km/h Setup",
                cylinder: "74",              // 74ccm
                carburetor: 8,               // 24mm = Index 8
                frontSprocket: 15,
                rearSprocket: 45,
                exhaust: 2,                  // 28mm
                displayCylinder: "74ccm Zylinder",
                displayCarb: "24mm Vergaser",
                displayGearing: "15/45",
                displayExhaust: "28mm Auspuff",
                notes: "Top-Level Tuning - sehr teuer und wartungsintensiv"
            }
        ]
    }
};

// Hilfsfunktion um Vorschläge nach Geschwindigkeit zu filtern
function getRecommendationForSpeed(targetSpeed) {
    // Definiere Geschwindigkeitsbereiche
    const speedRanges = [
        { min: 0, max: 37, key: 35 },      // 35 km/h
        { min: 38, max: 42, key: 40 },     // 40 km/h
        { min: 43, max: 47, key: 45 },     // 45 km/h
        { min: 48, max: 52, key: 50 },     // 50 km/h
        { min: 53, max: 62, key: 55 },     // 55-60 km/h
        { min: 63, max: 72, key: 65 },     // 65-70 km/h
        { min: 73, max: 78, key: 75 },     // 75 km/h
        { min: 79, max: 999, key: 80 }     // 80+ km/h
    ];

    // Finde den passenden Bereich
    for (const range of speedRanges) {
        if (targetSpeed >= range.min && targetSpeed <= range.max) {
            return TUNING_RECOMMENDATIONS[range.key];
        }
    }

    // Fallback: Finde den nächstgelegenen Wert
    const speeds = Object.keys(TUNING_RECOMMENDATIONS).map(Number).sort((a, b) => a - b);
    let closestSpeed = speeds[0];
    let minDiff = Math.abs(targetSpeed - closestSpeed);

    for (const speed of speeds) {
        const diff = Math.abs(targetSpeed - speed);
        if (diff < minDiff) {
            minDiff = diff;
            closestSpeed = speed;
        }
    }

    return TUNING_RECOMMENDATIONS[closestSpeed];
}

// Funktion um alle Vorschläge zu erhalten
function getAllRecommendations() {
    return TUNING_RECOMMENDATIONS;
}
