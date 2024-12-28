<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Produkter i lager</h1>

    <!-- Sök- och filterkomponent, lyssna på search-, filterCategory- och filterSubcategory-events -->
    <ProductFilter @search="searchQuery = $event" @filterCategory="selectedCategory = $event"
      @filterSubcategory="selectedSubcategory = $event" />

    <!-- Produktlista, skicka filtrerade produkter som prop -->
    <ProductList :products="filteredProducts" />
  </div>
</template>

<script>
import { useProductStore } from "../stores/product"; // Importera produktstoren
import { ref, computed, onMounted } from "vue"; // Importera ref, computed och onMounted
import ProductList from "@/components/ProductList.vue"; // Importera produktlistekomponenten
import ProductFilter from "@/components/ProductFilter.vue"; // Importera filterkomponenten

export default {
  name: "ProductView",
  components: {
    ProductList, // Registrera produktlistekomponenten
    ProductFilter, // Registrera filterkomponenten
  },
  setup() {
    const productStore = useProductStore(); // Använd produktstoren
    const searchQuery = ref(""); // Söksträng
    const selectedCategory = ref(""); // Vald huvudkategori
    const selectedSubcategory = ref(""); // Vald underkategori

    // Filtrering och sökning
    const filteredProducts = computed(() => {
      // Filtrera produkter baserat på söksträng, huvudkategori och underkategori
      return productStore.products.filter((product) => {
        const matchesSearch = product.name // Filtrera på produktnamn
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        const matchesCategory =
          !selectedCategory.value || product.category === selectedCategory.value; // Filtrera på huvudkategori
        const matchesSubcategory =
          !selectedSubcategory.value ||
          product.subcategory === selectedSubcategory.value; // Filtrera på underkategori
        return matchesSearch && matchesCategory && matchesSubcategory; // Returnera produkter som matchar alla filter
      });
    });

    // Hämta produkter vid komponentens initiering
    onMounted(() => {
      productStore.fetchProducts(); // Hämta produkter från API
    });

    // Returnera söksträng, vald huvudkategori, vald underkategori och filtrerade produkter
    return {
      searchQuery,
      selectedCategory,
      selectedSubcategory,
      filteredProducts,
    };
  },
};
</script>