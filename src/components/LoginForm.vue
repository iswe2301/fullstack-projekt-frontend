<template>
    <!-- Formulär för inloggning, anropar handleLogin-metoden vid submit -->
    <form @submit.prevent="handleLogin">
        <div class="mb-3">
            <label for="email" class="form-label">E-postadress</label>
            <!-- Input för e-post, anropar validateEmail-metoden vid input -->
            <input type="email" id="email" class="form-control" v-model="email" placeholder="Ange din e-post"
                @input="validateEmail" :class="{ 'is-invalid': emailError }">
            <!-- Visa felmeddelande om e-postadressen inte är giltig -->
            <div v-if="emailError" class="invalid-feedback">
                {{ emailError }}
            </div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Lösenord</label>
            <!-- Input för lösenord, anropar validatePassword-metoden vid input -->
            <input type="password" id="password" class="form-control" v-model="password"
                placeholder="Ange ditt lösenord" @input="validatePassword" :class="{ 'is-invalid': passwordError }">
            <!-- Visa felmeddelande om lösenordet inte är giltigt -->
            <div v-if="passwordError" class="invalid-feedback">
                {{ passwordError }}
            </div>
        </div>
        <!-- Knapp för att logga in, inaktiverad om formuläret inte är korrekt ifyllt eller om inloggningen pågår -->
        <button type="submit" class="btn btn-primary w-100 bi bi-box-arrow-in-right"
            :disabled="loading || !!emailError || !!passwordError">
            {{ loading ? "Loggar in..." : "Logga in" }}
        </button>
        <!-- Visa eventuellt felmeddelande från inloggningen -->
        <div v-if="errorMessage" class="text-danger mt-3">
            {{ errorMessage }}
        </div>
    </form>
</template>

<script>
import { useAuthStore } from "@/stores/auth"; // Importera store för autentisering
import { useRouter } from "vue-router"; // Importera router

// Exportera komponenten
export default {
    name: "LoginForm",
    data() {
        return {
            // Data för e-post, lösenord, inloggningssstatus och eventuella felmeddelanden - default tomma
            email: "",
            password: "",
            loading: false, // Default false eftersom inloggningen inte pågår
            emailError: "",
            passwordError: "",
            errorMessage: "",
        };
    },
    methods: {
        // Valideringsmetod för e-postadress
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex för att validera e-postadress
            this.emailError = emailRegex.test(this.email) ? "" : "Ange en giltig e-postadress."; // Sätt felmeddelande om e-postadressen inte är giltig
        },
        validatePassword() {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Regex för att validera lösenord
            this.passwordError = passwordRegex.test(this.password)
                ? ""
                : "Lösenordet måste vara minst 8 tecken långt och innehålla minst en stor bokstav och en siffra."; // Sätt felmeddelande om lösenordet inte är giltigt
        },
        // Metod för att logga in en användare
        async handleLogin() {
            // Återställ eventuella felmeddelanden
            this.errorMessage = "";
            this.emailError = "";
            this.passwordError = "";

            // Validera att e-post och lösenord har fyllts i
            if (!this.email) {
                this.emailError = "Du måste ange en e-postadress.";
            }
            if (!this.password) {
                this.passwordError = "Du måste ange ett lösenord.";
            }

            // Om det finns valideringsfel, avbryt inloggningen
            if (this.emailError || this.passwordError) {
                return;
            }

            this.loading = true; // Sätt inloggningen till pågående
            const authStore = useAuthStore(); // Använd autentiseringsstoren
            const router = this.$router; // Använd router

            try {
                // Anropa login-metoden i storen för att logga in användaren
                await authStore.login(this.email, this.password, router);
                router.push("/products"); // Skicka användaren till produktsidan
            } catch (error) {
                this.errorMessage = error.message; // Sätt felmeddelande om inloggningen misslyckas
            } finally {
                this.loading = false; // Sätt inloggningen till avslutad
            }
        },
    },
};
</script>

<style scoped>
.text-danger {
    font-size: 0.9rem;
}

.bi-box-arrow-in-right:before {
    margin-right: 0.5rem;
}
</style>