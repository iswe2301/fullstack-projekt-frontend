<template>
    <header>
        <!-- Bootstrapklasser för styling av header/nav -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top">
            <div class="container">
                <!-- Länk till startsidan/logga in för utloggade användare -->
                <router-link v-if="!isLoggedIn" class="navbar-brand no-active" to="/">
                    <img src="../assets/voffmjaulogo1.png" alt="Logotyp Voff&Mjau">
                </router-link>
                <!-- Länk till startsidan/produkter för inloggade användare -->
                <router-link v-if="isLoggedIn" class="navbar-brand no-active" to="/products">
                    <img src="../assets/voffmjaulogo1.png" alt="Logotyp Voff&Mjau">
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <!-- Visa olika länkar beroende på om användaren är inloggad eller inte -->
                        <li class="nav-item" v-if="!isLoggedIn">
                            <!-- Visas vid utloggat läge -->
                            <router-link class="nav-link" to="/" @click="closeMenu">Logga
                                in</router-link>
                        </li>
                        <!-- Visas inloggade användare -->
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link class="nav-link" to="/products" @click="closeMenu">Produkter</router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link class="nav-link" to="/add-product" @click="closeMenu">Lägg till
                                produkt</router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <!-- Knapp för att logga ut användaren, anropar metod vid klick -->
                            <button class="btn btn-primary bi bi-box-arrow-right" @click="logoutAndCloseMenu">Logga
                                ut</button>
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
import { computed } from "vue"; // Importera computed för att skapa beräknade egenskaper

export default {
    name: "Header",
    // Skapa setup-funktion för att använda store och router i komponenten
    setup() {
        const authStore = useAuthStore(); // Använd autentiseringsstoren
        const router = useRouter(); // Använd router

        // Skapa en beräknad egenskap för att kolla om användaren är inloggad
        const isLoggedIn = computed(() => authStore.isLoggedIn);

        // Metod för att stänga menyn när en länk klickas
        const closeMenu = () => {
            const menu = document.querySelector('.navbar-collapse');
            if (menu) {
                menu.classList.remove('show');
            }
        };

        // Funktion för att logga ut en användare
        const handleLogout = async () => {
            try {
                await authStore.logout(); // Logga ut användaren
                router.push("/"); // Skicka användaren till startsidan
            } catch (error) {
                console.error(error); // Logga eventuella fel
            }
        };

        // Funktion för att logga ut och stänga menyn
        const logoutAndCloseMenu = () => {
            handleLogout();
            closeMenu();
        };

        return {
            isLoggedIn, // Skicka med om användaren är inloggad eller inte
            handleLogout, // Skicka med funktionen för att logga ut användaren
            closeMenu, // Skicka med funktionen för att stänga menyn
            logoutAndCloseMenu, // Skicka med funktionen för att logga ut och stänga menyn
        };
    },
};
</script>

<style scoped>
/* Fixerad header */
nav {
    height: 80px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #eee4d2;
}

li a {
    margin: 0 1rem;
}

li button {
    margin: 5px 2rem 0 2rem;
    padding: 2px 10px 5px 10px;
}

/* Markera aktiv länk */
.router-link-active {
    font-weight: 600;
    color: #000000;
    background-color: #d8ccb5;
    border-radius: 5px;
}

.no-active {
    background-color: #eee4d2 !important;
}

.bi-box-arrow-right:before {
    margin-right: 0.5rem;
}

img {
    width: 100%;
    height: auto;
    max-height: 70px;
    padding-top: 5px;
    object-fit: cover;
}

/* Media query för mindre skärmar */
@media (max-width: 991px) {
    ul {
        margin-top: 2rem;
        background-color: #eee4d2;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 2rem;
    }

    li {
        display: flex;
        justify-content: center;
    }

    li a {
        margin: 0.8rem 0;
        padding: 0.5rem 1rem;
    }

    li button {
        margin: 1.5rem 0;
        padding: 0.4rem 1.5rem;
    }

    img {
        max-height: 60px;
    }
}
</style>