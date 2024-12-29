<script>
import { RouterView } from 'vue-router'
// Importera komponenter
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: "App",
  // Registrera komponenter
  components: {
    Header,
    RouterView,
    Footer,
  },
};

</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Header /> <!-- Använd header -->
    <main class="flex-grow-1">
      <router-view /> <!-- Använd router-view -->
    </main>
    <Footer /> <!-- Använd footer -->
  </div>
</template>

<style scoped>
/* Styling för main-elementet */
main {
  min-height: 80vh;
  width: 100%;
  max-width: 800px;
  margin: 80px auto 2rem auto;
  padding: 1rem;
}
</style>
