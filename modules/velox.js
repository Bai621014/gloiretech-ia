const GloireTech = window.GloireTech || {};
GloireTech.velox = GloireTech.velox || {};

(function () {
    'use strict';

    const velox = {
        name: 'VELOX',
        optimizeForMobile() {
            return {
                lazyLoadEnabled: true,
                reducedAnimations: true,
                dataSaverMode: true,
                cacheStaticAssets: true,
                note: 'Les animations lourdes doivent être évitées sur des téléphones modestes.'
            };
        },
        getConnectionHint() {
            if (!navigator.onLine) {
                return 'Aucune connexion réseau détectée. Certaines fonctions seront limitées jusqu’à rétablissement du réseau.';
            }
            return 'Connexion détectée — mode de démonstration prêt à fonctionner avec des ressources minimales.';
        }
    };

    GloireTech.velox = velox;
})();
