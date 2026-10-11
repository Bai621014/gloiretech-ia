const GloireTech = window.GloireTech || {};
GloireTech.lumen = GloireTech.lumen || {};

(function () {
    'use strict';

    const lumen = {
        name: 'LUMEN',
        generateDemoContent(theme) {
            const safeTheme = String(theme || 'innovation africaine').trim() || 'innovation africaine';
            return {
                headline: `GloireTech-IA : ${safeTheme}`,
                subtitle: 'Solutions intelligentes, accessibles et utiles pour le monde.',
                body: 'Cette version produit un contenu de démonstration sans intégration réelle à un service d’IA externe.'
            };
        }
    };

    GloireTech.lumen = lumen;
})();
