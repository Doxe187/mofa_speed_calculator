# Test-Beispiele für automatische Setup-Auswahl

## Test 1: 35 km/h (Original)
**Eingabe:** `35`

**Erwartetes Ergebnis:**
- Zylinder: Original 50 ccm
- Vergaser: 12 mm
- Ritzel vorne: 13 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 22er
- Berechnete Geschwindigkeit: ~35 km/h

## Test 2: 40 km/h
**Eingabe:** `40`

**Erwartetes Ergebnis:**
- Zylinder: 50 ccm
- Vergaser: 15 mm
- Ritzel vorne: 12 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 22er
- Berechnete Geschwindigkeit: ~40 km/h

## Test 3: 50 km/h (2 Varianten)
**Eingabe:** `50`

**Erwartetes Ergebnis - Variante 1 (Standard):**
- Zylinder: 50 ccm
- Vergaser: 15 mm
- Ritzel vorne: 12 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 28er
- Berechnete Geschwindigkeit: ~50 km/h

**Variante 2 (Alternative):**
- Zylinder: 65 ccm
- Vergaser: 15 mm
- Ritzel vorne: 12 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 22er
- Berechnete Geschwindigkeit: ~50 km/h

## Test 4: 57 km/h (55-60 Bereich)
**Eingabe:** `57`

**Erwartetes Ergebnis - Variante 1 (Standard):**
- Zylinder: 50 ccm
- Vergaser: 15 mm
- Ritzel vorne: 15 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 28er
- Berechnete Geschwindigkeit: ~55-60 km/h

**Variante 2:**
- Zylinder: 65 ccm
- Vergaser: 15 mm
- Ritzel vorne: 12 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 28er

**Variante 3:**
- Zylinder: 70 ccm
- Vergaser: 17 mm
- Ritzel vorne: 12 Zähne
- Ritzel hinten: 47 Zähne
- Auspuff: 28er

## Test 5: 68 km/h (65-70 Bereich)
**Eingabe:** `68`

**Erwartetes Ergebnis:**
- Zylinder: 65 ccm
- Vergaser: 15 mm
- Ritzel vorne: 15 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 28er
- Berechnete Geschwindigkeit: ~65-70 km/h

## Test 6: 75 km/h
**Eingabe:** `75`

**Erwartetes Ergebnis:**
- Zylinder: 72 ccm
- Vergaser: 21 mm
- Ritzel vorne: 15 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 28er
- Berechnete Geschwindigkeit: ~75 km/h

## Test 7: 85 km/h (80+ Bereich)
**Eingabe:** `85`

**Erwartetes Ergebnis:**
- Zylinder: 74 ccm
- Vergaser: 24 mm
- Ritzel vorne: 15 Zähne
- Ritzel hinten: 45 Zähne
- Auspuff: 28er
- Berechnete Geschwindigkeit: ~80+ km/h

## Test 8: Zwischen-Werte
Die Geschwindigkeitsbereiche sind so definiert:
- 0-37 → 35 km/h Setup
- 38-42 → 40 km/h Setup
- 43-47 → 45 km/h Setup
- 48-52 → 50 km/h Setup
- 53-62 → 55-60 km/h Setup
- 63-72 → 65-70 km/h Setup
- 73-78 → 75 km/h Setup
- 79+ → 80+ km/h Setup

**Beispiele:**
- `36` → 35 km/h Setup
- `38` → 40 km/h Setup
- `51` → 50 km/h Setup
- `60` → 55-60 km/h Setup
- `100` → 80+ km/h Setup

## Test 9: Setup-Wechsel
1. Gib `50` ein → Variante 1 wird automatisch angewendet (50ccm)
2. Klicke auf "Dieses Setup anwenden" bei Variante 2
3. Erwartung: Alle Dropdowns wechseln auf 65ccm Setup
4. Das 65ccm Setup wird als "Aktiv ✓" markiert
5. Geschwindigkeit wird neu berechnet

## Test 10: Manuelle Anpassung nach Auto-Setup
1. Gib `50` ein → Setup wird automatisch angewendet
2. Ändere manuell den Zylinder auf 70 ccm
3. Erwartung:
   - Geschwindigkeit wird neu berechnet
   - Vorschläge bleiben sichtbar
   - Warnung erscheint falls gefährliche Kombination

## Sicherheitswarnungen Tests

### Test 11: 28er Reso mit kleinem Zylinder
- Zylinder: 60 ccm
- Auspuff: 28er Reso
- Erwartung: ⚠️ "28er Reso Auspuff auf keinen Fall mit diesem Zylinder fahren!"

### Test 12: 18er mit großem Zylinder
- Zylinder: 72 ccm
- Auspuff: 18er
- Erwartung: ⚠️ "18er Auspuff auf keinen Fall mit diesem Zylinder fahren!"

### Test 13: Großer Vergaser mit kleinem Zylinder
- Zylinder: 60 ccm
- Vergaser: 21 mm
- Erwartung: ⚠️ "Ein Vergaser größer als 19 mm bringt keinen Geschwindigkeitsvorteil."
