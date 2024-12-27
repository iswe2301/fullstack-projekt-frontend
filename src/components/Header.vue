<template>
    <header>
        <!-- Bootstrapklasser för styling av header/nav -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top">
            <div class="container">
                <!-- Länk till startsidan/logga in -->
                <router-link class="navbar-brand" to="/">VOFF&MJAU</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <!-- Visa olika länkar beroende på om användaren är inloggad eller inte -->
                        <li class="nav-item" v-if="!isLoggedIn">
                            <!-- Visas vid utloggat läge -->
                            <router-link class="nav-link" to="/">Logga in</router-link>
                        </li>
                        <!-- Visas inloggade användare -->
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link class="nav-link" to="/products">Produkter</router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link class="nav-link" to="/add-product">Lägg till produkt</router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <!-- Knapp för att logga ut användaren, anropar metod vid klick -->
                            <button class="btn btn-primary" @click="handleLogout">Logga ut</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { useAuthStore } from "../stores/auth"; // Importera store för autentisering
import { useRouter } from "vue-router"; // Importera router

export default {
    name: "Header",
    // Skapa setup-funktion för att använda store och router i komponenten
    setup() {
        const authStore = useAuthStore(); // Använd autentiseringsstoren
        const router = useRouter(); // Använd router

        // Funktion för att logga ut en användare
        const handleLogout = async () => {
            try {
                await authStore.logout(); // Logga ut användaren
                router.push("/"); // Skicka användaren till startsidan
            } catch (error) {
                console.error(error); // Logga eventuella fel
            }
        };

        return {
            isLoggedIn: authStore.isLoggedIn, // Skicka med om användaren är inloggad eller inte
            handleLogout, // Skicka med funktionen för att logga ut användaren
        };
    },
};
</script>

<style scoped>
/* Fixerad header */
header {
    height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0;
}

li a {
    margin: 0 1rem;
}

li button {
    margin: 5px 2rem 0 2rem;
    padding: 2px 10px 5px 10px;
}

/* Media query för mindre skärmar */
@media (max-width: 991px) {
    ul {
        margin-top: 2rem;
        background-color: #f0f0f0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    li {
        display: flex;
        justify-content: center;
    }

    li a {
        margin: 0.2rem 0;
    }

    li button {
        margin: 1rem 0;
    }
}
</style>