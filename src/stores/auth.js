import { defineStore } from 'pinia'; // Importera funktionen defineStore från pinia

// Skapa en ny store för autentisering
export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false, // Kontrollera om användaren är inloggad
    }),

    // Skapa metoder för att logga in, logga ut och kontrollera autentisering
    actions: {
        // Metod för att logga in en användare
        async login(email, password) {
            try {
                // Skicka en POST-förfrågan till /login med användarens e-post och lösenord
                const response = await fetch('https://fullstack-projekt-backend.onrender.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include', // Inkludera cookies i förfrågan
                });

                // Kontrollera om förfrågan misslyckades och kasta ett fel
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Inloggning misslyckades');
                }

                // Uppdatera inloggningstatus om inloggningen lyckades
                this.isLoggedIn = true;

                // Fånga upp eventuella fel och skriv ut dem i konsolen
            } catch (error) {
                console.error('Fel vid inloggning:', error.message);
                throw error;
            }
        },

        // Metod för att logga ut en användare
        async logout() {
            try {
                // Skicka en POST-förfrågan till /logout
                const response = await fetch('https://fullstack-projekt-backend.onrender.com/logout', {
                    method: 'POST',
                    credentials: 'include', // Skicka med cookies i förfrågan
                });

                // Kontrollera om förfrågan misslyckades och kasta ett fel
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Utloggning misslyckades');
                }

                // Uppdatera inloggningstatus om utloggningen lyckades
                this.isLoggedIn = false;

                // Fånga upp eventuella fel och skriv ut dem i konsolen
            } catch (error) {
                console.error('Fel vid inloggning:', error.message);
                throw error;
            }
        },

        // Metod för att kontrollera om en användare är inloggad
        async checkAuth() {
            try {
                // Skicka en GET-förfrågan till skyddad route för att kontrollera autentisering
                const response = await fetch('https://fullstack-projekt-backend.onrender.com/products', {
                    method: 'GET',
                    credentials: 'include', // Inkludera cookies i förfrågan
                });

                // Kontrollera om användaren är inloggad baserat på om förfrågan lyckades
                this.isLoggedIn = response.ok;

                // Fånga upp eventuella fel och skriv ut dem i konsolen
            } catch (error) {
                console.error('Fel vid autentiseringskontroll:', error.message);
                this.isLoggedIn = false; // Om ett fel uppstår, ändra inloggningstatus till false (utloggad)
            }
        },
    },
});
