const GloireTech = window.GloireTech || {};
GloireTech.gnosis = GloireTech.gnosis || {};

(function () {
    'use strict';

    const gnosis = {
        name: 'GNOSIS',
        knowledgeBase: [
            'GloireTech-IA vise à rendre l’innovation accessible.',
            'Le prototype actuel est une version PWA autonome sans backend IA.',
            'Les fonctions de recherche et d’apprentissage peuvent être connectées à des services approuvés plus tard.'
        ],
        search(query) {
            const q = String(query || '').trim().toLowerCase();
            if (!q) return [];
            return this.knowledgeBase.filter((entry) => entry.toLowerCase().includes(q));
        },
        explain(topic) {
            if (!topic) return 'Merci de préciser un sujet.';
            return `A propos de ${topic} : ce prototype montre une architecture modulaire destinée à être complétée par des outils de recherche, d’apprentissage et de pédagogie.`;
        }
    };

    GloireTech.gnosis = gnosis;
})();
