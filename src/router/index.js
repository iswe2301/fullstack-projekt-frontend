import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth' // Importera store för autentisering

// Skapa en router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login', // Starsidan (logga in)
      component: LoginView,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductView.vue'),
      meta: { requiresAuth: true } // Skyddad sida
    },
    {
      path: '/add-product',
      name: 'product',
      component: () => import('../views/AddProductView.vue'),
      meta: { requiresAuth: true } // Skyddad sida
    },
  ],
})

// Kontrollera om användaren är inloggad innan de får tillgång till skyddade sidor
router.beforeEach(async (to, from, next) => {

  const authStore = useAuthStore() // Hämta store för autentisering

  // Kontrollera om sidan kräver autentisering
  if (to.meta.requiresAuth) {
    await authStore.checkAuth(); // Kontrollera om användaren är inloggad (anropa metod)

    // Kontrollera om användaren är inloggad
    if (authStore.isLoggedIn) {
      next(); // Tillåt användare att se sidan om de är inloggade
    } else {
      next('/'); // Skicka användaren till inloggning
    }

  } else {
    next(); // För icke-skyddade sidor
  }
});

export default router
