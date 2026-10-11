const GloireTech = window.GloireTech || {};
GloireTech.commerce = GloireTech.commerce || {};

(function () {
    'use strict';

    const commerce = {
        name: 'GLOIRE COMMERCE',
        demoInventory: [
            { name: 'Pack numérique', price: 15 },
            { name: 'Formation IA locale', price: 35 },
            { name: 'Kit marketing', price: 50 }
        ],
        getDemoCatalog() {
            return this.demoInventory;
        },
        checkout(summary) {
            return {
                status: 'demo',
                message: 'Mode démonstration activé. Aucune transaction réelle n’a été effectuée.',
                summary: summary || 'Aucun résumé fourni.'
            };
        }
    };

    GloireTech.commerce = commerce;
})();
