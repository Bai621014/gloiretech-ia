const GloireTech = window.GloireTech || {};
GloireTech.abstraction = GloireTech.abstraction || {};

(function () {
    'use strict';

    const models = {
        demo: {
            name: 'Mode démonstration',
            type: 'mock',
            description: 'Aucune clé secrète, aucune intelligence artificielle réelle connectée. Des réponses explicites et non trompeuses sont affichées.'
        },
        api: {
            name: 'Modèle via API tierce',
            type: 'remote',
            description: 'Connexion future à un fournisseur API avec gestion de clé côté serveur.'
        },
        local: {
            name: 'Modèle local',
            type: 'on-device',
            description: 'Modèle exécutable localement sur des appareils capables de le supporter.'
        }
    };

    const abstraction = {
        providers: models,
        createProvider(kind) {
            if (!models[kind]) {
                return models.demo;
            }
            return models[kind];
        },
        getDefault() {
            return models.demo;
        }
    };

    GloireTech.abstraction = abstraction;
})();
