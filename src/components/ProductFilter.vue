<template>
    <div class="row mb-4">
        <div class="col-md-4">
            <!-- Sökfält med ikon -->
            <div class="input-group">
                <span class="input-group-text">
                    <i class="bi bi-search"></i> <!-- Bootstrap Ikon -->
                </span>
                <!-- Sökfält, v-model för att binda värdet till search och skicka som event vid ändring -->
                <input type="text" class="form-control" v-model="search" @input="$emit('search', search)"
                    placeholder="Sök efter produkter" />
            </div>
        </div>
        <div class="col-md-4">
            <!-- Huvudkategori, v-model för att binda värdet till maincat och skicka som event vid ändring -->
            <select class="form-select" v-model="maincat" @change="$emit('filterCategory', maincat)">
                <option value="">Alla kategorier</option>
                <!-- Loopa igenom unika kategorier och skapa en option för varje kategori -->
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
        </div>
        <div class="col-md-4">
            <!-- Underkategori, v-model för att binda värdet till subcat och skicka som event vid ändring -->
            <select class="form-select" v-model="subcat" @change="$emit('filterSubcategory', subcat)">
                <option value="">Alla underkategorier</option>
                <!-- Loopa igenom unika underkategorier och skapa en option för varje underkategori -->
                <option v-for="subcategory in subcategories" :key="subcategory" :value="subcategory">
                    {{ subcategory }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>

import { computed, ref } from "vue"; // Importera ref och computed
import { useProductStore } from "../stores/product"; // Importera produktstoren

export default {
    name: "ProductFilter",
    setup() {
        // Använd produktstoren
        const productStore = useProductStore();

        // Söksträng, huvudkategori och underkategori, ref för att kunna lyssna på ändringar
        const search = ref("");
        const maincat = ref("");
        const subcat = ref("");

        // Filtrera ut unika huvudkategorier
        const categories = computed(() =>
            [...new Set(productStore.products.map((product) => product.category))]
        );
        // Filtrera ut unika underkategorier
        const subcategories = computed(() =>
            [...new Set(productStore.products.map((product) => product.subcategory))]
        );

        // Returnera data som komponenten behöver
        return {
            search,
            maincat,
            subcat,
            categories,
            subcategories,
        };
    },
};
</script>

<style scoped>
/* Anpassad stil för filterkomponenten */
@media (max-width: 767px) {
    .col-md-4 {
        margin-bottom: 10px;
    }
}
</style>