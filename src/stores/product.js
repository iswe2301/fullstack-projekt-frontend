import { defineStore } from "pinia"; // Importera funktionen defineStore från pinia

// Skapa en store för produkter
export const useProductStore = defineStore("productStore", {
    state: () => ({
        products: [], // Array med produkter
    }),
    actions: {
        // Metod för att hämta produkter från API:et
        async fetchProducts() {
            try {
                const response = await fetch(
                    "https://fullstack-projekt-backend.onrender.com/products",
                    { credentials: "include" } // Skicka med cookies
                );
                // Kasta ett fel om status inte är 200 OK
                if (!response.ok) throw new Error("Kunde inte hämta produkter");
                // Om allt gick bra, spara produkterna i state
                this.products = await response.json();
                // Fånga upp eventuella fel och skriv ut dem i konsolen
            } catch (err) {
                console.error(err);
            }
        },
        // Metod för att radera en produkt
        async deleteProduct(productId) {
            try {
                // Skicka en DELETE-förfrågan till API:et
                const response = await fetch(
                    `https://fullstack-projekt-backend.onrender.com/products/${productId}`,
                    {
                        method: "DELETE",
                        credentials: "include", // Skicka med cookies
                    }
                );
                // Kasta ett fel om status inte är 200 OK
                if (!response.ok) throw new Error("Radering misslyckades");

                // Uppdatera state genom att filtrera bort den raderade produkten
                this.products = this.products.filter((product) => product._id !== productId);

                // Fånga upp eventuella fel och skriv ut dem i konsolen
            } catch (error) {
                console.error("Fel vid radering:", error.message);
            }
        },
    },
});
