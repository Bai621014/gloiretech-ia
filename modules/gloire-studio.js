const GloireTech = window.GloireTech || {};
GloireTech.studio = GloireTech.studio || {};

(function () {
    'use strict';

    const studio = {
        deliverables: [
            'Poster promotionnel',
            'Fiche produit',
            'Logo minimaliste',
            'Mise en page sociale'
        ],
        generateBrief(title) {
            return {
                title: title || 'Brief marketing',
                audience: 'Entrepreneurs, commerçants et créateurs africains',
                format: 'Mobile-first / réseaux sociaux',
                status: 'demo'
            };
        }
    };

    GloireTech.studio = studio;
})();
