<template>
    <!-- Footer med Bootstrap-styling -->
    <footer class="text-white text-center py-3 mt-auto">
        <div class="container">
            <p class="m-0">© 2025 VOFF&MJAU</p>
        </div>
    </footer>
</template>

<script>
// Exportera komponenten
export default {
    name: 'Footer',
};
</script>

<style scoped>
/* Styling för footer */
footer {
    position: relative;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    background-color: #333;
}
</style>