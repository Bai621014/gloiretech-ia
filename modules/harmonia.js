const GloireTech = window.GloireTech || {};
GloireTech.harmonia = GloireTech.harmonia || {};

(function () {
    'use strict';

    const modes = {
        universal: {
            label: 'Valeurs universelles',
            description: 'Respect, honnêteté, dignité et non-violence.'
        },
        kingdom: {
            label: 'Royaume de Dieu',
            description: 'Une orientation spirituelle et morale pour les individus qui le souhaitent.'
        },
        custom: {
            label: 'Personnalisé',
            description: 'Profil configurable selon les préférences de l’utilisateur.'
        }
    };

    const harmonia = {
        modes,
        applyMode(mode) {
            const selected = modes[mode] || modes.universal;
            document.body.dataset.ethicsMode = mode || 'universal';
            return selected;
        },
        getCurrentMode() {
            return modes[document.body.dataset.ethicsMode] || modes.universal;
        }
    };

    GloireTech.harmonia = harmonia;
})();
