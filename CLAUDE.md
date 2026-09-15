# CLAUDE.md — Atelier « IA prise en main »

> **Référence normative du projet.** À lire en entier au début de chaque session de travail, par Claude ou par tout autre développeur.
>
> Pour ce dépôt, **ce fichier prévaut** sur tout autre fichier d'instructions, y compris un `CLAUDE.md` situé dans un dossier parent et décrivant un autre projet.
>
> Si une demande contredit une règle de ce fichier, **le signaler explicitement avant d'implémenter**. Ne jamais trancher en silence (voir section 5).

**Dernière mise à jour** : 2026-09-15

---

## Sommaire

1. [Contexte du projet](#1-contexte-du-projet)
2. [Règles non négociables](#2-règles-non-négociables)
3. [Structure attendue du projet](#3-structure-attendue-du-projet)
4. [Structure JSON de référence](#4-structure-json-de-référence)
5. [Checklist avant toute livraison](#5-checklist-avant-toute-livraison)
6. [Historique des décisions](#6-historique-des-décisions)

---

## 1. Contexte du projet

### 1.1 Public

- Stagiaires d'un **ESRP** (Établissement et service de réadaptation professionnelle).
- **Niveaux hétérogènes** en informatique : du grand débutant à la personne déjà à l'aise.
- **Certains stagiaires sont en situation de handicap.** Le type de handicap n'est pas présumé. L'application doit rester utilisable au clavier seul, avec un lecteur d'écran, avec un zoom important, et par une personne ayant des difficultés de lecture ou de concentration.

### 1.2 Format pédagogique

- **FALC** (Facile à lire et à comprendre) : phrases courtes, une idée par phrase, mots du quotidien, tout mot technique expliqué.
- **Analogies de la vie quotidienne en Île-de-France** : métro parisien, courrier postal, adresse postale, bibliothèque de quartier, feux de signalisation, etc.
- Découpage : **5 séances**, illustrées par **9 illustrations**.

> **Pour ce projet (voir D-009)** : le livret « IA : prise en main et usages » compte **4 séances**, précédées de « Avant de commencer » (QCM de positionnement) et suivies de « Mes besoins ». Il y a **8 illustrations**. Les analogies du livret viennent de la vie quotidienne : boulangerie, marché de quartier, colocation, annonce dans le RER, carte de fidélité. La description ci-dessus (5 séances, 9 illustrations) est celle du projet d'origine « Culture informatique et Web ».
>
> **Depuis D-013** : deux séances « Aller plus loin » (séance 5 : du prompt au contexte ; séance 6 : la boucle agentique) suivent « Mes besoins ». Elles ajoutent 10 schémas SVG (09 à 18), soit 18 illustrations au total. Leurs analogies : guichet de gare, cordonnier, correspondances en RER, dossier CAF, course confiée à un voisin. La couche formateur est dans `formateur/guide-seances-5-6.md`, hors de l'application.

### 1.3 Objectif technique

- Application web **interactive et statique**, hébergée sur **GitHub Pages**.
- **Aucun backend, aucune base de données, aucun compte utilisateur.**
- La progression est enregistrée dans le navigateur (`localStorage`). Un système d'export-import par fichier la complète.

### 1.4 Déroulé d'une séance

- La séance a lieu **en présentiel**.
- Les stagiaires avancent **en autonomie partielle** sur leur poste.
- Le formateur **circule entre les stagiaires**. Il n'est pas en permanence à côté de chacun.

Conséquences pour la conception :

- l'interface doit se comprendre **sans explication orale préalable** ;
- le formateur doit voir **d'un coup d'œil** où en est un stagiaire : séance et numéro d'exercice toujours visibles à l'écran ;
- **aucune situation de blocage sans issue** : chaque écran propose une action claire, et chaque message d'erreur dit quoi faire ;
- **aucun son n'est indispensable** : salle partagée, et stagiaires sourds ou malentendants possibles.

---

## 2. Règles non négociables

### 2.1 Verrouillage des corrections

**Règle** : la correction d'un exercice ne s'affiche **jamais** avant que le stagiaire ait **choisi une réponse puis cliqué sur « Valider »**.

Mise en œuvre attendue :

- Le bouton « Valider » reste inactif tant qu'aucune réponse n'est choisie.
- La bonne réponse et `explicationCorrection` **ne sont pas insérées dans la page avant la validation**. Elles ne doivent pas être seulement cachées visuellement, car un lecteur d'écran ou le mode lecture du navigateur pourrait les lire.
- **Aucun bouton** « Voir la correction », « Passer » ou raccourci ne contourne la validation.
- L'état « validé » est enregistré dans la progression. Après un rechargement de la page, un exercice non validé reste verrouillé.
- Ce verrouillage est géré **par le moteur générique**, jamais par chaque type d'exercice (voir 3.3). Ainsi, un nouveau type d'exercice ne peut pas l'oublier.

> ⚠️ **Ce n'est PAS un dispositif anti-triche fort.**
> Les fichiers JSON sont publics : le dépôt et le site GitHub Pages sont consultables par tous. Toute personne qui ouvre les outils de développement du navigateur peut lire les réponses ou modifier le `localStorage`.
> Ce verrouillage est un **garde-fou pédagogique contre la précipitation**. Il n'empêche pas une fraude volontaire.
> **Ne pas chercher à le durcir** (chiffrement, obfuscation, hachage des réponses, blocage du clic droit) sans une nouvelle décision consignée en section 6. Voir la décision D-002.

**Point tranché** : après avoir vu la correction, le stagiaire **ne peut pas** refaire l'exercice (décision du formateur, voir D-005). Le déroulé en deux temps « Valider ma réponse » puis « Voir la correction » est décrit en D-004.

### 2.2 Mécanisme anti-précipitation

**Règle** : chaque exercice peut imposer un **délai minimum** avant de pouvoir valider, grâce au champ `tempsMinimumSecondes`.

- Le délai démarre **à l'affichage de l'exercice**.
- Tant que le délai n'est pas écoulé, le bouton « Valider » reste inactif, même si une réponse est choisie.
- **Paramétrable exercice par exercice**, dans le JSON uniquement.
- Si le champ est absent, il n'y a **aucun délai** (valeur 0).
- Si la page est rechargée, le délai repart de zéro. Il n'est pas sauvegardé.
- Le délai **ne limite jamais le temps de réponse** : il n'existe aucune durée maximale et aucun passage automatique à l'exercice suivant.

Accessibilité du délai :

- Utiliser `aria-disabled="true"` plutôt que l'attribut `disabled`. Le bouton reste ainsi atteignable au clavier et sa raison d'être inactif peut être lue. Le clic doit alors être bloqué en JavaScript.
- Afficher un **message texte visible**, par exemple : « Prenez le temps de lire. Vous pourrez valider dans 20 secondes. »
- **Ne pas annoncer le compte à rebours seconde par seconde** au lecteur d'écran. Faire une seule annonce polie (`aria-live="polite"`) au moment où la validation devient possible.

> Limite à garder en tête : un délai minimum **freine** la précipitation, il ne **prouve** pas que le stagiaire a lu. C'est un outil d'incitation, pas une mesure de la qualité du travail.

### 2.3 Séparation stricte entre contenu et logique

**Règle** : **tout le contenu pédagogique est dans des fichiers JSON externes** (`content/`). Il n'est **jamais codé en dur** dans le HTML ou le JavaScript.

Cela concerne : les titres de séance, les consignes, les questions, les options, les bonnes réponses, les explications, les niveaux de difficulté, les délais, les chemins des images et leurs textes alternatifs.
Les textes de l'interface (libellés des boutons, messages, avertissement `localStorage`) sont eux aussi dans un JSON (`content/interface.json`), pour pouvoir être reformulés en FALC sans toucher au code.

**Raison métier** : le formateur soupçonne certains stagiaires de traiter le livret **trop vite ou trop superficiellement**. Il doit pouvoir **enrichir ou complexifier les séances après coup** (ajouter des exercices, durcir les délais, reformuler) **sans solliciter à nouveau un développeur**.

Conséquences :

- Ajouter un exercice d'un type existant = **modifier un fichier JSON, rien d'autre**.
- Seule la création d'un **nouveau type** d'exercice justifie une modification du JavaScript.
- Si un JSON est invalide ou incomplet, l'application affiche un **message clair**, sans écran blanc. Le message indique le fichier, l'exercice (`id`) et le champ en cause, pour que le formateur puisse corriger seul.
- Rappel pour les personnes qui éditent les JSON : **le format JSON n'accepte ni commentaires ni virgule après le dernier élément**. Le README doit le rappeler.

### 2.4 Absence de backend

**Règle** : aucun serveur applicatif, aucune API, aucune base de données, aucun service tiers de stockage ou de mesure d'audience.

- La progression est stockée dans le **`localStorage`** du navigateur.

> ⚠️ **Limite connue et acceptée** : la progression est **perdue** en cas de :
> - changement d'appareil ou de navigateur ;
> - nettoyage du cache ou des données de navigation ;
> - navigation privée ;
> - réinitialisation des postes à la déconnexion, selon la configuration informatique de l'ESRP (**à vérifier avec le service informatique**).
>
> **Seule parade : le système d'export-import.**

Export-import :

- **Export** : téléchargement d'un fichier `.json` qui contient la progression.
- **Import** : vérifier le format et la version du fichier **avant** d'écraser quoi que ce soit, puis demander confirmation au stagiaire.
- Le fichier exporté contient **uniquement** les données utiles à la progression : identifiants d'exercices, réponses, état validé. Aucune donnée sur la santé ou le handicap. Aucun nom obligatoire.

Messages dans l'interface :

- Un **avertissement sur cette limite reste visible en permanence**, pas seulement lors de la première visite. Exemple FALC : « Votre travail est gardé sur cet ordinateur seulement. Pour le garder, cliquez sur "Enregistrer mon travail dans un fichier". »
- Si le `localStorage` est indisponible (bloqué par le navigateur), l'application le détecte, prévient le stagiaire et reste utilisable, mais sans sauvegarde automatique.

**Point ouvert** : si plusieurs stagiaires utilisent le **même poste avec la même session**, ils partagent la même progression. Ce cas n'est pas traité à ce jour. Toute solution (profils locaux, pseudonyme) est une décision à valider par le formateur.

### 2.5 Accessibilité

**Référentiel** : **RGAA niveau AA**, aligné sur WCAG 2.1 AA (vérifier la version du RGAA en vigueur au moment de l'audit). Les exigences FALC de lisibilité s'y ajoutent.

| Domaine | Exigences |
|---|---|
| **Structure** | `<html lang="fr">`. Un seul `<h1>` par page, titres hiérarchisés sans saut de niveau. Zones `<header>`, `<main>`, `<nav>`, `<footer>`. Lien d'évitement « Aller au contenu ». Titre de page (`<title>`) qui change à chaque séance. |
| **Clavier** | Tout est utilisable au clavier seul. Ordre de tabulation logique. Focus **toujours visible** et bien contrasté. Aucun piège au clavier. |
| **Exercices** | Éléments de formulaire natifs : `<fieldset>` et `<legend>` pour la question, `<input type="radio">` et `<label>` pour chaque option. Pas de fausses cases à cocher en `<div>`. |
| **Retours** | Résultat et correction annoncés par une zone `aria-live="polite"`. Après validation, le focus va sur le titre de la correction. **L'information ne passe jamais par la couleur seule** : toujours un texte (« Bonne réponse », « Ce n'est pas la bonne réponse ») accompagné d'une icône. |
| **Visuel** | Contraste d'au moins **4,5:1** pour le texte et **3:1** pour les composants d'interface. Contenu lisible avec un zoom de 200 %, sans défilement horizontal à 320 px de large. Zones cliquables d'au moins **44 × 44 px** (recommandation). |
| **Images** | Chaque illustration a un texte alternatif stocké dans le JSON. Plusieurs illustrations contiennent du texte ou un schéma (affiche des règles, logigramme de dépannage) : **leur contenu doit aussi exister en texte dans la page**, par exemple sous forme de liste structurée. Images purement décoratives : `alt=""`. |
| **Mouvement et temps** | Aucune animation indispensable. Respecter `prefers-reduced-motion`. Aucune limite de temps maximale (voir 2.2). |
| **Lisibilité FALC** | Police sans empattement, taille de base d'au moins 16 px (préférer plus grand), interligne d'au moins 1,5. Texte aligné à gauche, jamais justifié. Pas de texte en italique ni en majuscules pour des phrases entières. Une consigne = une phrase. |
| **Liens** | Intitulés explicites (pas de « cliquez ici »). Toute ouverture d'une nouvelle fenêtre est signalée. |

**Tests minimum avant livraison** :

1. Parcours complet d'une séance **au clavier seul**.
2. Parcours avec le lecteur d'écran **NVDA** sous Windows.
3. **Zoom à 200 %** et fenêtre réduite à **320 px** de large.
4. Vérification des **contrastes** avec un outil dédié.

### 2.6 Contraintes techniques strictes

- **HTML, CSS et JavaScript vanilla uniquement.** Aucun framework, aucune bibliothèque, **aucun CDN** (un CDN est aussi une dépendance externe), aucune police chargée depuis un service tiers.
- **Aucune dépendance NPM.** Pas de `package.json`, pas de `node_modules`.
- **Aucun build step.** Les fichiers du dépôt sont exactement ceux que GitHub Pages sert.
- Les **modules ES natifs** (`<script type="module">`) sont autorisés, car ils ne demandent aucune compilation.
- **Code commenté en français.** Noms de fonctions et de variables en français, en camelCase, pour rester cohérent avec les champs JSON (`reponseCorrecte`, `tempsMinimumSecondes`).
- **Navigateurs cibles** : versions récentes de Firefox, Chrome et Edge. **À confirmer** selon les navigateurs installés sur les postes de l'ESRP.

Pièges techniques connus :

- **Chemins relatifs obligatoires.** Un site GitHub Pages de dépôt est servi dans un sous-dossier (`https://<compte>.github.io/<depot>/`). Un chemin absolu comme `/assets/...` y est cassé.
- **GitHub Pages respecte la casse des noms de fichiers, Windows non.** `Image.png` et `image.png` fonctionnent en local sous Windows mais pas en ligne. D'où la règle : noms de fichiers en minuscules.
- **Ouvrir `index.html` par double-clic ne fonctionne pas.** En `file://`, les navigateurs bloquent le chargement des JSON (`fetch`) et des modules ES. Pour tester en local, passer par un petit serveur, par exemple `python -m http.server 8000` puis `http://localhost:8000`, ou l'extension VS Code « Live Server ». Il s'agit d'outils de développement, pas de dépendances du projet.

---

## 3. Structure attendue du projet

### 3.1 Arborescence

```
culture-web/
├── index.html                  # Point d'entrée unique de l'application
├── .nojekyll                   # Désactive le traitement Jekyll de GitHub Pages (fichier vide)
├── README.md                   # Guide formateur et développeur : format JSON, ajout d'exercice, test local
├── CLAUDE.md                   # Ce fichier : référence normative du projet
│
├── css/
│   └── styles.css              # Styles accessibles (contrastes, focus, lisibilité FALC)
│
├── js/
│   ├── app.js                  # Démarrage : choix de la séance, navigation entre exercices
│   ├── chargeur-contenu.js     # Chargement des JSON et contrôle de leur structure
│   ├── moteur-exercices.js     # Moteur générique : afficher → attendre le délai → valider → corriger
│   ├── progression.js          # Sauvegarde localStorage, export et import de fichier
│   ├── blocs-lecon.js          # Affichage des parties « à lire » des étapes (voir D-007)
│   ├── outils.js               # Petites fonctions communes (création d'éléments, vérifications)
│   └── types/                  # Un fichier par type d'exercice
│       ├── registre.js         # Liste des types connus
│       ├── commun-qcm.js       # Code partagé par les deux types de QCM
│       ├── qcm-unique.js       # Type « qcm_unique »
│       ├── qcm-multiple.js     # Type « qcm_multiple » (voir D-006)
│       └── texte-libre.js      # Type « texte_libre » (voir D-006)
│
├── content/
│   ├── interface.json          # Textes de l'interface (boutons, messages, avertissement localStorage)
│   ├── seance-1.json
│   ├── seance-2.json
│   ├── seance-3.json
│   ├── seance-4.json
│   └── seance-5.json
│
└── assets/
    └── images/                 # Les 9 illustrations
        ├── 01-internet-web-navigateur-metro.png
        ├── 02-client-serveur-courrier.png
        ├── 03-anatomie-url-adresse-postale.png
        ├── 04-moteur-recherche-bibliotheque.png
        ├── 05-grille-credibilite-sources.png
        ├── 06-quatre-erreurs-courantes.png
        ├── 07-guide-depannage-logigramme.png
        ├── 08-dix-regles-securite.png
        └── 09-bilan-progression.png
```

> **Pour ce projet (voir D-009)** : le dossier `content/` contient `interface.json`, `avant-de-commencer.json`, `seance-1.json` à `seance-4.json` et `mes-besoins.json`. `assets/images/` contient 8 illustrations en JPEG (`01-ia-generative-plausible.jpg` à `08-recapitulatif-trois-idees.jpg`). Les fichiers JavaScript sont les mêmes. Arborescence complète et répartition des images : README, section 1.
>
> **Depuis D-013** : `content/` contient aussi `seance-5.json` et `seance-6.json` ; `assets/images/` contient aussi 10 schémas SVG (`09-boucle-agentique.svg` à `18-stable-ou-mouvant.svg`) ; le dossier `formateur/` contient le guide des séances 5 et 6.

### 3.2 Règles de nommage des fichiers

- **Minuscules, sans espace, sans accent**, mots séparés par des tirets (voir 2.6 sur la casse).
- Les illustrations d'origine ont des noms avec espaces et accents. Elles doivent être **renommées** en les intégrant, selon la liste ci-dessus.
- La répartition des 9 illustrations entre les 5 séances **n'est pas définie dans ce fichier**. Elle relève du contenu, donc des JSON.
- **Poids des images** : les 9 PNG d'origine pèsent environ 11 Mo au total. Les optimiser (compression) avant publication pour les connexions lentes.
- **Tout fichier du dépôt est public** dès qu'il est publié sur GitHub Pages. Vérifier les droits de diffusion des illustrations et de tout support source avant de les ajouter.

### 3.3 Contrat du moteur générique

Le moteur (`moteur-exercices.js`) gère **seul** :

- le délai anti-précipitation (2.2) ;
- le verrouillage de la correction (2.1) ;
- l'affichage de la correction et l'annonce accessible du résultat ;
- l'enregistrement de la progression.

Chaque type d'exercice (`js/types/*.js`) fournit **uniquement** ce qui lui est propre :

```js
// Contrat minimal d'un type d'exercice
export default {
  // Valeur du champ "type" dans le JSON
  type: 'qcm_unique',

  // Vérifie qu'un exercice de ce type est complet ; renvoie une liste de messages d'erreur (vide si tout va bien)
  verifierStructure(exercice) {},

  // Construit le HTML accessible de l'exercice dans le conteneur, SANS la correction
  afficher(exercice, conteneur) {},

  // Renvoie la réponse choisie par le stagiaire, ou null si aucune réponse n'est choisie
  lireReponse(conteneur) {},

  // Renvoie true si la réponse est correcte, false sinon
  estCorrecte(exercice, reponse) {}
};
```

Un type d'exercice **ne doit jamais** afficher la correction, gérer le délai ou écrire dans le `localStorage` lui-même.

> Contrat complété par D-006 : `restaurerReponse`, `decrireCorrection` (données mises en forme par le moteur), `estCorrecte` pouvant renvoyer `null` (non noté), erreurs renvoyées sous forme de codes. Le contrat à jour est documenté dans le README, section 13.

---

## 4. Structure JSON de référence

### 4.1 Fichier de séance

```json
{
  "version": 1,
  "id": "seance-1",
  "titre": "Séance 1",
  "exercices": []
}
```

- `version` : version du format de fichier. À augmenter uniquement en cas de changement incompatible, et à documenter dans le README et en section 6.
- `exercices` : liste ordonnée des exercices de la séance.

> **Remplacé par D-007** : une séance contient désormais `titre`, `objectifs` (facultatif) et une liste `etapes`. Chaque étape a `id`, `titre`, `blocs` et `exercices`. Le format de chaque exercice (4.2, 4.3) ne change pas. Format complet dans le README, sections 6 à 8.

### 4.2 Exercice de type `qcm_unique` (exemple complet)

```json
{
  "id": "s1-e01",
  "type": "qcm_unique",
  "question": "Vous voyez un petit cadenas à côté de l'adresse du site. Qu'est-ce que cela veut dire ?",
  "options": [
    { "id": "a", "texte": "Le site est honnête. Je peux lui faire confiance." },
    { "id": "b", "texte": "Les informations voyagent protégées entre mon ordinateur et le site." },
    { "id": "c", "texte": "Le site est gratuit." },
    { "id": "d", "texte": "Le site appartient à l'État." }
  ],
  "reponseCorrecte": "b",
  "explicationCorrection": "Le cadenas veut dire que la connexion est protégée. C'est comme une lettre dans une enveloppe fermée : pendant le trajet, personne ne peut la lire. Attention : le cadenas ne dit pas si le site est honnête. Un faux site peut aussi avoir un cadenas.",
  "difficulte": "moyen",
  "tempsMinimumSecondes": 20
}
```

> Cet exemple sert à illustrer le format. Ce n'est pas un contenu validé du livret.

### 4.3 Description des champs

| Champ | Type | Obligatoire | Rôle et règles |
|---|---|---|---|
| `id` | texte | **Oui** | Identifiant **unique dans tout le projet**, au format `s<séance>-e<numéro>` (ex. `s1-e01`). ⚠️ **Ne jamais modifier ni réutiliser un `id` publié** : la progression des stagiaires est enregistrée par `id`. |
| `type` | texte | **Oui** | Type d'exercice. Doit correspondre à un fichier de `js/types/`. Valeur ici : `qcm_unique`. |
| `question` | texte | **Oui** | Énoncé en FALC. Une seule question. |
| `options` | liste d'objets `{ id, texte }` | **Oui** | Au moins 2 options. Chaque `id` d'option est unique dans l'exercice. |
| `reponseCorrecte` | texte | **Oui** | `id` de l'option correcte. Doit exister dans `options`. |
| `explicationCorrection` | texte | **Oui** | Affichée **après validation seulement**, que la réponse soit juste ou fausse. En FALC, avec une analogie de la vie quotidienne si possible. |
| `difficulte` | texte | Optionnel, **recommandé** | `"facile"`, `"moyen"` ou `"difficile"`. L'usage exact (affichage, filtrage, ordre) reste à définir. Le champ est prévu dès maintenant pour permettre au formateur de complexifier les séances. |
| `tempsMinimumSecondes` | entier ≥ 0 | Optionnel, **recommandé** | Délai minimum avant validation (voir 2.2). Absent = 0 (aucun délai). |

> **Champs ajoutés pour ce projet** : `justification` (QCM), `sansNote` (`qcm_unique`) et `reponseModele` facultatif en `texte_libre` mode `modele` (D-010) ; `auChoix` et `ouvertureApres` au niveau de l'étape (D-011) ; élément `{ "fichier", "etiquette" }` dans la liste `seances` de `interface.json` (D-009). Format complet dans le README, sections 6 et 8.

### 4.4 Faire évoluer le format

- Tout nouveau champ ou nouveau type d'exercice doit être **documenté dans le README** dans la même livraison.
- Un nouveau type d'exercice doit **respecter le contrat du moteur** (3.3).
- Un changement incompatible avec les fichiers existants doit être consigné en section 6.

---

## 5. Checklist avant toute livraison

À vérifier **à chaque intervention**, sans exception. Une case non cochée = livraison bloquée, ou livrée en le signalant explicitement.

- [ ] **Le verrouillage de la correction fonctionne toujours.** Impossible de voir la correction sans avoir choisi une réponse et validé, y compris après un rechargement de la page.
- [ ] **Le délai anti-précipitation fonctionne toujours** : le bouton « Valider » reste inactif pendant `tempsMinimumSecondes`.
- [ ] **Le contenu est resté entièrement dans les fichiers JSON.** Aucun texte pédagogique ni texte d'interface n'a été ajouté dans le HTML ou le JavaScript.
- [ ] **Les nouveaux types d'exercices respectent le moteur générique existant** (contrat 3.3). Le verrouillage, le délai et la sauvegarde restent gérés par le moteur.
- [ ] **L'accessibilité est maintenue** : tests minimum de 2.5 refaits (clavier seul, NVDA, zoom 200 %, contrastes).
- [ ] **Le README est à jour** si la structure JSON a évolué.
- [ ] **Aucune dépendance externe n'a été introduite** : pas de bibliothèque, de CDN, de paquet NPM, de police distante ni d'étape de build.
- [ ] **Le message d'avertissement sur la limite du `localStorage` reste visible** dans l'interface.
- [ ] **Si une demande du formateur contredit une règle de ce fichier, elle a été signalée explicitement avant d'être implémentée**, sans trancher en silence. Si la règle change, la décision est consignée en section 6.

Vérifications techniques complémentaires :

- [ ] Tous les fichiers JSON sont **valides** et chargés sans erreur.
- [ ] Les `id` d'exercices publiés n'ont **pas été modifiés**.
- [ ] Test réalisé **via un serveur local**, pas en `file://`.
- [ ] Chemins **relatifs** et noms de fichiers **en minuscules**.
- [ ] L'export puis l'import d'une progression fonctionnent.

---

## 6. Historique des décisions

Une entrée par évolution majeure : règle ajoutée, modifiée ou supprimée, nouveau type d'exercice, changement de format JSON, exception accordée.
**Les entrées ne sont jamais supprimées.** Une décision remplacée passe au statut « Remplacée par D-xxx ».

### Modèle à recopier

```markdown
### D-XXX — Titre court de la décision

- **Date** : AAAA-MM-JJ
- **Statut** : Acceptée | Remplacée par D-xxx | Abandonnée
- **Demandée ou validée par** : (rôle : formateur, développeur…)
- **Contexte** : quel problème ou quelle demande a déclenché la décision.
- **Décision** : ce qui a été choisi.
- **Raison** : pourquoi ce choix plutôt qu'un autre.
- **Conséquences et limites acceptées** : ce que le choix implique, y compris ses inconvénients.
- **Sections du CLAUDE.md impactées** : (ex. 2.3, 4.3)
```

---

### D-001 — Contenu pédagogique dans des fichiers JSON externes

- **Date** : 2026-09-14 (date de consignation)
- **Statut** : Acceptée
- **Demandée ou validée par** : formateur et développeur
- **Contexte** : le formateur soupçonne certains stagiaires de traiter le livret trop vite ou trop superficiellement. Il veut pouvoir faire évoluer les séances après leur mise en ligne.
- **Décision** : tout le contenu pédagogique et les textes d'interface sont dans des fichiers JSON externes (`content/`). Le JavaScript contient uniquement la logique.
- **Raison** :
  - le formateur peut enrichir ou complexifier une séance **sans solliciter un développeur** ;
  - c'est cohérent avec l'**hébergement statique** : un fichier JSON se modifie et se publie sans build ni serveur ;
  - un format structuré permet un contrôle automatique et des messages d'erreur compréhensibles pour le formateur.
- **Conséquences et limites acceptées** :
  - le format JSON est strict (pas de commentaires, pas de virgule finale), d'où le besoin d'un README clair et de messages d'erreur précis ;
  - les réponses correctes sont lisibles publiquement dans les JSON (voir D-002) ;
  - les `id` d'exercices publiés deviennent figés.
- **Sections du CLAUDE.md impactées** : 2.3, 3, 4

### D-002 — Verrouillage de la correction volontairement non sur-sécurisé

- **Date** : 2026-09-14 (date de consignation)
- **Statut** : Acceptée
- **Demandée ou validée par** : formateur et développeur
- **Contexte** : il faut empêcher un stagiaire de consulter la correction avant d'avoir répondu, dans une application sans backend.
- **Décision** : le verrouillage est un **garde-fou pédagogique** (validation obligatoire et délai minimum), **pas un dispositif anti-triche**. Aucun chiffrement, obfuscation ou hachage des réponses.
- **Raison** :
  - **hébergement statique** : sans serveur, toute protection côté navigateur peut être contournée par une personne qui ouvre les outils de développement ; la sur-sécuriser ajouterait de la complexité sans vraie garantie ;
  - **public visé** : il s'agit de freiner la précipitation, pas de surveiller une fraude organisée ; la présence du formateur dans la salle complète le dispositif ;
  - **accessibilité** : certaines protections (blocage du clic droit ou du copier-coller, contenu brouillé) gênent les technologies d'assistance ;
  - **séparation contenu et logique** (D-001) : les réponses doivent rester lisibles et modifiables par le formateur dans les JSON.
- **Conséquences et limites acceptées** :
  - un stagiaire techniquement averti et motivé peut lire les réponses dans les JSON ;
  - une protection réelle demanderait un backend, contraire à la règle 2.4, et donc une nouvelle décision.
- **Sections du CLAUDE.md impactées** : 2.1, 2.2

### D-003 — Ouverture par double-clic sur index.html non prise en charge

- **Date** : 2026-09-14
- **Statut** : Acceptée (proposée par le développeur, sans objection du formateur ; à confirmer)
- **Demandée ou validée par** : développeur, suite à une demande du formateur
- **Contexte** : le formateur souhaitait que le site fonctionne en ouvrant simplement `index.html`. En `file://`, les navigateurs bloquent le chargement des JSON et des modules ES (règle 2.6).
- **Décision** : les JSON restent externes (règle 2.3). L'application fonctionne sur GitHub Pages ou avec un serveur local. En double-clic, un message d'explication s'affiche au bout de 3 secondes. Ce message de secours est écrit dans `index.html` : c'est la seule exception à « aucun texte d'interface dans le HTML », car il sert justement quand les JSON ne se chargent pas.
- **Raison** : l'autre solution (contenu dans des fichiers `.js`) aurait obligé le formateur à éditer du JavaScript, contrairement à D-001.
- **Conséquences et limites acceptées** : pas de test possible par simple double-clic ; le README explique comment tester en local.
- **Sections du CLAUDE.md impactées** : 2.3, 2.6

### D-004 — Validation en deux temps et message de délai sans chiffre

- **Date** : 2026-09-14
- **Statut** : Acceptée (proposée par le développeur, sans objection du formateur ; à confirmer)
- **Demandée ou validée par** : formateur (deux boutons) et développeur (mise en œuvre)
- **Contexte** : le formateur demande un bouton « Valider mes réponses », puis un bouton « Voir la correction » qui ne devient actif qu'après validation, et un message doux sans compte à rebours.
- **Décision** :
  - « Valider ma réponse » enregistre la réponse et bloque les champs ; le focus va sur le message « Votre réponse est enregistrée » ;
  - « Voir la correction » est visible dès le départ mais inactif (`aria-disabled`) ; la correction n'est construite qu'au clic, puis le focus va sur son titre ;
  - pendant le délai, message fixe « Prenez le temps de bien lire », sans nombre de secondes, en vouvoiement ; une seule annonce polie à la fin du délai.
- **Raison** : conforme à 2.1 (le bouton ne contourne pas la validation, la correction n'est pas dans la page avant) et à 2.2 ; évite toute pression liée au temps.
- **Conséquences et limites acceptées** : un clic de plus pour voir la correction.
- **Sections du CLAUDE.md impactées** : 2.1, 2.2, 2.5

### D-005 — Pas de nouvelle tentative après validation

- **Date** : 2026-09-14
- **Statut** : Acceptée
- **Demandée ou validée par** : formateur
- **Contexte** : point ouvert de la section 2.1 : le stagiaire peut-il refaire un exercice après avoir vu la correction ?
- **Décision** : non. Un exercice validé reste bloqué avec la réponse donnée, y compris après rechargement ou import. Aucun bouton « Recommencer » ni « Tout effacer ».
- **Raison** : refaire un exercice après avoir lu la bonne réponse n'a pas d'intérêt pédagogique.
- **Conséquences et limites acceptées** : pour repartir de zéro, il faut effacer les données du site dans le navigateur (manipulation du formateur).
- **Sections du CLAUDE.md impactées** : 2.1

### D-006 — Types qcm_multiple et texte_libre, extension du contrat des types

- **Date** : 2026-09-14
- **Statut** : Acceptée (notation tout-ou-rien du `qcm_multiple` validée par le formateur ; modes du `texte_libre` proposés par le développeur, à confirmer)
- **Demandée ou validée par** : formateur et développeur
- **Contexte** : le formateur demande trois types : `qcm_unique`, `qcm_multiple`, `texte_libre`.
- **Décision** :
  - `qcm_multiple` : cases à cocher ; juste seulement si toutes les bonnes options et aucune mauvaise sont cochées ; correction détaillée option par option ;
  - `texte_libre` : mode `modele` (par défaut, non noté, réponse modèle affichée) ou mode `comparaison` (liste `reponsesAcceptees`, sans tenir compte des majuscules, accents, espaces et ponctuation finale, avec `fautesAcceptees` fautes de frappe tolérées, 1 par défaut, sauf réponses de moins de 4 caractères) ;
  - contrat des types (3.3) complété : `restaurerReponse(conteneur, reponse)`, `decrireCorrection(exercice, reponse, textes)` qui renvoie des données affichées par le moteur, `estCorrecte` peut renvoyer `null` (non noté), `verifierStructure` renvoie des codes d'erreur traduits via `interface.json`, `afficher` reçoit les textes de son type.
- **Raison** : le guide demande d'accepter les fautes de frappe ; une comparaison stricte mettrait les stagiaires en échec sans raison. Le verrouillage, le délai et la sauvegarde restent dans le moteur.
- **Conséquences et limites acceptées** : `<input type="checkbox">`, `<input type="text">` et `<textarea>` s'ajoutent aux boutons radio de 2.5. La comparaison automatique reste approximative : réservée aux réponses courtes.
- **Sections du CLAUDE.md impactées** : 2.5, 3.3, 4.3

### D-007 — Format de séance organisé en étapes

- **Date** : 2026-09-14
- **Statut** : Acceptée (proposée par le développeur, sans objection du formateur ; à confirmer)
- **Demandée ou validée par** : développeur
- **Contexte** : l'application doit reprendre le déroulé du livret (étapes, textes, fiches-outils, illustrations) et pas seulement des exercices. Le format 4.1 ne prévoyait qu'une liste `exercices`.
- **Décision** :
  - une séance contient `etapes` ; chaque étape a `id`, `titre`, `blocs` (parties à lire : paragraphe, sous_titre, liste, definitions, encadre, illustration, tableau) et `exercices` (format 4.2 inchangé) ;
  - **un exercice = une question = un écran** (le formateur voit « Séance 2 › Étape 3 sur 5 › Exercice 4 sur 15 ») ; pas d'exercice à plusieurs questions ;
  - la liste des fichiers de séance est dans `content/interface.json` (`seances`) ;
  - fichiers JavaScript ajoutés à l'arborescence 3.1 : `blocs-lecon.js`, `outils.js`, `types/registre.js`, `types/commun-qcm.js`, `types/qcm-multiple.js`, `types/texte-libre.js`.
- **Raison** : fidélité au découpage du livret ; un exercice par écran est plus lisible (FALC) et permet un délai qui démarre vraiment à l'affichage.
- **Conséquences et limites acceptées** : changement du format 4.1 fait avant toute publication, donc `version` reste à 1.
- **Sections du CLAUDE.md impactées** : 3.1, 4.1

### D-008 — Grille de bilan « Moi et le web » non enregistrée dans l'application

- **Date** : 2026-09-14
- **Statut** : Acceptée (proposée par le développeur, sans objection du formateur ; à confirmer)
- **Demandée ou validée par** : développeur
- **Contexte** : la grille de bilan du livret recueille des besoins d'adaptation (police plus grande, aide pour la souris, rassurance…), proches de données de santé ou de handicap.
- **Décision** : la séance 5 présente la grille, mais elle se remplit sur papier avec le formateur. Aucune réponse n'est enregistrée ni exportée. Plus généralement, aucun exercice `texte_libre` ne pose de question personnelle.
- **Raison** : règle 2.4 (aucune donnée de santé ou de handicap dans le fichier exporté) ; le livret prévoit la transmission à l'équipe avec consentement, sur papier.
- **Conséquences et limites acceptées** : pas de version numérique du bilan.
- **Sections du CLAUDE.md impactées** : 2.4

### D-009 — Adaptation du projet au livret « IA : prise en main et usages »

- **Date** : 2026-09-14
- **Statut** : Acceptée (proposée par le développeur ; à confirmer par le formateur)
- **Demandée ou validée par** : formateur (demande), développeur (mise en œuvre)
- **Contexte** : ce CLAUDE.md et le moteur viennent du projet « Culture informatique et Web ». La demande initiale reprenait sa description (5 séances, 9 illustrations). Le formateur a précisé que le livret porte sur l'IA. Le livret stagiaire (`Livret_Stagiaire_Atelier_IA.pdf`) compte 4 séances, précédées d'un QCM de positionnement et suivies de la fiche « Mes besoins ». 8 illustrations ont été fournies, pas 9.
- **Décision** :
  - reprise du moteur de culture-web, adapté ;
  - dans `content/interface.json`, un élément de la liste `seances` peut être un objet `{ "fichier", "etiquette" }` : partie non numérotée (« Avant de commencer », « Mes besoins ») ; les exercices du QCM de positionnement ont des `id` en `s0-eNN` ;
  - les 8 illustrations sont renommées (minuscules, sans accent) et converties en JPEG (1200 px de large, 1024 px pour les carrées ; environ 840 Ko au total au lieu de 9 Mo). Les fichiers d'origine 4 à 7 ne portaient pas le nom de leur contenu : la correspondance vérifiée est dans le README, section 12 ;
  - clé `localStorage` et format d'export propres à cet atelier : `atelier-ia-progression` ;
  - la page « Corrigés » du livret n'est pas reproduite telle quelle : chaque corrigé devient l'`explicationCorrection` de son exercice (règle 2.1).
- **Raison** : fidélité au livret stagiaire. Plusieurs ateliers publiés sur le même compte GitHub Pages partagent la même origine (`https://<compte>.github.io`), donc le même `localStorage`, avec des `id` identiques (`s1-e01`) : une clé commune mélangerait les travaux.
- **Conséquences et limites acceptées** :
  - les sections 1.2 (5 séances, 9 illustrations, analogies d'Île-de-France), 3.1 et 3.2 (arborescence et noms d'images) décrivent culture-web : pour ce projet, voir le README, section 1 ;
  - un fichier exporté depuis culture-web est refusé à l'import ;
  - la demande « fonctionner en ouvrant simplement index.html » a été renouvelée : D-003 reste appliquée, et le conflit a été signalé au formateur.
- **Sections du CLAUDE.md impactées** : 1.2, 2.4, 3.1, 3.2

### D-010 — Case « Pourquoi ? », QCM sans note, exemple de réponse facultatif

- **Date** : 2026-09-14
- **Statut** : Acceptée (proposée par le développeur ; à confirmer par le formateur)
- **Demandée ou validée par** : développeur
- **Contexte** : les deux exercices de tri du livret demandent une justification brève. Le corrigé du tri « IA ou moteur de recherche » précise que plusieurs réponses se justifient. Plusieurs zones d'écriture du livret n'ont pas de réponse modèle (impressions, métier visé, relances).
- **Décision** :
  - champ facultatif `justification` (`{ "libelle", "obligatoire" }`) pour `qcm_unique` et `qcm_multiple` : une zone de texte sous les choix ; la réponse enregistrée devient `{ choix, justification }` ; explication facultative par défaut ;
  - champ facultatif `sansNote: true` pour `qcm_unique` : `estCorrecte` renvoie `null` et la correction affiche « Le choix le plus naturel » ;
  - `texte_libre` en mode `modele` : `reponseModele` devient facultatif, mais `reponseModele` ou `explicationCorrection` est obligatoire.
- **Raison** : rester fidèle au livret sans créer de nouveau type. L'explication est facultative par défaut pour limiter le volume de saisie (fatigue, handicap moteur) ; le formateur peut la rendre obligatoire dans le JSON.
- **Conséquences et limites acceptées** : `progression.js` accepte une troisième forme de réponse. Le contrat des types (3.3) ne change pas : `lireReponse` lit l'obligation dans un attribut `data-obligatoire` du champ.
- **Sections du CLAUDE.md impactées** : 3.3, 4.3

### D-011 — Étapes « au choix » et étapes fermées

- **Date** : 2026-09-14
- **Statut** : Acceptée (proposée par le développeur ; à confirmer par le formateur)
- **Demandée ou validée par** : développeur
- **Contexte** : la Séance 2 propose 3 parcours au choix (A, B, C). Certaines parties du livret donnent les réponses d'un exercice (affiche « IA ou moteur », tableau des « 3 jamais », affiche récapitulative), alors que le menu permet d'aller partout.
- **Décision** :
  - champ d'étape `auChoix: true` : ses exercices sont affichés « (au choix) » et ne comptent pas dans le total obligatoire ;
  - champ d'étape `ouvertureApres: [ids]` : tant que ces exercices ne sont pas validés, le contenu de l'étape (blocs et exercices) n'est pas inséré dans la page ; un message liste les exercices à faire, avec un lien vers chacun ;
  - un exercice cité qui appartient à une partie indisponible (fichier en erreur) est ignoré, pour ne jamais bloquer sans issue.
- **Raison** : la règle 2.1 s'applique aussi aux contenus qui valent correction. En FALC, un compteur « 0 sur 13 » sur des parcours au choix ressemblerait à un retard.
- **Conséquences et limites acceptées** :
  - garde-fou pédagogique, comme 2.1 (JSON publics, D-002) ;
  - faire « au moins un parcours » n'est pas imposé ;
  - le glossaire de la Séance 1 contient des réponses du QCM de positionnement et reste accessible : fermer une séance entière irait contre la navigation libre demandée.
- **Sections du CLAUDE.md impactées** : 2.1, 4.1

### D-012 — Fiche « Mes besoins » non enregistrée

- **Date** : 2026-09-14
- **Statut** : Acceptée (proposée par le développeur ; à confirmer par le formateur)
- **Demandée ou validée par** : développeur
- **Contexte** : la fiche « Mes besoins » recueille des besoins d'adaptation (« de l'aide pour écrire », « un écran ou une police plus adaptés »), proches de données de santé ou de handicap.
- **Décision** : application de D-008. La fiche est présentée en lecture seule et se remplit sur papier ou à l'oral avec le formateur. Aucune réponse n'est enregistrée ni exportée.
- **Raison** : règle 2.4.
- **Conséquences et limites acceptées** :
  - pas de version numérique remplissable, alors que la fiche formateur la cite comme adaptation possible : à rediscuter si besoin ;
  - la phrase du livret « Vos réponses sont confidentielles » (après le QCM de positionnement) est retirée : l'application ne peut pas la garantir (poste partagé, fichier d'export).
- **Sections du CLAUDE.md impactées** : 2.4

### D-013 — Séances 5 et 6 « Aller plus loin » : contexte et boucle agentique

- **Date** : 2026-09-15
- **Statut** : Acceptée (proposée par le développeur ; paramètres et placement à confirmer par le formateur)
- **Demandée ou validée par** : formateur (demande d'intégration de deux modules), développeur (mise en œuvre)
- **Contexte** : le formateur a fourni un cahier des charges rédigé ailleurs : deux modules (ingénierie de la demande et du contexte ; boucle agentique), avec une couche stagiaire FALC, des encadrés formateur, une activité sur une trace « pensée, action, observation », un ancrage métier, une mise à jour 2026 des sources et 10 prompts d'images. Ses 5 paramètres (durée, métiers, outil disponible, format, acquis) n'étaient pas remplis.
- **Décision** :
  - deux fichiers `content/seance-5.json` (8 étapes, 12 exercices) et `content/seance-6.json` (13 étapes, 21 exercices dont 12 au choix), placés **après « Mes besoins »** dans `interface.json` : le déroulé de la journée du livret ne change pas ;
  - aucun nouveau type d'exercice, aucun nouveau champ, aucune modification du JavaScript ;
  - paramètres par défaut : métiers support, test logiciel, développement, administration réseau ; **pas d'outil agentique** (trace écrite construite) ; séance 5 en 1 h 30 à 1 h 45, séance 6 en 2 h 15 environ ;
  - chaque affirmation technique est étiquetée dans la page : **Mesuré**, **Observé** ou **Supposé**, avec sa date ; aucun chiffre sans source ;
  - la **couche formateur** (encadrés, déroulés minutés, corrigés, trace imprimable, sources, « Ce qui risque d'être faux dans 6 mois ») est dans `formateur/guide-seances-5-6.md`, **hors de l'application** ;
  - 10 schémas SVG (`09` à `18`), dessinés directement au lieu de prompts pour un générateur d'images, avec transcription textuelle dans la page ; palette bleu, orange, gris ; information jamais portée par la couleur seule.
- **Raison** :
  - les encadrés formateur contiennent des réponses : dans l'application, ils seraient lisibles avant validation (règle 2.1) ;
  - un SVG garde un texte exact en français, pèse peu et reste identique à sa transcription (règle 2.5) ;
  - l'exigence d'actualité du cahier des charges et le public (reconversion) imposent de ne présenter ni extrapolation comme un fait, ni promesse d'emploi.
- **Conséquences et limites acceptées** :
  - l'étape « Fin du livret » est suivie du bouton « Aller à la partie suivante » vers la séance 5 ;
  - les informations des séances 5 et 6 datent du 14 septembre 2026 et vieilliront vite (pied de page, étapes 1 et 13, section 8 du guide) ;
  - **le guide formateur est publié dans le dépôt, donc public**, comme les JSON (D-002) : choix du formateur le 2026-09-15 ;
  - deux phrases des séances 2 (corrigé s2-e06, étape 2) sont en tension avec la séance 5 ; elles n'ont pas été modifiées (à trancher) ;
  - plusieurs affirmations du cahier des charges ont été nuancées après vérification des sources (liste dans le guide, section 10) ;
  - aucun essai avec des stagiaires ; tests manuels d'accessibilité à refaire pour ces séances.
- **Sections du CLAUDE.md impactées** : 1.2, 3.1

### D-014 — Séance 1 : demandes à tester après la manipulation libre

- **Date** : 2026-09-15
- **Statut** : Acceptée (placement « en deux temps » choisi par le formateur ; contenu à essayer avec des stagiaires)
- **Demandée ou validée par** : formateur
- **Contexte** : la manipulation libre de la séance 1 doit faire constater que l'IA produit du texte plausible, se trompe avec assurance et n'est pas un moteur de recherche. Un stagiaire peut n'obtenir que des réponses justes. La fiche formateur fait pourtant de la manipulation « à l'aveugle » le cœur de l'observation (« que demande spontanément le stagiaire ? »).
- **Décision** :
  - nouvelle étape `s1-etape-demandes` (« Des demandes à tester »), placée avant « Manipulation libre : vos notes » et utilisée **après** le temps libre, au signal du formateur : 7 demandes réparties sur les 3 idées, avec une colonne « Comment vérifier » ;
  - nouvel exercice `s1-e03` (texte libre, non noté) : une réponse fausse, inventée ou changeante, et comment on l'a vue ;
  - note formateur `formateur/guide-seance-1-demandes-a-tester.md` : déroulé, réponses de référence, test préalable obligatoire, capture de secours réelle et datée.
- **Raison** : garder l'observation spontanée prévue par la fiche, tout en augmentant les chances de rencontrer une erreur. Aucune demande ne garantit une erreur, d'où la capture de secours (déjà prévue par la fiche pour la séance 3).
- **Conséquences et limites acceptées** :
  - contenu ajouté au livret : l'étape « vos notes » passe de l'étape 4 à l'étape 5 ;
  - les demandes vieilliront avec les outils : à retester avant chaque atelier ;
  - le titre du roman inventé n'a pas été vérifié dans un catalogue : à contrôler par le formateur ;
  - le menu permet d'ouvrir la liste avant la fin du temps libre ;
  - tension existante, non modifiée : l'étape 1 montre les 3 formules avant la manipulation (ordre du livret).
- **Sections du CLAUDE.md impactées** : aucune règle ; contenu de la séance 1
