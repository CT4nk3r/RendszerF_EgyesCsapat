# RendszerF_EgyesCsapat

  A programunk egy Android applikáció lesz, amin lehet jelezni a
  különböző karbantartási igényeket. A programnak a szerver része ezeket
  fogja automatikusan is csinálni.

  Ki fogja osztani a szakemberek között a munkákat. (pl. minden
  negyedévben szól a tűzjelzők karbantartása miatt az illetékesnek
  (akinek van képesítése erre), hogy azt le kell ellenőrizni.)

  -   Eszközfelelős:

      -   Az eszközöknek kell: név, azonosító, kategória, leírás,
          elhelyezkedés (epület, szint stb.).

  -   Operátor:

      -   Ez kezeli az időszakos karbantartásokat.

      -   Kezeli a hibákat.

      -   A rendszer jelezzen, ha ütközés történik.

      -   Lásson minden futó problémat, ha valmai vissza van utasítva,
          akkor rakja vissza megint aktuálisba.

  -   Karbantartó:

      -   Lássa az aznapi feladatait.

      -   Munkája során kapjon információt a következő feladat
          helyszínéről.

      -   Legyen képes a feladat állapotának gyors és egyszerű
          változtatására.

      -   Kapjon pontos utasításokat a feladatának elvégzésének
          lépéseiről.
author:
- Bősze Máté, Braghini Benjamin, Gyombolai Ferenc
title: Rendszerfejlesztés
---

# Első mérföldkő: 2022. március. 29.

A program jelen állapotában támogatja a felhasználó belépését.
Regisztráció nem szükséges, ahogyan az a dokumentumokban is le volt
írva.

## A rendszer adatmodelljének megtervezése és előállítása

A jelenlegi állás, hogy megpróbáljuk az egész rendszert firebase-ben
megvalósítani. Ennek fő oka, hogy a Google rendszerében nagyon sok
biztonsági funkció alapból implementálva van, illetve nagyon jól
követhező, hogy melyik felhasználó honnan, mikor és hogya lép be.

## A rendszer architektúrájának megtervezése

Android rendszerben szeretnénk megvalósítani mindent, Kotlin nyelven. A
rendszer lényege, hogy a munkahelyi készülékeken alapból megtalálható
lesz ez az alkalmazás. Ezzel akár be is tud lépni a szakember. Ezzel
követhető, hogy mikor éppen min dolgozik és mivel telefonon lesz minden,
ezért nem lesz probléma abból, hogy nem tud valamiről értesítést kapni,
mivel nincsen gép előtt.

## Eszköz kategóriák felvétele, hierarchiába rendezése

Minden szakembernek tároljuk a képesítését és minden eszköznek a
karbantartásához kötünk egy képesítést.Így amikor valami elromlik akkor
rögtön lehet tudni, hogy kit kell megjelölni javításra. Persze több
szakember lehet ugyanarra a munkára. Az, hogy ezt ki fogja elvégezni az
a progrma segít eldönteni.

[image]{.image}

## Eszközök rögzítése(azonosító, név, helyszín, kategóriába sorolás)

Jelen példák alapján annyit változtattunk, hogy a kategória helyett
inkább képzettséget kötöttünk, viszont ez a későbbiekben tud változni.
Példa:

-   Azonosító: 1

-   Név: Villanydoboz

-   Helyszín: X épület \....

-   ~~Kategoria~~: Jártasság: Elektromosság

## Végzettségek felvétele és eszköz kategóriákhoz rendelése

Példát követve: elektromosságban való jártasság fontos, hogy meg
lehessen szerelni a villanydobozt
