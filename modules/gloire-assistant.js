const GloireTech = window.GloireTech || {};
GloireTech.assistant = GloireTech.assistant || {};

(function () {
    'use strict';

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    const assistant = {
        generateReply(input) {
            const value = String(input || '').trim();
            if (!value) {
                return 'Veuillez poser une question ou soumettre une commande.';
            }

            const lower = value.toLowerCase();

            if (lower.includes('module') || lower.includes('modules')) {
                return 'Modules disponibles : GLOIRE CORE, VELOX, MNÉMOS, AUTONOMIA, GNOSIS, HARMONIA, LUMEN, AURÉLIS, GLOIRE COMMERCE, GLOIRE ENGINEERING, GLOIRE STUDIO et GLOIRE ASSISTANT.';
            }

            if (lower.includes('aurélis') || lower.includes('aurelis')) {
                return 'AURÉLIS est un prototype expérimental de langage informatique. Il n’est ni un compilateur de production ni un langage complet. Les commandes reconnues sont limitées et documentées.';
            }

            if (lower.includes('mission') || lower.includes('objectif')) {
                return 'La mission de GloireTech-IA est de rendre l’intelligence artificielle, les outils numériques et l’innovation accessibles aux Africains et au reste du monde.';
            }

            if (lower.includes('pwa') || lower.includes('mobile')) {
                return 'Le prototype est construit comme une application web progressive (PWA), mobile-first, légère et installable via un navigateur compatible.';
            }

            if (lower.startsWith('aurelis:') || lower.startsWith('aurélis:')) {
                return GloireTech.aurelis?.interpret?.(value) || 'Commande AURÉLIS inconnue.';
            }

            if (lower.includes('copier') || lower.includes('clipboard')) {
                return 'Le bouton de copie est disponible dans les outils de démonstration. Si le navigateur l’empêche, il y a un fallback sécurisé via fenêtre de confirmation.';
            }

            return `Merci pour votre demande : "${escapeHtml(value)}". Le prototype actuel est la première couche fonctionnelle de GloireTech-IA. Les modules IA et les paiements réels exigeront ultérieurement un backend sécurisé et des services externes approuvés.`;
        }
    };

    GloireTech.assistant = assistant;
})();
