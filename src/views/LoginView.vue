<template>
  <!-- Container för logga in-formulär med Bootstrap-styling -->
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h1 class="text-center mb-4">Logga in</h1>
            <!-- Använd LoginForm-komponenten -->
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue"; // Importera LoginForm-komponenten

// Exportera komponenten
export default {
  name: "LoginView",
  components: {
    LoginForm, // Registrera LoginForm-komponenten
  },
};
</script>

<style scoped>
.card {
  margin-top: 3rem;
  padding: 1rem 0 2rem 0;
}

h1 {
  font-size: 2rem;
}
</style>
