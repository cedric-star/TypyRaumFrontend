# RMDUA - Frontend

Dieses Projekt ist das Frontend der Abgabe für das Modul "Raumbezogene Dienste und Anwendungen" an der Hochschule Harz.
Das Projekt basiert auf Vue.js mit MapLibre als Karten-Renderer.

## Bibliotheken

- MapLibre: Karten-Rendering uvm.
- Turf: Generierung von GeoJSON-Layern

## Kartendaten

Kartendaten können wurden wie folgt gesammelt:

1. Seite des LVERMGEO des Landes Sachsen-Anhalt, Open-Data aufrufen und Datensatz wählen
2. Datensatz runterladen, entpacken und in QGIS laden
3. Layer auswählen und "Generate XYZ tiles (MBTiles)" starten
   - Zoom auf ca. Stufe 6 bis 14 setzen
   - DPI min. auf 256 setzen
   - als PNG exportieren
   - Metatile size lassen
   4. MBTiles sind fertig für Nutzung über Martin als Tile-Server


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
