# Puch Maxi Geschwindigkeitsrechner 🛵

Ein Rechner für die geschätzte Endgeschwindigkeit von Puch Maxi Mofas. Du kannst entweder dein bestehendes Setup berechnen oder einen Vorschlag für eine gewünschte Geschwindigkeit abrufen.

---

## Installation

```bash
git clone https://github.com/Doxe187/mofa_speed_calculator.git
cd mofa_speed_calculator
start index.html
```
---

## Verwendung

### Geschwindigkeitsrechner

Wähle dein Setup aus den Dropdowns aus:

- **Zylinder** — vom Original 50 ccm bis 74 ccm
- **Vergaser** — 12 mm bis 24 mm
- **Ritzel vorne / hinten** — Übersetzung anpassen
- **Auspuff** — 18er bis 28er Reso

Die geschätzte Endgeschwindigkeit wird in Echtzeit aktualisiert. Bei riskanten Kombinationen (z. B. 28er Reso auf einem kleinen Zylinder) wird eine Warnung angezeigt.

### Wunschgeschwindigkeit

Gib eine gewünschte Geschwindigkeit ein und bekam einen passenden Setup-Vorschlag. Der Vorschlag lässt sich mit einem Klick direkt in den Rechner übernehmen.

---

## Features

![Rechner-Übersicht](https://github.com/user-attachments/assets/9f401da3-e55c-4766-b029-009a99398dc3)

- Echtzeit-Berechnung der Endgeschwindigkeit
- Warnungen bei gefährlichen Kombi­nationen
- Setup-Vorschläge basierend auf Wunschgeschwindigkeit
- Ein-Klick-Übernehmen von Vorschlägen
- Responsive Design für Desktop und Handy

---

## Programmierstil

Das Projekt setzt bewusst auf **vanilla Webtechnologie** ohne externe Abhängigkeiten:

| Technologie | Einsatz |
|---|---|
| HTML5 | Seitenstruktur, semantisches Markup |
| CSS3 | Styling, CSS Custom Properties, Grid, Media Queries |
| JavaScript (ES6+) | Gesamte Logik in einer Datei (`script.js`) |

- Konfigurationsdaten (Basisdaten, Bonuswerte, Empfehlungen) sind zentral im `CONFIG`- bzw. `RECOMMENDATIONS`-Objekt in `script.js` definiert
- Keine Frameworks, keine Bundler, keine Backend-Abhängigkeiten
- Die App läuft komplett im Browser — einfach `index.html` öffnen

---

## Lizenz ⚖️

MIT — siehe [LICENSE](LICENSE)
