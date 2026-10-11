const GloireTech = window.GloireTech || {};
GloireTech.security = GloireTech.security || {};

(function () {
    'use strict';

    const security = {
        sanitizeInput(value) {
            return String(value || '').replace(/[<>"'`]/g, '').trim();
        },
        validateModuleName(value) {
            return typeof value === 'string' && value.trim().length > 0;
        },
        safeText(value) {
            return String(value || '').replace(/[<>]/g, '');
        }
    };

    GloireTech.security = security;
})();
