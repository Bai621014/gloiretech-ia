const GloireTech = window.GloireTech || {};
GloireTech.finance = GloireTech.finance || {};

(function () {
    'use strict';

    const finance = {
        status: 'indisponible',
        description: 'Module finance réservé à un backend sécurisé avec vérification officielle des transactions.',
        listTrackers: [
            'Somme reçue',
            'Paiements en attente',
            'Historique de transactions',
            'Rapports de rapprochement'
        ],
        getDemoReport() {
            return {
                status: 'demo',
                summary: 'Pas de transaction réelles ni de données bancaires exposées dans ce prototype.'
            };
        }
    };

    GloireTech.finance = finance;
})();
