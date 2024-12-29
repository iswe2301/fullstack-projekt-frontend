# VOFF&MJAU Klient-applikation (SPA)
VOFF&MJAU är en webbapplikation skapad för att hantera produkter och lagersaldo i en fiktiv djuraffär. Applikationen är byggd med **Vue.js** som frontend-ramverk och använder **Bootstrap** som CSS-ramverk för styling. Applikationen kommunicerar med en REST-webbtjänst som hanterar backend-logiken och datalagringen.

Projektet är utvecklat som en del i kursen Fullstack-utveckling med ramverk (DT193G), Webbutvecklingsprogrammet, Mittuniversitetet. Detta är del 2 av fullstackprojektet (frontend-applikation).

## **Funktioner**
- CRUD-funktionalitet för produkter (skapa, läsa, uppdatera, ta bort).
- Ändra befintliga produkter, däribland hantering av lagersaldo (öka eller minska).
- Inloggning och utloggning med JWT-autentisering (Cookie)
- Responsivt användargränssnitt anpassat för både stora och små enheter.

## **Teknologier**
- **Vue.js** för frontend-logik.
- **Vue Router** för navigering.
- **Pinia** för state management.
- **Bootstrap** för styling och användargränssnitt.
- **Netlify** för publicering.

## **Installation och körning**

### **Förutsättningar**
- Node.js och npm installerat.

### **Installation**
1. Klona detta repo:
   ```bash
   git clone https://github.com/Webbutvecklings-programmet/projekt---klient-applikation-iswe2301.git
   ```

2. Installera nödvändiga paket:
   ```bash
   npm install
   ```

3. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

## **Funktionalitet och sidor**

### **Huvudfunktioner**
- **Produkter:**
  - Visa en lista över alla produkter med information som namn, beskrivning, pris, lagerstatus och kategori.
  - Redigera eller ta bort produkter.

- **Användarhantering:**
  - Logga in och logga ut via REST-webbtjänsten.

### **Navigering**
- **"/login"**: Inloggningssida och startsidan för applikationen.
- **"/products"**: Visa, redigera, ta bort produkter (skyddad sida, kräver inloggning)
- **"/add-product"**: Formulär för att lägga till ny produkt eller ändra befintlig produkt (skyddad sida, kräver inloggning).

## **Publicering**
Klientapplikationen finns publicerad på **Netlify**.  
Länk till applikationen: https://iswe2301-fullstack-projekt.netlify.app

## **Testkonto**
Använd följande testkonto för att logga in och utforska applikationen:
* **E-post:** admin@voffmjau.se
* **Lösenord:** Password123

## **Av**
- **Namn:** Isa Westling  
- **E-post:** iswe2301@student.miun.se  
- **Kurs:** DT193G Fullstack-utveckling med ramverk  
- **Projektets länk:** https://iswe2301-fullstack-projekt.netlify.app
- **År:** 2024  
- **Skola:** Mittuniversitetet