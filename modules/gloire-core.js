const GloireTech = window.GloireTech || {};
GloireTech.core = GloireTech.core || {};

(function () {
    'use strict';

    const core = {
        appName: 'GloireTech-IA',
        version: '0.1.0',
        mission: 'Rendre l’intelligence artificielle et les outils numériques accessibles à tous.',
        states: {
            FUNCTIONAL: 'fonctionnel',
            EXPERIMENTAL: 'expérimental',
            DEMO: 'démo',
            UNAVAILABLE: 'indisponible'
        },
        getStatusSummary() {
            return {
                total: 13,
                operational: 4,
                experimental: 4,
                demo: 4,
                unavailable: 1
            };
        },
        showSystemInfo() {
            return {
                platform: navigator.platform || 'Unknown',
                userAgent: navigator.userAgent || 'Unknown',
                online: navigator.onLine,
                touchSupported: 'ontouchstart' in window || navigator.maxTouchPoints > 0
            };
        }
    };

    GloireTech.core = core;
})();
