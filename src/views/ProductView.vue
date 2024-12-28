<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Produkter i lager</h1>

    <!-- Successmeddelande vid lyckad operation -->
    <div v-if="successMessage" ref="successMessageRef" class="alert alert-success text-center" role="alert">
      {{ successMessage }}
    </div>

    <!-- Sök- och filterkomponent, lyssna på events för sökning och filtrering -->
    <ProductFilter @search="handleSearch" @filterCategory="handleFilterCategory"
      @filterSubcategory="handleFilterSubcategory" />

    <!-- Produktlista, skicka paginerade produkter som prop och lyssna på event för att återställa paginering -->
    <ProductList :products="paginatedProducts" @resetPage="resetPagination" />

    <!-- Paginering, skicka aktuell sida och totalt antal sidor som prop -->
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @changePage="handlePageChange" />
  </div>
</template>

<script>
import { useProductStore } from "../stores/product"; // Importera produktstoren
import { ref, computed, onMounted, nextTick } from "vue"; // Importera ref, computed, onMounted och nextTick
import ProductList from "@/components/ProductList.vue"; // Importera produktlistekomponenten
import ProductFilter from "@/components/ProductFilter.vue"; // Importera produktfilterkomponenten
import Pagination from "@/components/Pagination.vue"; // Importera pagineringskomponenten

export default {
  name: "ProductView",
  components: { ProductList, ProductFilter, Pagination }, // Registrera komponenterna
  setup() {
    const productStore = useProductStore(); // Använd produktstoren
    const searchQuery = ref(""); // Söksträng
    const selectedCategory = ref(""); // Vald huvudkategori
    const selectedSubcategory = ref(""); // Vald underkategori
    const currentPage = ref(1); // Aktuell sida
    const itemsPerPage = 5; // Antal produkter per sida
    const successMessage = ref(""); // Successmeddelande
    const successMessageRef = ref(null); // Referens till meddelandet

    // Visa successmeddelande
    const showMessage = async () => {
      successMessage.value = "Produkten sparades!";
      await nextTick(); // Invänta att DOM uppdateras
      // Scrolla till meddelandet
      if (successMessageRef.value) {
        successMessageRef.value.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      // Dölj meddelandet efter 3 sekunder
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    };

    // Filtrera produkter
    const filteredProducts = computed(() => {
      // Filtrera produkter baserat på söksträng, huvudkategori och underkategori
      return productStore.products.filter((product) => {
        const name = product.name ? product.name.toLowerCase() : ""; // Konvertera namn till lowercase för att matcha söksträng eller sätt till tom sträng
        const matchesSearch = name.includes(searchQuery.value.toLowerCase()); // Kontrollera om namnet matchar söksträngen
        const matchesCategory =
          !selectedCategory.value || product.category === selectedCategory.value; // Kontrollera om huvudkategori matchar vald kategori eller om ingen kategori är vald
        const matchesSubcategory =
          !selectedSubcategory.value || product.subcategory === selectedSubcategory.value; // Kontrollera om underkategori matchar vald underkategori eller om ingen underkategori är vald
        return matchesSearch && matchesCategory && matchesSubcategory;
      });
    });

    // Paginering av produkter
    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage; // Startindex för paginering
      const end = start + itemsPerPage; // Slutindex för paginering
      return filteredProducts.value.slice(start, end); // Returnera paginerade produkter
    });

    // Totalt antal sidor
    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage)); // Beräkna antal sidor baserat på filtrerade produkter och antal produkter per sida

    // Hantera sidbyte
    const handlePageChange = (page) => {
      currentPage.value = page; // Uppdatera aktuell sida
    };

    // Återställ till första sidan vid filtrering eller sökning
    const resetPagination = () => {
      currentPage.value = 1;
    };

    // Hantera sökning
    const handleSearch = (query) => {
      searchQuery.value = query; // Uppdatera söksträng
      resetPagination(); // Återställ paginering
    };

    // Hantera filtrering av kategori
    const handleFilterCategory = (category) => {
      selectedCategory.value = category; // Uppdatera vald huvudkategori
      resetPagination(); // Återställ paginering
    };

    // Hantera filtrering av underkategori
    const handleFilterSubcategory = (subcategory) => {
      selectedSubcategory.value = subcategory; // Uppdatera vald underkategori
      resetPagination(); // Återställ paginering
    };

    // Metod som körs när komponenten mountas
    onMounted(() => {
      const queryParams = new URLSearchParams(window.location.search); // Hämta query-parametrar från URL:en

      // Kontrollera om det finns en success-query-parameter
      if (queryParams.has("success")) {
        showMessage(); // Visa successmeddelande
      }
      productStore.fetchProducts(); // Hämta produkter från API:et
    });

    // Returnera data och metoder för komponenten
    return {
      searchQuery,
      selectedCategory,
      selectedSubcategory,
      currentPage,
      totalPages,
      paginatedProducts,
      handleSearch,
      handleFilterCategory,
      handleFilterSubcategory,
      handlePageChange,
      successMessage,
      successMessageRef,
      resetPagination,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 1.8rem;
}
</style>
