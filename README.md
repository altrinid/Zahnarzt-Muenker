# Redesign: Ordination Dr. Roman Münzker

Neuentwurf für [zahnarzt-muenzker.at](https://www.zahnarzt-muenzker.at/) (bisher Jimdo), statisches HTML/CSS/JS ohne Build-Schritt.

- `index.html`: Startseite mit Leistungen, Kieferorthopädie, Füllungsvergleich, Ordination (Galerie), Team, Kontakt/Anfahrt
- `impressum.html`: Impressum und Datenschutz (Entwurf, vor Livegang rechtlich prüfen und Hosting-Anbieter ergänzen)
- `assets/`: CSS, JS, selbst gehostete Schriften (Source Serif 4, Libre Franklin), alle Originalfotos als WebP
- `vorschau/`: Screenshots Desktop und Handy

Keine Cookies, kein Tracking, keine externen Requests beim Laden; die OpenStreetMap-Karte lädt erst nach Klick.

Lokal ansehen: `index.html` im Browser öffnen.

## Entwurf v2 (Vollbild-Layout, drei Varianten)

`v2/` enthält einen zweiten Entwurf mit denselben Inhalten, aber Vollbild-Layout (Hero über die ganze Bildschirmhöhe, Leistungen als Karten, Leitsatz-Band, randloser KFO-Block, Galerie als Bildband, Ablauf in vier Schritten, FAQ-Akkordeon) – in drei Varianten mit je einer Schrift und einem Hintergrund:

- `v2/blau/` – Tiefblau, Schrift Archivo (Headlines Archivo Black) – Platzhalter für Monstra Basic
- `v2/gruen/` – Tiefgrün mit Creme, Schrift Barlow Condensed – Platzhalter für Earlgos Condensed
- `v2/zaehne/` – heller Zahnschmelz-Ton mit Zahnmodell-Foto und Zahn-Muster, Schrift Jost – Platzhalter für Franie

`v2/index.html` ist die Übersichtsseite. Gemeinsame Basis: `v2/assets/css/base.css`; je Variante eine kleine Theme-Datei (`theme-*.css`), die Farben und Schriftrollen setzt. Die gekauften Fonts werden über die `@font-face`-Blöcke und die drei Variablen `--display`, `--cond`, `--text` eingetauscht. Bilder kommen aus `assets/img/` der v1. v1 bleibt im Wurzelverzeichnis.
