const GloireTech = window.GloireTech || {};
GloireTech.mnemos = GloireTech.mnemos || {};

(function () {
    'use strict';

    const safeStorage = {
        get(key, fallback) {
            try {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : fallback;
            } catch (error) {
                console.warn('Mnémos read failed:', error);
                return fallback;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.warn('Mnémos write failed:', error);
                return false;
            }
        },
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.warn('Mnémos delete failed:', error);
                return false;
            }
        }
    };

    const mnemos = {
        key: 'gloiretech_memory',
        savePreferences(preferences) {
            if (!preferences || typeof preferences !== 'object') return false;
            return safeStorage.set(this.key, preferences);
        },
        readPreferences() {
            return safeStorage.get(this.key, {
                theme: 'system',
                language: 'fr',
                ethicsMode: 'universal',
                memoryEnabled: true
            });
        },
        export() {
            const data = this.readPreferences();
            return JSON.stringify(data, null, 2);
        },
        clear() {
            return safeStorage.remove(this.key);
        }
    };

    GloireTech.mnemos = mnemos;
})();
