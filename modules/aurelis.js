const GloireTech = window.GloireTech || {};
GloireTech.aurelis = GloireTech.aurelis || {};

(function () {
    'use strict';

    const grammar = [
        'AURÉLIS: hello',
        'AURÉLIS: help',
        'AURÉLIS: declare project <nom>',
        'AURÉLIS: show message <message>',
        'AURÉLIS: list modules'
    ];

    function normalize(input) {
        return String(input || '').trim();
    }

    const aurelis = {
        grammar,
        interpret(input) {
            const command = normalize(input);
            if (!command) return 'Aucune commande AURÉLIS fournie.';

            if (command === 'AURÉLIS: hello' || command === 'AURELIS: hello') {
                return 'Bonjour ! AURÉLIS répond ici en mode prototype expérimental.';
            }

            if (command === 'AURÉLIS: help' || command === 'AURELIS: help') {
                return `Grammaire disponible :\n${grammar.join('\n')}`;
            }

            if (command.startsWith('AURÉLIS: declare project ') || command.startsWith('AURELIS: declare project ')) {
                const projectName = command.replace(/^AURÉLIS: declare project /i, '').replace(/^AURELIS: declare project /i, '').trim();
                return projectName ? `Projet "${projectName}" déclaré dans le prototype AURÉLIS.` : 'Nom du projet requis.';
            }

            if (command.startsWith('AURÉLIS: show message ') || command.startsWith('AURELIS: show message ')) {
                const msg = command.replace(/^AURÉLIS: show message /i, '').replace(/^AURELIS: show message /i, '').trim();
                return msg ? msg : 'Le message est vide.';
            }

            if (command === 'AURÉLIS: list modules' || command === 'AURELIS: list modules') {
                return 'Modules disponibles : GLOIRE CORE, VELOX, HARMONIA, GLOIRE ASSISTANT et les modules expérimentaux.';
            }

            return 'Commande AURÉLIS non reconnue. Tapez AURÉLIS: help pour voir les commandes disponibles.';
        }
    };

    GloireTech.aurelis = aurelis;
})();
