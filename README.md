# Redesign: Ordination Dr. Roman Münzker

Neuentwurf für [zahnarzt-muenzker.at](https://www.zahnarzt-muenzker.at/) (bisher Jimdo), statisches HTML/CSS/JS ohne Build-Schritt.

- `index.html`: Startseite mit Leistungen, Kieferorthopädie, Füllungsvergleich, Ordination (Galerie), Team, Kontakt/Anfahrt
- `impressum.html`: Impressum und Datenschutz (Entwurf, vor Livegang rechtlich prüfen und Hosting-Anbieter ergänzen)
- `assets/`: CSS, JS, selbst gehostete Schriften (Source Serif 4, Libre Franklin), alle Originalfotos als WebP
- `vorschau/`: Screenshots Desktop und Handy

Keine Cookies, kein Tracking, keine externen Requests beim Laden; die OpenStreetMap-Karte lädt erst nach Klick.

Lokal ansehen: `index.html` im Browser öffnen.

## Entwürfe v2 und v3

- `v2/` – Vollbild-Layout in Hell mit Hanken Grotesk (Hero über die ganze Bildschirmhöhe, Leistungen als Karten, Leitsatz-Band, randloser KFO-Block, Galerie als Bildband, Ablauf in vier Schritten, FAQ-Akkordeon).
- `v3.1/` – dasselbe Layout in Tiefblau, Schrift Archivo (Headlines Archivo Black) – Platzhalter für Monstra Basic
- `v3.2/` – Tiefgrün mit Creme, Schrift Barlow Condensed – Platzhalter für Earlgos Condensed
- `v3.3/` – heller Zahnschmelz-Ton mit Zahnmodell-Foto und Zahn-Muster, Schrift Jost – Platzhalter für Franie
- `v3/` – Übersichtsseite der drei v3-Varianten; `v3/assets/` ist die gemeinsame Basis (`base.css` + je eine `theme-*.css`, Schriften, Script). Die gekauften Fonts werden über die `@font-face`-Blöcke und die Variablen `--display`, `--cond`, `--text` eingetauscht.

Alle Entwürfe nutzen die Bilder aus `assets/img/`. v1 bleibt im Wurzelverzeichnis.
