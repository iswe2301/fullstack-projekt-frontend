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
        // Metod för att lägga till en ny produkt
        async addProduct(newProduct) {
            try {
                // Skicka en POST-förfrågan till API:et
                const response = await fetch("https://fullstack-projekt-backend.onrender.com/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newProduct),
                    credentials: "include",
                });
                // Kasta ett fel om status inte är 201 Created
                if (!response.ok) throw new Error("Kunde inte lägga till produkt");
                // Om allt gick bra, lägg till den nya produkten i state
                const createdProduct = await response.json();
                this.products.push(createdProduct);
                // Fånga upp eventuella fel och skriv ut dem i konsolen
            } catch (error) {
                console.error("Fel vid skapande av produkt:", error);
            }
        },
        // Metod för att uppdatera en produkt
        async updateProduct(updatedProduct) {
            // Skicka en PUT-förfrågan till API:et
            try {
                const response = await fetch(`https://fullstack-projekt-backend.onrender.com/products/${updatedProduct._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProduct),
                    credentials: "include",
                });
                // Kasta ett fel om status inte är 200 OK
                if (!response.ok) throw new Error("Kunde inte uppdatera produkt");
                // Om allt gick bra, hämta index för den uppdaterade produkten
                const index = this.products.findIndex(
                    (product) => product._id === updatedProduct._id
                );
                // Kontrollera att produkten finns i arrayen och uppdatera den
                if (index !== -1) {
                    this.products[index] = updatedProduct;
                }
                // Fånga upp eventuella fel och skriv ut dem i konsolen
            } catch (error) {
                console.error("Fel vid uppdatering av produkt:", error);
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
