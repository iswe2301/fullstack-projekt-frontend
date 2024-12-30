<template>
    <div>
        <!-- Notifiering för raderad produkt, visas om deleteMessage är satt -->
        <div v-if="deleteMessage" ref="deleteMessageRef" :class="alertClass" role="alert">
            {{ deleteMessage }}
        </div>

        <!-- Om inga produkter finns, visa felmeddelande -->
        <div v-if="products.length === 0" class="text-center mt-4">
            Inga produkter hittades...
        </div>

        <!-- Lista över produkter -->
        <ul v-else class="list-group">
            <!-- Loopa igenom paginerade produkter och skapa en produktkomponent för varje produkt -->
            <li v-for="product in products" :key="product._id" class="list-group-item">
                <!-- Skicka produktobjektet som prop till produktkomponenten, lyssna på edit- och delete-events -->
                <Product :product="product" @edit="editProduct" @delete="deleteProduct" />
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, nextTick, computed } from "vue"; // Importera ref och nextTick
import { useProductStore } from "@/stores/product"; // Importera produktstoren
import { useRouter } from "vue-router"; // Importera useRouter för att navigera mellan sidor
import Product from "@/components/Product.vue"; // Importera produktkomponenten

export default {
    name: "ProductList",
    components: { Product }, // Registrera produktkomponenten
    props: {
        products: Array, // Array med produkter som prop
    },
    emits: ["resetPage"], // Event för att återställa till första sidan
    // Setup-funktion för att hantera paginering och redigering/radering av produkter
    setup(props, { emit }) {
        const router = useRouter(); // Använd Vue Router för navigering
        const productStore = useProductStore(); // Använd produktstoren
        const deleteMessage = ref(""); // Meddelande för raderad produkt
        const isError = ref(false); // Referens för att visa felmeddelande, satt till false som standard
        const deleteMessageRef = ref(null); // Referens till meddelandet

        // Metod för att redigera en produkt
        const editProduct = (product) => {
            // Navigera till sidan för att redigera produkten med produktens id som query-parameter
            router.push({ name: "addProduct", query: { productId: product._id } });
        };

        // Beräknad egenskap för att bestämma vilken CSS-klass som ska användas för alerten
        const alertClass = computed(() =>
            // Returnera "alert alert-danger text-center" om isError är true, annars "alert alert-success text-center"
            isError.value ? "alert alert-danger text-center" : "alert alert-success text-center"
        );

        // Metod för att radera en produkt
        const deleteProduct = async (productId) => {
            // Kontroll för att bekräfta radering av produkt
            const isConfirmed = window.confirm("Är du säker på att du vill radera produkten?");
            if (!isConfirmed) {
                return; // Avbryt om användaren klickar på "Avbryt"
            }
            try {
                // Anropa deleteProduct i produktstoren med produktens id
                await productStore.deleteProduct(productId);
                // Visa ett meddelande om att produkten raderats
                deleteMessage.value = "Produkten har raderats.";
                isError.value = false; // Dölj felmeddelande
                // Vänta på att DOM uppdateras innan skrollning sker
                await nextTick();
                // Skrolla till meddelandet
                if (deleteMessageRef.value) {
                    deleteMessageRef.value.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
                // Skicka event till föräldern för att återställa till första sidan
                emit("resetPage");
                // Dölj meddelandet efter 3 sekunder
                setTimeout(() => {
                    deleteMessage.value = "";
                }, 3000);
            } catch (error) {
                console.error("Fel vid radering:", error.message);
                deleteMessage.value = "Något gick fel. Försök igen senare.";
                isError.value = true; // Visa felmeddelande
            }
        };

        // Returnera data och metoder för komponenten
        return {
            editProduct,
            deleteProduct,
            deleteMessage,
            deleteMessageRef,
            alertClass,
        };
    },
};
</script>


<style scoped>
/* Anpassad stil för produktlistan */
.list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    border: 1px solid #ddd;
    margin-bottom: 1rem;
    padding: 15px;
}

@media (max-width: 580px) {
    .list-group-item {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>