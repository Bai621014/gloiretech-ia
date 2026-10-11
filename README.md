# GloireTech-IA

GloireTech-IA est une plateforme d’intelligence artificielle modulaire, mobile-first et axée sur l’accessibilité, pensée pour un usage dans des contextes où la performance, la sobriété et l’autonomie numérique comptent.

## Mission

Rendre l’intelligence artificielle, les outils numériques, le commerce électronique et l’innovation accesibles aux Africains et au reste du monde.

## Prototype livré

Cette première version est une application web progressive (PWA) statique, légère et installable depuis le navigateur.

Elle inclut :
- une page d’accueil claire,
- un tableau de bord mobile-friendly,
- des cartes de modules avec états explicites,
- un assistant de démonstration brut,
- le support du thème clair/sombre,
- la recherche de modules,
- la copie dans le presse-papiers,
- la gestion locale des préférences,
- un prototype AURÉLIS minimal,
- un service worker pour les ressources statiques,
- un manifest PWA.

## Fichiers créés

- `index.html` — structure principale de l’application et navigation.
- `styles.css` — style responsive, accessibilité et thèmes.
- `app.js` — logique d’orchestration, paramètres, recherche, assistant démonstration.
- `manifest.webmanifest` — description PWA.
- `service-worker.js` — cache offline et mise à jour de ressources statiques.
- `README.md` — documentation d’usage et de déploiement.
- `config/modules.json` — catalogue des modules et leurs états.
- `modules/*.js` — modules de première version.
- `utils/*.js` — sécurité, paiement (mode démo) et abstraction d’IA.
- `assets/icons/*.svg` — icônes vectorielles de base.

## Ce qui est réellement fonctionnel

- Navigation entre les vues : tableau de bord, modules, assistant, paramètres.
- Recherche de modules.
- Changement de thème clair/sombre.
- Sauvegarde locale des préférences (localStorage, sans secret).
- Copie dans le presse-papiers avec repli.
- Assistant de démonstration sans API externe.
- Prototype AURÉLIS avec commandes simples.
- Horodatage d’état de connexion réseau.
- Détection honnête des modules expérimentaux, démo ou indisponibles.

## Ce qui reste à construire

- Backend IA connecté à un fournisseur de modèle officiel.
- Authentification réelle pour les comptes utilisateur.
- Stockage sécurisé des données utilisateur si nécessaire.
- Paiements réels et APIs officielles de Mobile Money, Airtel, Moov et cartes.
- Génération d’images ou textes via services externes confirmés.
- Commerce complet avec inventaire, transactions et remboursements.
- Langage AURÉLIS complet avec analyseur plus robuste.

## Tests et vérification

Le conteneur d’exécution de cette session n’inclut pas de navigateur ni d’outil de test front-end complet. Aucun test automatisé de navigateur n’a donc été exécuté dans cet environnement.

Par conséquent, les vérifications suivantes doivent être faites manuellement sur Android ou dans un navigateur moderne :

1. Ouvrir le fichier `index.html` ou le serveur local.
2. Vérifier la navigation entre les vues.
3. Tester la recherche d’un module.
4. Vérifier le changement de thème.
5. Vérifier l’interface de l’assistant et la commande `AURÉLIS: help`.
6. Vérifier le comportement hors ligne après activation du service worker.
7. Vérifier qu’aucune clé secrète n’est présente.

## Test manuel recommandé sur Android

1. Ouvrir le navigateur du téléphone.
2. Charger l’application locale, par exemple via un serveur local sur votre PC :
   - `python3 -m http.server 8000`
3. Aller sur `http://<adresse-ip>:8000` depuis le téléphone.
4. Vérifier la page sur un écran de petite taille.
5. Naviguer dans les modules, tester les boutons et le changement de thème.
6. Vérifier la présence du message de démonstration et du service worker.

## GitHub Pages

Pour publier sur GitHub Pages :

1. Pousser ce dépôt sur GitHub.
2. Dans le dépôt, ouvrir : `Settings` → `Pages`.
3. Sélectionner la branche `main` et le dossier racine `/`.
4. Enregistrer.
5. Attendre la publication.
6. L’URL publique ressemble à :
   `https://<votre-utilisateur>.github.io/gloiretech-ia/`

## Déploiement et coûts

- Cette version est compatible avec le déploiement statique gratuit sur GitHub Pages.
- Les fonctions réelles d’IA, de paiement, d’authentification ou de commerce nécessiteront probablement :
  - un backend sécurisé,
  - des API officielles,
  - des clés côté serveur en variables d’environnement,
  - des services hébergés ou des frais de plateforme.

## Limites du prototype

- Les modules ne sont pas encore connectés à des APIs réelles.
- L’assistant est un démonstrateur honnête, pas une intelligence artificielle autonome.
- Les paiements ne sont pas réels et ne doivent pas être présentés comme tels.
- Les données utilisateur restent locales et limitées.

## Sécurité essentielle

- Aucun secret, mot de passe ni clé API n’a été ajouté dans le dépôt public.
- Le code évite les injections HTML explicites et les scripts dangereux.
- Les composants sensibles sont identifiés comme expérimentaux ou démonstratifs.

## Licence

Le dépôt est fourni à des fins de prototypage et d’expérimentation. Si vous l’utilisez en production, ajoutez une licence adaptée à votre besoin et vérifiez les droits liés aux services externes.

## Prochaine étape recommandée

Créer un backend léger (par exemple FastAPI ou Node) pour sécuriser l’authentification, les variables d’environnement, les modèles IA à l’avenir, et les intégrations de paiement vérifiées côté serveur.
