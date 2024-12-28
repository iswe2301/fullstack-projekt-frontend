<template>
    <div class="product-form">
        <!-- Visa rubrik beroende på om vi redigerar eller skapar en ny produkt -->
        <h1 class="text-center">{{ isEditing ? "Ändra produkt" : "Skapa ny produkt" }}</h1>
        <!-- Formulär för att lägga till/ändra produkt -->
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Namn</label>
                <!-- Input-fält för namn, v-model för att binda värdet till localProduct.name -->
                <input type="text" id="name" class="form-control" v-model="localProduct.name">
                <!-- Visa felmeddelande om namnet är tomt -->
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Beskrivning</label>
                <!-- Textarea för beskrivning, v-model för att binda värde till localProduct.description -->
                <textarea id="description" class="form-control" v-model="localProduct.description" rows="5"></textarea>
                <!-- Visa felmeddelande om beskrivningen är tomt eller för lång -->
                <small v-if="errors.description" class="text-danger">{{ errors.description
                    }}</small>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">Kategori</label>
                <!-- Select-fält för kategori, v-model för att binda värde till localProduct.category -->
                <select id="category" class="form-select" v-model="localProduct.category">
                    <option value="" disabled>Välj kategori</option>
                    <!-- Loopa igenom kategorier och skapa en option för varje kategori -->
                    <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
                <!-- Visa felmeddelande om kategorin är tom -->
                <small v-if="errors.category" class="text-danger">{{ errors.category }}</small>
            </div>
            <div class="mb-3">
                <label for="subcategory" class="form-label">Underkategori</label>
                <!-- Select-fält för underkategori, v-model för att binda värde till localProduct.subcategory -->
                <select id="subcategory" class="form-select" v-model="localProduct.subcategory">
                    <option value="" disabled>Välj underkategori</option>
                    <!-- Loopa igenom underkategorier och skapa en option för varje underkategori -->
                    <option v-for="subcategory in subcategories" :key="subcategory" :value="subcategory">
                        {{ subcategory }}
                    </option>
                </select>
                <!-- Visa felmeddelande om underkategorin är tom -->
                <small v-if="errors.subcategory" class="text-danger">
                    {{ errors.subcategory }}
                </small>
            </div>
            <div class="mb-3">
                <label for="stock" class="form-label">Lagerantal</label>
                <!-- Input-fält för lagerantal, v-model för att binda värde till localProduct.stock -->
                <input type="number" id="stock" class="form-control" v-model="localProduct.stock">
                <!-- Visa felmeddelande om lagerantalet är tomt eller mindre än 0 -->
                <small v-if="errors.stock" class="text-danger">{{ errors.stock }}</small>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Pris</label>
                <!-- Input-fält för pris, v-model för att binda värde till localProduct.price -->
                <input type="number" id="price" class="form-control" v-model="localProduct.price">
                <!-- Visa felmeddelande om priset är tomt eller mindre än 0 -->
                <small v-if="errors.price" class="text-danger">{{ errors.price }}</small>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">
                    <!-- Ändra text och ikon beroende på om vi redigerar eller lägger till produkt -->
                    <i class="bi" :class="isEditing ? 'bi-check-square' : 'bi-plus-circle'"></i>
                    {{ isEditing ? "Spara ändringar" : "Lägg till produkt" }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive, watch } from "vue"; // Importera reactive och watch för att skapa reaktivt objekt

export default {
    name: "ProductForm",
    props: {
        // Produktobjekt som prop, default-värde är en tom produkt
        product: {
            type: Object,
            default: () => ({
                name: "",
                description: "",
                category: "",
                subcategory: "",
                stock: 0,
                price: 0
            }),
        },
        // Boolean för att hålla koll på om en produkt redigeras
        isEditing: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["submit"], // Skicka submit-event med uppdaterad produkt
    setup(props, { emit }) {
        const localProduct = reactive({ ...props.product }); // Skapa reaktivt objekt med produktdata
        const errors = reactive({}); // Skapa reaktivt objekt för felmeddelanden

        // Definiera tillgängliga kategorier och underkategorier
        const categories = ["Hund", "Katt"];
        const subcategories = [
            "Foder",
            "Godis",
            "Leksak",
            "Sovplats",
            "Kläder",
            "Träning",
            "Promenad",
            "Tillbehör",
            "Skötsel",
        ];

        // Uppdatera lokala produktdata när produkt-props ändras
        watch(
            () => props.product,
            (newProduct) => {
                Object.assign(localProduct, newProduct); // Kopiera props till lokal produkt
            },
            { immediate: true } // Uppdatera direkt vid första rendering
        );

        // Validera formulärdata
        const validate = () => {
            errors.name = localProduct.name ? "" : "Namn är obligatoriskt."; // Kontrollera om namn är tomt
            errors.description = localProduct.description
                ? localProduct.description.length <= 500
                    ? ""
                    : "Beskrivningen får max vara 500 tecken." // Kontrollera om beskrivningen är för lång
                : "Beskrivning är obligatoriskt."; // Kontrollera om beskrivning är tom
            errors.category = localProduct.category ? "" : "Kategori är obligatoriskt."; // Kontrollera om kategori är tom
            errors.subcategory = localProduct.subcategory ? "" : "Underkategori är obligatoriskt."; // Kontrollera om underkategori är tom
            errors.stock =
                localProduct.stock === "" || localProduct.stock === undefined // Kontrollera om lagerantal är tomt eller mindre än 0
                    ? "Lagerantal är obligatoriskt."
                    : localProduct.stock >= 0
                        ? ""
                        : "Lagerantal måste vara minst 0.";
            errors.price =
                localProduct.price === "" || localProduct.price === undefined // Kontrollera om pris är tomt eller mindre än 0
                    ? "Pris är obligatoriskt."
                    : localProduct.price >= 0
                        ? ""
                        : "Pris måste vara minst 0.";
            return !Object.values(errors).some((error) => error); // Returnera true om inga felmeddelanden finns
        };

        // Hantera formulärsubmit
        const handleSubmit = () => {

            // Kontrollera om formulärdatan är validerad
            if (validate()) {
                emit("submit", { ...localProduct }); // Skicka submit-event med uppdaterad produkt
            }
        };

        // Returnera data och metoder som komponenten behöver
        return {
            localProduct,
            errors,
            categories,
            subcategories,
            handleSubmit,
        };
    },
};
</script>

<style scoped>
/* Anpassad stil för produktformuläret */
.product-form {
    max-width: 500px;
    margin: 0 auto;
}

h1 {
    font-size: 1.8rem;
}

/* Anpassad stil för ikoner */
.bi-check-square:before,
.bi-plus-circle:before {
    margin-right: 0.5rem;
}
</style>
