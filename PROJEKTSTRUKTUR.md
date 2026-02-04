# Puch Maxi Geschwindigkeitsrechner - Projektstruktur

## Übersicht

Dieses Projekt ist ein Geschwindigkeitsrechner für Puch Maxi Mofas mit automatischen Tuning-Vorschlägen.

## Dateistruktur

```
mofa_speed_calculator/
├── index.html              # Haupt-HTML-Datei
├── style.css               # Alle Styles
├── js/
│   ├── config.js          # Basiskonfiguration (Zylinder, Übersetzungen, etc.)
│   ├── tuning-recommendations.js  # Tuning-Vorschläge für verschiedene Geschwindigkeiten
│   ├── calculator.js      # Berechnungslogik für Geschwindigkeiten
│   ├── ui.js              # UI-Updates und Event-Handling
│   └── app.js             # Hauptinitialisierung
├── script.js.old           # Alte Monolith-Version (Backup)
└── README.md               # Projekt-Dokumentation
```

## Module-Beschreibung

### config.js
Enthält alle Basiskonfigurationen:
- Basis-Übersetzungen (Ritzel vorne/hinten)
- Basis-Geschwindigkeiten für verschiedene Zylinder
- Vergaser-Bonusse
- Auspuff-Einstellungen
- Verfügbare Optionen für Dropdowns

### tuning-recommendations.js
Enthält vordefinierte Tuning-Vorschläge für verschiedene Geschwindigkeitsbereiche:
- 35 km/h (Original Setup)
- 40 km/h
- 45 km/h
- 50 km/h (2 Varianten)
- 55-60 km/h (3 Varianten)
- 65-70 km/h
- 75 km/h
- 80+ km/h

Jeder Vorschlag enthält:
- Zylindergröße
- Vergasergröße
- Übersetzung (Ritzel vorne/hinten)
- Auspuffgröße
- Notizen und Hinweise

### calculator.js
Enthält die Berechnungslogik:
- `calculateSpeed()` - Berechnet die Endgeschwindigkeit basierend auf der Konfiguration
- `isValidConfig()` - Prüft ob eine Konfiguration sicher ist
- `validateConfiguration()` - Gibt Warnungen bei gefährlichen Kombinationen aus
- `findBestSetup()` - Findet die beste Konfiguration für eine Zielgeschwindigkeit

### ui.js
Behandelt alle UI-Interaktionen:
- DOM-Element Referenzen
- `updateSpeedDisplay()` - Aktualisiert die Geschwindigkeitsanzeige
- `updateExhaustDefaults()` - Setzt Standard-Auspuff basierend auf Zylinder
- `updateCarbDefault()` - Setzt Standard-Vergaser basierend auf Zylinder
- `applySuggestedSetup()` - Wendet automatische Vorschläge an
- `displayRecommendations()` - Zeigt Tuning-Vorschläge an
- `setupEventListeners()` - Registriert alle Event Listener

### app.js
Initialisiert die Anwendung:
- Wartet auf DOMContentLoaded
- Initialisiert Standard-Werte
- Startet Event Listeners

## Features

### Automatische Vorschläge
Wenn der Benutzer eine Wunschgeschwindigkeit eingibt:
1. Das System findet automatisch die beste Konfiguration
2. Alle Dropdowns werden automatisch angepasst
3. Tuning-Vorschläge für diesen Geschwindigkeitsbereich werden angezeigt

### Sicherheitswarnungen
Das System warnt automatisch bei gefährlichen Kombinationen:
- 28er Reso Auspuff mit kleinen Zylindern (≤65ccm)
- 18er Auspuff mit großen Zylindern (≥65ccm)
- Übergroße Vergaser (>19mm) mit kleinen Zylindern (≤70ccm)

### Tuning-Vorschläge
Zeigt vordefinierte, bewährte Setups für verschiedene Geschwindigkeitsziele an mit:
- Mehreren Varianten pro Geschwindigkeitsbereich
- Detaillierten Komponentenangaben
- Hilfreichen Notizen und Hinweisen

## Neue Vorschläge hinzufügen

Um neue Tuning-Vorschläge hinzuzufügen, bearbeite `js/tuning-recommendations.js`:

```javascript
TUNING_RECOMMENDATIONS[85] = {
    title: "85 km/h",
    description: "Extreme Performance",
    setups: [
        {
            name: "85er Setup",
            cylinder: "74",              // Dropdown-Wert
            carburetor: 8,               // 24mm = Index 8
            frontSprocket: 16,
            rearSprocket: 45,
            exhaust: 2,                  // 28mm = Index 2
            displayCylinder: "74ccm Zylinder",
            displayCarb: "24mm Vergaser",
            displayGearing: "16/45",
            displayExhaust: "28mm Auspuff",
            notes: "Nur für Rennstrecke!"
        }
    ]
};
```

## Wartung

Die modulare Struktur macht es einfach:
- Neue Zylinder-Optionen: `config.js` bearbeiten
- Neue Tuning-Vorschläge: `tuning-recommendations.js` bearbeiten
- Berechnungslogik anpassen: `calculator.js` bearbeiten
- UI-Verhalten ändern: `ui.js` bearbeiten
- Styling: `style.css` bearbeiten

## Vorteile der neuen Struktur

1. **Modular**: Jede Datei hat eine klare Verantwortung
2. **Wartbar**: Änderungen sind einfach zu finden und zu machen
3. **Erweiterbar**: Neue Features können leicht hinzugefügt werden
4. **Übersichtlich**: Code ist logisch organisiert
5. **Wiederverwendbar**: Module können in anderen Projekten verwendet werden
