const appState = {
    modules: [],
    activeView: 'dashboard',
    searchTerm: '',
    chatHistory: []
};

const safeStorage = {
    get(key, fallback = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (error) {
            console.warn('Storage read failed:', error);
            return fallback;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn('Storage write failed:', error);
            return false;
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.warn('Storage remove failed:', error);
            return false;
        }
    }
};

const defaultPreferences = {
    theme: 'system',
    language: 'fr',
    ethicsMode: 'universal',
    memoryEnabled: true
};

function applyTheme(themePreference) {
    const resolvedTheme = themePreference === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : themePreference;
    document.body.setAttribute('data-theme', resolvedTheme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.innerHTML = resolvedTheme === 'dark'
            ? '<span class="theme-icon">☀️</span>'
            : '<span class="theme-icon">🌙</span>';
    }
}

function updateConnectionStatus() {
    const statusText = document.getElementById('status-text');
    const statusBanner = document.getElementById('status-banner');
    if (!statusText || !statusBanner) return;

    if (navigator.onLine) {
        statusText.textContent = '📡 Connexion disponible — prototype en mode démonstration';
        statusBanner.classList.remove('offline', 'warning');
    } else {
        statusText.textContent = '📴 Connexion réseau indisponible — certaines fonctionnalités seront limitées';
        statusBanner.classList.add('offline');
    }
}

function openView(viewName) {
    appState.activeView = viewName;
    const views = document.querySelectorAll('.view');
    views.forEach((view) => {
        view.classList.toggle('active', view.id === `view-${viewName}`);
    });

    document.querySelectorAll('.nav-btn').forEach((button) => {
        const active = button.dataset.view === viewName;
        button.classList.toggle('active', active);
        if (active) {
            button.setAttribute('aria-current', 'page');
        } else {
            button.removeAttribute('aria-current');
        }
    });
}

function moduleStateClass(state) {
    const map = {
        'fonctionnel': 'state-functional',
        'expérimental': 'state-experimental',
        'démo': 'state-demo',
        'indisponible': 'state-unavailable'
    };
    return map[state] || 'state-demo';
}

function renderModuleCard(module) {
    const card = document.createElement('article');
    card.className = 'module-card';
    const stateBadge = moduleStateClass(module.state);
    card.innerHTML = `
        <div class="module-card-head">
            <div class="module-icon">${module.icon || '✨'}</div>
            <span class="module-state ${stateBadge}">${module.state}</span>
        </div>
        <div>
            <h3 class="module-name">${module.name}</h3>
        </div>
        <p>${module.description}</p>
        <div class="module-actions">
            <button type="button" data-action="open-module" data-name="${module.name}">Ouvrir</button>
            <button type="button" data-action="module-info" data-name="${module.name}" class="secondary">Détails</button>
        </div>
    `;
    return card;
}

function renderDashboard() {
    const container = document.getElementById('dashboard-modules');
    if (!container) return;

    const featured = appState.modules.slice(0, 6);
    container.innerHTML = '';
    featured.forEach((module) => container.appendChild(renderModuleCard(module)));
}

function renderModules() {
    const container = document.getElementById('all-modules');
    if (!container) return;

    const filtered = appState.modules.filter((module) => {
        const query = appState.searchTerm.trim().toLowerCase();
        if (!query) return true;
        return `${module.name} ${module.description}`.toLowerCase().includes(query);
    });

    container.innerHTML = '';
    if (!filtered.length) {
        container.innerHTML = '<div class="info-box"><p>Aucun module trouvé pour votre recherche.</p></div>';
        return;
    }

    filtered.forEach((module) => container.appendChild(renderModuleCard(module)));
}

function registerModuleSearch() {
    const input = document.getElementById('module-search');
    if (!input) return;

    input.addEventListener('input', (event) => {
        appState.searchTerm = event.target.value;
        renderModules();
    });

    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            renderModules();
        });
    }
}

function applySavedPreferences() {
    const prefs = safeStorage.get('gloiretech_preferences', defaultPreferences);
    const resolved = { ...defaultPreferences, ...prefs };

    const themeSelect = document.getElementById('theme-select');
    const languageSelect = document.getElementById('language-select');
    const ethicsMode = document.getElementById('ethics-mode');
    const memoryEnable = document.getElementById('memory-enable');

    if (themeSelect) themeSelect.value = resolved.theme;
    if (languageSelect) languageSelect.value = resolved.language;
    if (ethicsMode) ethicsMode.value = resolved.ethicsMode;
    if (memoryEnable) memoryEnable.checked = !!resolved.memoryEnabled;

    applyTheme(resolved.theme);
    if (typeof window.GloireTech?.harmonia?.applyMode === 'function') {
        window.GloireTech.harmonia.applyMode(resolved.ethicsMode);
    }
}

function savePreferences() {
    const prefs = {
        theme: document.getElementById('theme-select')?.value || defaultPreferences.theme,
        language: document.getElementById('language-select')?.value || defaultPreferences.language,
        ethicsMode: document.getElementById('ethics-mode')?.value || defaultPreferences.ethicsMode,
        memoryEnabled: document.getElementById('memory-enable')?.checked ?? defaultPreferences.memoryEnabled
    };

    safeStorage.set('gloiretech_preferences', prefs);
    applyTheme(prefs.theme);
    if (typeof window.GloireTech?.harmonia?.applyMode === 'function') {
        window.GloireTech.harmonia.applyMode(prefs.ethicsMode);
    }
}

function bindSettingsControls() {
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', savePreferences);
    }

    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', savePreferences);
    }

    const ethicsMode = document.getElementById('ethics-mode');
    if (ethicsMode) {
        ethicsMode.addEventListener('change', savePreferences);
    }

    const memoryEnable = document.getElementById('memory-enable');
    if (memoryEnable) {
        memoryEnable.addEventListener('change', savePreferences);
    }
}

function bindThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) return;

    toggleButton.addEventListener('click', () => {
        const themeSelect = document.getElementById('theme-select');
        const current = themeSelect ? themeSelect.value : 'system';
        const next = current === 'dark' ? 'light' : 'dark';
        if (themeSelect) themeSelect.value = next;
        savePreferences();
    });
}

function bindNavigation() {
    document.querySelectorAll('.nav-btn').forEach((button) => {
        button.addEventListener('click', () => openView(button.dataset.view));
    });
}

function bindModuleActions() {
    document.addEventListener('click', (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const moduleName = target.dataset.name;
        const module = appState.modules.find((item) => item.name === moduleName);

        if (!module) return;

        if (action === 'open-module') {
            if (module.name === 'GLOIRE ASSISTANT') {
                openView('assistant');
                return;
            }
            const message = `Ouverture du module ${module.name}.\nÉtat : ${module.state}.\nProchaines étapes : ${module.nextSteps || 'À définir dans une future évolution.'}`;
            window.alert(message);
        }

        if (action === 'module-info') {
            const message = `${module.name}\n\n${module.description}\n\nÉtat : ${module.state}\n\nÀ venir : ${module.nextSteps || 'Aucun élément spécifique pour le moment.'}`;
            window.alert(message);
        }
    });
}

function safeCopyText(text) {
    if (!text) return false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
            const fallback = window.prompt('Copier le texte généré :', text);
            return !!fallback;
        });
        return true;
    }

    const fallback = window.prompt('Copier le texte généré :', text);
    return !!fallback;
}

function addAssistantMessage(text, sender = 'assistant') {
    const chatDisplay = document.getElementById('chat-display');
    if (!chatDisplay) return;

    const wrapper = document.createElement('div');
    wrapper.className = `chat-message ${sender === 'assistant' ? 'assistant-message' : 'user-message'}`;
    const escaped = String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    const paragraphs = escaped.split('\n').map((line) => `<p>${line}</p>`).join('');
    wrapper.innerHTML = paragraphs;
    chatDisplay.appendChild(wrapper);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    appState.chatHistory.push({ sender, text, timestamp: new Date().toISOString() });
}

function initAssistant() {
    const sendButton = document.getElementById('assistant-send');
    const input = document.getElementById('assistant-input');
    if (!sendButton || !input) return;

    sendButton.addEventListener('click', () => {
        const value = input.value.trim();
        if (!value) return;
        addAssistantMessage(value, 'user');
        const reply = window.GloireTech?.assistant?.generateReply?.(value) || 'Je ne peux pas répondre à cette demande pour l\'instant.';
        setTimeout(() => addAssistantMessage(reply, 'assistant'), 200);
        input.value = '';
        input.focus();
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendButton.click();
        }
    });
}

function bindExportDelete() {
    const exportBtn = document.getElementById('export-data');
    const deleteBtn = document.getElementById('delete-data');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = safeStorage.get('gloiretech_preferences', defaultPreferences);
            const serialized = JSON.stringify(data, null, 2);
            safeCopyText(serialized);
            window.alert('Les préférences ont été préparées pour copie.');
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            const confirmed = window.confirm('Supprimer les préférences enregistrées localement ?');
            if (confirmed) {
                safeStorage.remove('gloiretech_preferences');
                appState.chatHistory = [];
                window.alert('Les données locales ont été supprimées.');
                applySavedPreferences();
            }
        });
    }
}

async function loadModules() {
    try {
        const response = await fetch('config/modules.json');
        if (!response.ok) throw new Error('Module configuration unavailable');
        const data = await response.json();
        appState.modules = data.modules || [];
    } catch (error) {
        console.warn('Falling back to default module list:', error);
        appState.modules = [
            { name: 'GLOIRE CORE', icon: '🧠', description: 'Noyau de navigation et orchestration du système.', state: 'fonctionnel', nextSteps: 'Ajouter la gestion avancée des permissions.' },
            { name: 'VELOX', icon: '⚡', description: 'Optimisation de la vitesse et du chargement.', state: 'fonctionnel', nextSteps: 'Surveiller les performances réseau.' },
            { name: 'MNÉMOS', icon: '🧾', description: 'Mémoire et préférences utilisateur locales.', state: 'expérimental', nextSteps: 'Valider la suppression et l\'export des données.' },
            { name: 'AUTONOMIA', icon: '🤖', description: 'Automatisation d\'actions et workflows.', state: 'expérimental', nextSteps: 'Ajouter des tâches contrôlées et sécurisées.' },
            { name: 'GNOSIS', icon: '📚', description: 'Recherche et apprentissage assisté.', state: 'démo', nextSteps: 'Connecter des sources approuvées.' },
            { name: 'HARMONIA', icon: '✨', description: 'Mode de valeurs éthiques et interfaces personnalisées.', state: 'fonctionnel', nextSteps: 'Étendre les profils de valeurs.' },
            { name: 'LUMEN', icon: '🎨', description: 'Création assistée de contenus visuels et textuels.', state: 'démo', nextSteps: 'Connecter des services tiers à la demande.' },
            { name: 'AURÉLIS', icon: '🧩', description: 'Prototype de langage expérimental et interpréteur.', state: 'expérimental', nextSteps: 'Ajouter un analyseur plus complet.' },
            { name: 'GLOIRE COMMERCE', icon: '🛒', description: 'Gestion de boutique, produits et ventes.', state: 'démo', nextSteps: 'Ajouter des connecteurs de paiement sécurisés.' },
            { name: 'GLOIRE FINANCE', icon: '💳', description: 'Tableau de bord financier avec conformité locale.', state: 'indisponible', nextSteps: 'Implémenter des backends et validations de transactions.' },
            { name: 'GLOIRE ENGINEERING', icon: '🛠️', description: 'Aide à l\'ingénierie logicielle et au prototypage.', state: 'expérimental', nextSteps: 'Faire évoluer les assistants de code.' },
            { name: 'GLOIRE STUDIO', icon: '🎯', description: 'Préparation de visuels marketing et contenus visuels.', state: 'démo', nextSteps: 'Connecter des générateurs d\'images ou graphiques.' },
            { name: 'GLOIRE ASSISTANT', icon: '💬', description: 'Assistant conversationnel central.', state: 'fonctionnel', nextSteps: 'Connecter un backend IA plus avancé.' }
        ];
    }

    renderDashboard();
    renderModules();
    applySavedPreferences();
}

function init() {
    bindNavigation();
    bindSettingsControls();
    bindThemeToggle();
    bindModuleActions();
    registerModuleSearch();
    bindExportDelete();
    initAssistant();
    updateConnectionStatus();
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    loadModules();
    applySavedPreferences();
}

document.addEventListener('DOMContentLoaded', init);
