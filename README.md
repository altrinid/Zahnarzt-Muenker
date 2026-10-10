# Redesign: Ordination Dr. Roman Münzker

Neuentwurf für [zahnarzt-muenzker.at](https://www.zahnarzt-muenzker.at/) (bisher Jimdo), statisches HTML/CSS/JS ohne Build-Schritt.

- `index.html`: Startseite mit Leistungen, Kieferorthopädie, Füllungsvergleich, Ordination (Galerie), Team, Kontakt/Anfahrt
- `impressum.html`: Impressum und Datenschutz (Entwurf, vor Livegang rechtlich prüfen und Hosting-Anbieter ergänzen)
- `assets/`: CSS, JS, selbst gehostete Schriften (Source Serif 4, Libre Franklin), alle Originalfotos als WebP
- `vorschau/`: Screenshots Desktop und Handy

Keine Cookies, kein Tracking, keine externen Requests beim Laden; die OpenStreetMap-Karte lädt erst nach Klick.

Lokal ansehen: `index.html` im Browser öffnen.

## Entwurf v2 (Vollbild-Layout)

`v2/` enthält einen zweiten Entwurf mit denselben Farben und Inhalten, aber dunklem Grundton (Tiefgrün mit cremefarbenen Flächen), drei Schriftrollen (Archivo Black für Headlines, Barlow Condensed für Labels und Zahlen, Jost für Text – Platzhalter für Monstra Basic, Earlgos Condensed und Franie) und Vollbild-Layout: Hero über die ganze Bildschirmhöhe, Leistungen als Karten, Leitsatz-Band, randloser KFO-Block, Galerie als horizontales Bildband, Ablauf in vier Schritten, FAQ-Akkordeon. Bilder werden aus `assets/img/` der v1 mitbenutzt. Live-Vorschau nach dem Publizieren: `/v2/`. v1 bleibt im Wurzelverzeichnis.
