# Changelog - Puch Maxi Geschwindigkeitsrechner

## Version 2.0 - Automatische Setup-Auswahl (2026-02-05)

### 🎉 Hauptfeatures

#### Automatische Setup-Vorschläge
- **Automatische Konfiguration**: Beim Eingeben einer Wunschgeschwindigkeit werden alle Dropdowns automatisch auf das beste vordefinierte Setup eingestellt
- **Vordefinierte Setups**: 8 Geschwindigkeitsbereiche mit bewährten Konfigurationen aus der Praxis
- **Mehrere Varianten**: Bei einigen Geschwindigkeiten (50, 55-60 km/h) gibt es mehrere Setup-Optionen
- **Ein-Klick-Wechsel**: Alternative Setups können per Button sofort angewendet werden

#### Neue Projektstruktur
```
js/
├── config.js                  - Basiskonfiguration
├── tuning-recommendations.js  - Alle vordefinierten Setups
├── calculator.js              - Berechnungslogik
├── ui.js                      - UI-Updates und Events
└── app.js                     - Initialisierung
```

#### UI-Verbesserungen
- **Recommendations Section**: Zeigt alle verfügbaren Setups für den Geschwindigkeitsbereich
- **Active Badge**: Grüner ✓ Badge zeigt das aktuell aktive Setup
- **Setup-Cards**: Übersichtliche Darstellung aller Komponenten
- **Apply Buttons**: Schneller Wechsel zwischen Setup-Varianten
- **Responsive Design**: Optimiert für Mobile und Desktop

### 📋 Vordefinierte Setups

#### 35 km/h - Original
- 50ccm Original Zylinder / 12mm Vergaser / 13/45 / 22mm Auspuff

#### 40 km/h
- 50ccm Zylinder / 15mm Vergaser / 12/45 / 22mm Auspuff

#### 45 km/h
- 60ccm Zylinder / 15mm Vergaser / 12/45 / 22mm Auspuff

#### 50 km/h (2 Varianten)
1. 50ccm Zylinder / 15mm Vergaser / 12/45 / 28mm Auspuff
2. 65ccm Zylinder / 15mm Vergaser / 12/45 / 22mm Auspuff

#### 55-60 km/h (3 Varianten)
1. 50ccm Zylinder / 15mm Vergaser / 15/45 / 28mm Auspuff
2. 65ccm Zylinder / 15mm Vergaser / 12/45 / 28mm Auspuff
3. 70ccm Zylinder / 17mm Vergaser / 12/47 / 28mm Auspuff

#### 65-70 km/h
- 65ccm Zylinder / 15mm Vergaser / 15/45 / 28mm Auspuff

#### 75 km/h
- 72ccm Zylinder / 21mm Vergaser / 15/45 / 28mm Auspuff

#### 80+ km/h
- 74ccm Zylinder / 24mm Vergaser / 15/45 / 28mm Auspuff

### 🎯 Geschwindigkeitsbereiche

| Eingabe | Zugeordneter Bereich |
|---------|---------------------|
| 0-37 km/h | 35 km/h |
| 38-42 km/h | 40 km/h |
| 43-47 km/h | 45 km/h |
| 48-52 km/h | 50 km/h |
| 53-62 km/h | 55-60 km/h |
| 63-72 km/h | 65-70 km/h |
| 73-78 km/h | 75 km/h |
| 79+ km/h | 80+ km/h |

### 🔧 Technische Änderungen

#### Modularisierung
- Alte monolithische `script.js` aufgeteilt in 5 Module
- Klare Trennung von Verantwortlichkeiten
- Einfachere Wartung und Erweiterung

#### Neue Funktionen
- `getRecommendationForSpeed()`: Findet passendes Setup für Zielgeschwindigkeit
- `applyAlternativeSetup()`: Wendet alternatives Setup an
- `displayRecommendations()`: Zeigt Setup-Karten an
- Intelligente Bereichszuordnung für Zwischenwerte

#### CSS-Erweiterungen
- `.recommendation-card` mit Active-State
- `.active-badge` für aktives Setup
- `.apply-setup-btn` für Setup-Wechsel
- Responsive Anpassungen für Mobile

### 📚 Neue Dokumentation

- **PROJEKTSTRUKTUR.md**: Detaillierte Code-Organisation
- **VERWENDUNG.md**: Benutzer-Anleitung
- **TEST-BEISPIELE.md**: Test-Szenarien
- **CHANGELOG.md**: Diese Datei

### ✅ Beibehaltene Features

- Geschwindigkeitsberechnung
- Sicherheitswarnungen
- Standard-Werte basierend auf Zylinder
- Zielgeschwindigkeit-Vergleich
- Manuelle Dropdown-Anpassung
- Responsive Design

### 🔄 Migrationspfad

Die alte Version wurde als `script.js.old` gesichert.
Um zur alten Version zurückzukehren:
```bash
mv script.js.old script.js
rm -rf js/
# In index.html: <script src="script.js"></script>
```

### 🚀 Nächste Schritte

Mögliche zukünftige Erweiterungen:
- Export der Konfiguration als PDF
- Preis-Kalkulator für Komponenten
- Vergleichstabelle mehrerer Setups
- Speichern favorisierter Konfigurationen
- Detaillierte Tuning-Guides pro Setup

---

**Migration von Version 1.0**: Vollständig abwärtskompatibel, alle bisherigen Features bleiben erhalten.
