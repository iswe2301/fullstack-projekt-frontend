<template>
    <!-- Lista med produkter -->
    <div class="product-info">
        <!-- Produktinformation hämtad från props -->
        <h2 class="mb-1">{{ product.name }}</h2>
        <p class="mb-1">{{ product.description }}</p>
        <small class="text-muted">
            Kategori: {{ product.category }} | Underkategori: {{ product.subcategory }}
        </small>
        <small class="d-block text-muted">
            Pris: {{ product.price }} kr | Lagersaldo: {{ product.stock }} ({{ product.stockStatus }})
        </small>
    </div>
    <!-- Knappar för redigering och radering -->
    <div class="product-actions">
        <!-- Skicka produktobjektet som event när knappen klickas -->
        <button class="btn btn-warning btn-sm bi bi-pencil" @click="$emit('edit', product)">
            Redigera
        </button>
        <!-- Skicka produktens id som event när knappen klickas -->
        <button class="btn btn-danger btn-sm bi bi-trash" @click="$emit('delete', product._id)">
            Radera
        </button>
    </div>
</template>

<script>
export default {
    name: "Product",
    // Tar emot produktobjekt som prop
    props: {
        product: Object,
    },
    // Skicka edit- och delete-events med produktobjektet respektive produktens id
    emits: ["edit", "delete"],
};
</script>

<style scoped>
/* Anpassad stil för varje produkt */
.product-info {
    flex: 1;
    margin-right: 20px;
    min-width: 0;
    overflow-wrap: break-word;
}

.product-actions {
    display: flex;
    gap: 1rem;
    flex-shrink: 0;
}

.product-actions button {
    width: 100px;
}

h2 {
    font-size: 1.2rem;
}

@media (max-width: 767px) {
    .product-info {
        margin-bottom: 1.5rem;
    }
}
</style>
