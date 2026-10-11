const GloireTech = window.GloireTech || {};
GloireTech.payments = GloireTech.payments || {};

(function () {
    'use strict';

    const connectors = [
        {
            provider: 'Mobile Money',
            status: 'demo',
            note: 'Aucune transaction réelle. Un backend officiel est requis.'
        },
        {
            provider: 'Airtel Money',
            status: 'demo',
            note: 'À activer via API officielle autorisée et vérification serveur.'
        },
        {
            provider: 'Moov Money',
            status: 'demo',
            note: 'Disponible seulement si le prestataire l’autorise dans le pays concerné.'
        },
        {
            provider: 'Cartes bancaires',
            status: 'demo',
            note: 'Aucune carte ni pièce d’identité n’est enregistrée dans GitHub.'
        }
    ];

    const payments = {
        connectors,
        createDemoTransaction(amount, currency) {
            const safeAmount = Number(amount) || 0;
            return {
                status: 'demo',
                amount: safeAmount,
                currency: String(currency || 'XOF'),
                note: 'Mode sandbox : aucune transaction réelle n’a été exécutée.'
            };
        }
    };

    GloireTech.payments = payments;
})();
