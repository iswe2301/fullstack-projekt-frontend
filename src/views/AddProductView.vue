<template>
    <div class="container mt-5">
        <!-- Visa felmeddelande om det finns ett fel -->
        <div v-if="errorMessage" class="alert alert-danger text-center mt-3">
            {{ errorMessage }}
        </div>
        <!-- Visa formulär för att lägga till/ändra produkt -->
        <ProductForm :product="product" :isEditing="isEditing" @submit="handleSubmit" />
    </div>
</template>

<script>
import { ref, onMounted } from "vue"; // Importera ref och onMounted
import { useProductStore } from "@/stores/product"; // Importera produktstoren
import ProductForm from "@/components/ProductForm.vue"; // Importera produktformulärkomponenten
import { useRoute, useRouter } from "vue-router"; // Importera useRoute och useRouter för att hantera routing

export default {
    name: "AddProductView",
    components: { ProductForm },
    setup() {
        const productStore = useProductStore(); // Använd produktstoren
        const route = useRoute(); // Använd route för att hämta query-parametrar
        const router = useRouter(); // Använd router för att navigera mellan sidor
        const errorMessage = ref(""); // Felmeddelande om något går fel
        const isEditing = ref(false); // Boolean för att hålla koll på om en produkt redigeras

        // Skapa en referens till en produkt som ska läggas till/ändras, startvärde är en tom produkt
        const product = ref({
            name: "",
            description: "",
            category: "",
            subcategory: "",
            stock: 0,
            price: 0,
        });

        // Metod som körs när komponenten mountas
        onMounted(() => {
            const productId = route.query.productId; // Hämta produkt-ID från query-parametern

            // Kontrollera om det finns ett produkt-ID
            if (productId) {
                const existingProduct = productStore.products.find((p) => p._id === productId); // Hitta produkten i produktstoren

                // Om produkten finns, kopiera den till produkt-referensen och sätt isEditing till true
                if (existingProduct) {
                    product.value = { ...existingProduct };
                    isEditing.value = true;
                }
            }
        });

        // Metod för att hantera skapande/ändring av produkt
        const handleSubmit = async (updatedProduct) => {
            try {
                // Kontrollera om vi redigerar en produkt eller lägger till en ny
                if (isEditing.value) {
                    await productStore.updateProduct(updatedProduct); // Anropa metod för att uppdatera en produkt
                } else {
                    await productStore.addProduct(updatedProduct); // Anropa metod för att lägga till en produkt
                }
                // Navigera tillbaka till produktsidan med success-query-parametern vid lyckat skapande/ändring
                router.push({ path: "/products", query: { success: true } });
                // Fånga upp eventuella fel
            } catch (error) {
                errorMessage.value = error.message || "Något gick fel. Försök igen."; // Visa felmeddelande
                console.error("Fel vid skapande/uppdatering:", error);
            }
        };

        // Returnera data som komponenten behöver
        return {
            product,
            isEditing,
            handleSubmit,
            errorMessage,
        };
    },
};
</script>
