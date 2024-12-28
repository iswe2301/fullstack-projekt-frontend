<template>
    <!-- Paginering om det finns fler än en sida -->
    <nav v-if="totalPages > 1" class="mt-4">
        <ul class="pagination justify-content-center">
            <!-- Föregående sida, inaktiverad om det är första sidan, anropa changePage med currentPage - 1 -->
            <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="changePage(currentPage - 1)">
                <a class="page-link" href="#">Föregående</a>
            </li>
            <!-- Loopa igenom alla sidor och skapa en länk för varje sida -->
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }"
                @click="changePage(page)">
                <a class="page-link" href="#">{{ page }}</a>
            </li>
            <!-- Nästa sida, inaktiverad om det är sista sidan, anropa changePage med currentPage + 1 -->
            <li class="page-item" :class="{ disabled: currentPage === totalPages }"
                @click="changePage(currentPage + 1)">
                <a class="page-link" href="#">Nästa</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Pagination",
    // Ta emot currentPage och totalPages som props
    props: {
        currentPage: {
            type: Number,
        },
        totalPages: {
            type: Number,
        },
    },
    // Skicka currentPage som event när en sida klickas
    emits: ["changePage"],
    methods: {
        // Metod för att byta sida
        changePage(page) {
            // Kontrollera att sidan är inom intervallet 1 - totalPages
            if (page >= 1 && page <= this.totalPages) {
                // Skicka currentPage som event
                this.$emit("changePage", page);
            }
        },
    },
};
</script>

<style scoped>
/* Anpassad stil för paginering */
.pagination {
    margin-top: 1rem;
}
</style>
