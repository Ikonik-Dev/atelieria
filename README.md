# Atelier « IA : prise en main et usages »

Application web interactive pour les stagiaires d'un ESRP. Elle reprend le **livret du stagiaire** « Atelier IA — Prise en main et usages » : un QCM de positionnement, 4 séances et la fiche « Mes besoins », en FALC (Facile à lire et à comprendre).

Deux séances pour **aller plus loin** s'ajoutent après le livret : **Séance 5 — du prompt au contexte** et **Séance 6 — la boucle agentique**. Elles ne viennent pas du livret : elles ont été rédigées pour l'application. Leur guide pour le formateur est dans [formateur/guide-seances-5-6.md](formateur/guide-seances-5-6.md).

- **Aucun serveur, aucun compte, aucune base de données.** Le site est statique et peut être hébergé sur GitHub Pages.
- **Tout le contenu est dans des fichiers JSON** (dossier `content/`). Vous pouvez ajouter ou modifier des exercices **sans toucher au code**.
- Le travail du stagiaire reste **dans son navigateur**. Rien n'est envoyé sur Internet.

Pour les règles détaillées du projet et l'historique des décisions, voir [CLAUDE.md](CLAUDE.md).

---

## Sommaire

1. [Arborescence du projet](#1-arborescence-du-projet)
2. [Tester sur son ordinateur](#2-tester-sur-son-ordinateur)
3. [Publier sur GitHub Pages](#3-publier-sur-github-pages)
4. [Comment marchent les exercices](#4-comment-marchent-les-exercices)
5. [Ajouter ou modifier du contenu](#5-ajouter-ou-modifier-du-contenu)
6. [Format JSON : les parties et leurs étapes](#6-format-json--les-parties-et-leurs-étapes)
7. [Les blocs « à lire »](#7-les-blocs--à-lire-)
8. [Les 3 types d'exercices](#8-les-3-types-dexercices)
9. [Les textes de l'interface](#9-les-textes-de-linterface)
10. [Sauvegarde, export et import](#10-sauvegarde-export-et-import)
11. [Limites connues](#11-limites-connues)
12. [Notes sur le contenu du livret](#12-notes-sur-le-contenu-du-livret)
13. [Pour les développeurs : créer un nouveau type d'exercice](#13-pour-les-développeurs--créer-un-nouveau-type-dexercice)

---

## 1. Arborescence du projet

```
IA_prise_en_main/
├── index.html                  Page unique de l'application
├── .nojekyll                   Fichier vide : désactive un traitement automatique de GitHub Pages
├── .gitignore                  Fichiers à ne jamais publier (images et PDF d'origine, travaux exportés)
├── .gitattributes              Réglages Git (fins de ligne, fichiers binaires)
├── README.md                   Ce guide
├── CLAUDE.md                   Règles du projet et historique des décisions
│
├── css/
│   └── styles.css              Mise en forme accessible (contrastes, focus, grande police)
│
├── js/
│   ├── app.js                  Démarrage, menu, passage d'un écran à l'autre, étapes fermées
│   ├── chargeur-contenu.js     Chargement des JSON et contrôle de leur contenu
│   ├── blocs-lecon.js          Affichage des parties « à lire » (paragraphes, images, tableaux…)
│   ├── moteur-exercices.js     Moteur commun : délai, validation, verrouillage, correction
│   ├── progression.js          Sauvegarde dans le navigateur, export et import de fichier
│   ├── outils.js               Petites fonctions utiles partout
│   └── types/                  Un fichier par type d'exercice
│       ├── registre.js         Liste des types connus
│       ├── commun-qcm.js       Code partagé par les deux types de QCM (dont la case « Pourquoi ? »)
│       ├── qcm-unique.js       Type « qcm_unique »
│       ├── qcm-multiple.js     Type « qcm_multiple »
│       └── texte-libre.js      Type « texte_libre »
│
├── content/
│   ├── interface.json          Textes des boutons et des messages, liste et ordre des parties
│   ├── avant-de-commencer.json Comment utiliser le livret, QCM de positionnement
│   ├── seance-1.json           Séance 1 : Première rencontre avec une IA
│   ├── seance-2.json           Séance 2 : La méthode des 4 questions (parcours A, B, C)
│   ├── seance-3.json           Séance 3 : Vérifier : l'IA se trompe
│   ├── seance-4.json           Séance 4 : Usages responsables
│   ├── mes-besoins.json        Fiche « Mes besoins » (lecture seule) et fin du livret
│   ├── seance-5.json           Séance 5 : Aller plus loin : du prompt au contexte
│   └── seance-6.json           Séance 6 : Aller plus loin : la boucle agentique (parcours A, B, C)
│
├── formateur/
│   └── guide-seances-5-6.md    Guide du formateur des séances 5 et 6 (hors de l'application)
│
└── assets/
    └── images/                 18 illustrations : 8 JPEG du livret, 10 schémas SVG (séances 5 et 6)
```

Les fichiers d'origine placés à la racine du dossier (8 PNG, livret du stagiaire et fiche formateur en PDF) **ne sont pas utilisés** par l'application et **ne sont pas publiés** (voir `.gitignore`).

### Le contenu en chiffres

| Partie | Étapes | Exercices | Dont « au choix » |
|---|---|---|---|
| Avant de commencer | 3 | 10 | 0 |
| Séance 1 | 4 | 2 | 0 |
| Séance 2 | 7 | 13 | 13 (parcours A, B, C) |
| Séance 3 | 6 | 18 | 0 |
| Séance 4 | 3 | 9 | 0 |
| Mes besoins | 3 | 0 | 0 |
| Séance 5 | 8 | 12 | 0 |
| Séance 6 | 13 | 21 | 12 (parcours A, B, C) |
| **Total** | **47** | **85** | **25** |

### Répartition des illustrations

| Fichier | Où | Remarque |
|---|---|---|
| `01-ia-generative-plausible.jpg` | Séance 1, étape 1 | |
| `02-analogie-boulangerie.jpg` | Séance 1, étape 1 | |
| `03-quatre-questions.jpg` | Séance 2, étape 1 | |
| `04-iteration-conversation.jpg` | Séance 2, étape 3 | |
| `05-trois-parcours.jpg` | Séance 2, étape 4 | |
| `06-signaux-vigilance.jpg` | Séance 3, étape 2 | |
| `07-ia-ou-moteur-balance.jpg` | Séance 3, étape 4 | Étape fermée jusqu'au tri « IA ou moteur » (l'image donne des réponses) |
| `08-recapitulatif-trois-idees.jpg` | Mes besoins, étape 2 | Étape fermée jusqu'au même tri (même raison) |
| `09-boucle-agentique.svg` | Séance 6, étape 3 | Schéma SVG |
| `10-echange-simple-ou-boucle.svg` | Séance 6, étape 3 | Schéma SVG |
| `11-propagation-erreur.svg` | Séance 6, étape 5 | Schéma SVG |
| `12-pensee-action-observation.svg` | Séance 6, étape 7 | Exemple différent de la trace de l'activité, pour ne pas donner la réponse |
| `13-permissions-agent.svg` | Séance 6, étape 4 | Schéma SVG |
| `14-points-de-controle.svg` | Séance 6, étape 11 | Schéma SVG |
| `15-check-list-verification.svg` | Séance 6, étape 11 | Schéma SVG |
| `16-du-prompt-au-contexte.svg` | Séance 5, étape 6 | Schéma SVG |
| `17-choisir-sa-technique.svg` | Séance 5, étape 7 | Schéma SVG |
| `18-stable-ou-mouvant.svg` | Séance 6, étape 13 | Porte la date des informations (14 septembre 2026) |

Les schémas SVG `09` à `18` utilisent 3 couleurs (bleu, orange, gris). Aucune information ne passe par la couleur seule : coches, croix, pointillés et mots. Leur texte est aussi écrit dans la page (champ `transcription`).

---

## 2. Tester sur son ordinateur

⚠️ **Ouvrir `index.html` par double-clic ne fonctionne pas.** Quand la page est ouverte comme un simple fichier (`file://`), les navigateurs bloquent la lecture des fichiers JSON et des modules JavaScript. Dans ce cas, l'application affiche un message d'explication au bout de quelques secondes. Ce choix est expliqué dans CLAUDE.md (décision D-003) : la seule façon de contourner ce blocage serait de mettre le contenu dans des fichiers JavaScript, que le formateur devrait alors modifier.

Il faut passer par un **petit serveur local**. Deux solutions, au choix.

**Solution A — avec Python** (souvent déjà installé) :

1. Ouvrir un terminal dans le dossier du projet (`IA_prise_en_main`).
2. Taper : `python -m http.server 8000`
3. Ouvrir dans le navigateur : `http://localhost:8000`
4. Pour arrêter : touches `Ctrl + C` dans le terminal.

**Solution B — avec VS Code** : installer l'extension « Live Server », puis clic droit sur `index.html` → « Open with Live Server ».

Ces outils servent seulement à tester. Ce ne sont pas des dépendances du projet.

Après avoir modifié un fichier JSON : **rechargez la page** (touche F5).

---

## 3. Publier sur GitHub Pages

### Envoyer les fichiers

**Avec Git** (recommandé : le fichier `.gitignore` écarte automatiquement les fichiers à ne pas publier). Dans un terminal ouvert dans le dossier du projet :

```
git init
git add .
git commit -m "Atelier IA : première version"
git branch -M main
git remote add origin https://github.com/<votre-compte>/atelier-ia.git
git push -u origin main
```

Créez d'abord le dépôt vide `atelier-ia` sur GitHub (bouton **New repository**).

**Sans Git**, avec le bouton « Add file » → « Upload files » de GitHub : ⚠️ le `.gitignore` **ne s'applique pas**. N'envoyez pas les 8 PNG ni les 2 PDF de la racine. Envoyez seulement : `index.html`, `.nojekyll`, `README.md`, `CLAUDE.md` et les dossiers `css`, `js`, `content`, `assets`.

### Activer le site

1. Sur GitHub : **Settings** → **Pages**.
2. Dans « Build and deployment », choisir **Deploy from a branch**, branche `main`, dossier `/ (root)`. Cliquer sur **Save**.
3. Après une ou deux minutes, le site est en ligne à l'adresse `https://<votre-compte>.github.io/atelier-ia/`.

Pour mettre à jour le contenu : modifiez le fichier JSON sur GitHub (icône crayon), puis « Commit changes ». Le site se met à jour tout seul en une à deux minutes.

### À savoir avant de publier

- **Tout ce qui est dans le dépôt devient public**, y compris les bonnes réponses dans les JSON. Voir [Limites connues](#11-limites-connues).
- **Plusieurs ateliers sur le même compte GitHub** (par exemple celui-ci et « Culture informatique et Web ») partagent la même adresse d'origine, donc la même zone de sauvegarde du navigateur. Cet atelier utilise son propre nom de sauvegarde (`atelier-ia-progression`) : les travaux ne se mélangent pas. En revanche, « Effacer les données du site » dans le navigateur efface le travail **des deux** ateliers.
- Les illustrations ont été **générées par une intelligence artificielle**. Le pied de page de l'application le signale. Les 10 schémas des séances 5 et 6 ont été dessinés en SVG par Claude, une IA. Voir la [section 12](#12-notes-sur-le-contenu-du-livret).
- GitHub Pages **respecte les majuscules** dans les noms de fichiers, Windows non. Écrivez toujours les noms de fichiers en minuscules, sans espace ni accent.
- Utilisez toujours des **chemins relatifs** (`assets/images/…`), jamais `/assets/images/…`.

---

## 4. Comment marchent les exercices

### Le déroulé, identique pour chaque exercice

1. L'exercice s'affiche. Le bouton **« Valider ma réponse »** est inactif.
2. Si l'exercice a un délai (`tempsMinimumSecondes`), un message doux s'affiche : « Prenez le temps de bien lire. » **Il n'y a pas de compte à rebours.** À la fin du délai, un lecteur d'écran annonce une seule fois : « Vous pouvez maintenant valider votre réponse. »
3. Le stagiaire répond. Quand le délai est passé **et** qu'une réponse est donnée, « Valider ma réponse » devient actif. Pour un QCM court sans délai, il suffit de cocher une réponse.
4. Au clic sur « Valider ma réponse », **la réponse est enregistrée dans le navigateur**. Les réponses sont bloquées : impossible de les changer.
5. Le bouton **« Voir la correction »** devient actif. Avant, il est visible mais inactif.
6. Au clic, la correction s'affiche : le résultat (toujours en texte avec une icône), le détail et l'explication.

Règles importantes :

- **La correction n'existe pas dans la page avant le clic sur « Voir la correction ».** Elle n'est pas cachée : elle n'est pas encore construite. Un lecteur d'écran ne peut donc pas la lire à l'avance.
- **Un exercice validé ne peut pas être refait** (décision du formateur, CLAUDE.md, D-005).
- Après un rechargement de la page : un exercice validé réapparaît avec la réponse donnée. Un exercice non validé reste verrouillé, et son délai repart de zéro.
- Le délai **ne limite jamais** le temps de réponse. Il n'y a pas de durée maximale.
- Le stagiaire peut aller dans n'importe quelle partie avec le menu, et dans n'importe quel écran avec le plan de la séance.

### La case « Pourquoi ? »

Les deux exercices de tri (Séance 3 et Séance 4) ont une case « Pourquoi ? » sous les choix, car le livret demande une justification. Elle est **facultative** par défaut. Le formateur peut la rendre obligatoire (voir [section 8](#8-les-3-types-dexercices)). L'explication écrite est bloquée à la validation et rappelée dans la correction.

### Les exercices « au choix »

Les parcours A, B et C de la Séance 2 et de la Séance 6 sont des étapes **au choix**. Leurs exercices sont marqués « (au choix) ». Ils ne comptent pas dans « Exercices faits : … sur … ». Un compteur séparé les indique : « Exercices au choix faits : … sur … ».

### Les étapes fermées

Certaines parties du livret donnent les réponses d'un exercice : l'affiche « IA ou moteur de recherche », le tableau des « 3 jamais ». Comme le menu permet d'aller partout, ces étapes restent **fermées** tant que les exercices concernés ne sont pas validés :

- leur contenu n'est **pas inséré** dans la page (même règle que la correction) ;
- à la place, un message liste les exercices à faire, avec un lien vers chacun ;
- dans le plan de la séance, l'étape est marquée « (s'ouvre après des exercices) ».

| Étape fermée | S'ouvre après |
|---|---|
| Séance 3, étape 4 : « À retenir : IA ou moteur de recherche ? » | les 8 situations du tri (s3-e01 à s3-e08) |
| Séance 4, étape 2 : « La règle simple à retenir » | les 8 cas du tri (s4-e01 à s4-e08) |
| Mes besoins, étape 2 : « Les idées clés en images » | les 8 situations du tri de la Séance 3 |

---

## 5. Ajouter ou modifier du contenu

### Ce que vous pouvez faire seul, sans développeur

- Ajouter un exercice d'un type existant (`qcm_unique`, `qcm_multiple`, `texte_libre`).
- Modifier une question, une option, une bonne réponse ou une explication.
- Augmenter ou diminuer un délai (`tempsMinimumSecondes`), exercice par exercice.
- Indiquer une difficulté (`difficulte`).
- Ajouter ou retirer une case « Pourquoi ? », la rendre obligatoire.
- Ajouter une étape, un paragraphe, une liste, un encadré, une image.
- Rendre une étape « au choix » ou la fermer jusqu'à certains exercices.
- Reformuler un bouton ou un message (fichier `content/interface.json`).
- Ajouter une partie (voir [section 6](#6-format-json--les-parties-et-leurs-étapes)).

### Méthode conseillée

1. Ouvrir le fichier de la partie, par exemple `content/seance-2.json`, dans un éditeur de texte (VS Code, Notepad++…). Évitez le Bloc-notes de Windows.
2. **Copier un exercice existant** du même type, avec ses accolades `{ }`.
3. Le coller à l'endroit voulu dans la liste `"exercices"`.
4. Changer l'`id` (voir les règles ci-dessous), puis la question, les options, etc.
5. Enregistrer le fichier et recharger la page (F5).
6. **Si un message rouge « Un fichier de contenu a un problème » s'affiche** sur la partie, il indique le fichier, l'élément (`id`) et le champ à corriger. Les autres parties restent utilisables.

### ⚠️ Les pièges du format JSON

Le JSON est très strict. Une petite erreur rend le fichier illisible.

| Erreur | Faux | Juste |
|---|---|---|
| Virgule après le dernier élément | `["a", "b",]` | `["a", "b"]` |
| Virgule oubliée entre deux éléments | `{ "id": "a" } { "id": "b" }` | `{ "id": "a" }, { "id": "b" }` |
| Commentaire | `// ma note` | *(interdit : aucun commentaire possible)* |
| Guillemets simples | `'texte'` | `"texte"` |
| Guillemets doubles dans un texte | `"Il dit "bonjour""` | `"Il dit « bonjour »"` |
| Nombre entre guillemets | `"tempsMinimumSecondes": "20"` | `"tempsMinimumSecondes": 20` |
| Vrai/faux entre guillemets | `"auChoix": "true"` | `"auChoix": true` |

Astuce : dans un texte, utilisez les guillemets français « » plutôt que `"`. L'apostrophe `'` ne pose pas de problème.

Pour vérifier un fichier, vous pouvez coller son contenu dans un validateur JSON en ligne. Le contenu des séances n'est pas confidentiel, mais ne collez jamais un fichier de travail d'un stagiaire.

### ⚠️ Les identifiants (`id`)

- Un exercice a un `id` de la forme `s<numéro>-e<numéro>` : `s2-e07` = séance 2, exercice 07. Les exercices de « Avant de commencer » utilisent `s0` (`s0-e01` à `s0-e10`).
- Chaque `id` (exercice, étape, partie) doit être **unique dans tout le projet**.
- **Ne modifiez jamais l'`id` d'un exercice déjà utilisé par des stagiaires**, et ne le réutilisez jamais pour un autre exercice. Le travail des stagiaires est enregistré par `id`. Si vous changez l'`id`, leur réponse est perdue. Si vous réutilisez un `id`, leur ancienne réponse s'affiche sur le nouvel exercice.
- Pour ajouter un exercice entre deux autres, prenez simplement le numéro libre suivant (par exemple `s3-e19`). **L'ordre d'affichage est l'ordre dans le fichier**, pas l'ordre des numéros.
- Pour retirer un exercice, supprimez-le. Ne donnez plus jamais son `id` à un autre exercice. Pensez à le retirer aussi des listes `ouvertureApres` qui le citent : sinon, un message d'erreur l'indiquera.

---

## 6. Format JSON : les parties et leurs étapes

### La liste des parties (dans `content/interface.json`)

```json
"seances": [
  { "fichier": "avant-de-commencer.json", "etiquette": "Avant de commencer" },
  "seance-1.json",
  "seance-2.json",
  "seance-3.json",
  "seance-4.json",
  { "fichier": "mes-besoins.json", "etiquette": "Mes besoins" },
  "seance-5.json",
  "seance-6.json"
]
```

- **L'ordre de la liste est l'ordre du menu** et du bouton « Aller à la partie suivante ».
- Un **nom de fichier seul** est une séance numérotée : la première est « Séance 1 », la deuxième « Séance 2 », etc.
- Un **objet `{ "fichier", "etiquette" }`** est une partie non numérotée. L'étiquette remplace « Séance N » dans le menu et les titres.
- Les séances 5 et 6 sont placées **après** « Mes besoins » : le déroulé du livret ne change pas (CLAUDE.md, D-013). Conséquence : la fin de « Mes besoins » propose « Aller à la partie suivante », vers la séance 5.
- Pour ajouter une séance 7 : créer `content/seance-7.json`, puis ajouter `"seance-7.json"` à la fin de la liste.
- ⚠️ Le numéro affiché dépend de la **position** du nom de fichier dans la liste, pas du nom du fichier. Si vous déplacez `"seance-5.json"` avant `"seance-4.json"`, elle s'affichera « Séance 4 ».

### Un fichier de partie

```json
{
  "version": 1,
  "id": "seance-2",
  "titre": "La méthode des 4 questions",
  "objectifs": [
    "apprendre à formuler une demande claire ;",
    "améliorer le résultat par itération."
  ],
  "etapes": [
    {
      "id": "s2-etape-1",
      "titre": "Les 4 questions avant d'écrire",
      "blocs": [
        { "type": "paragraphe", "texte": "Avant d'écrire votre demande, répondez à ces 4 questions." }
      ],
      "exercices": [
        { "id": "s2-e01", "type": "texte_libre", "...": "voir la section 8" }
      ]
    }
  ]
}
```

| Champ | Obligatoire | Rôle |
|---|---|---|
| `version` | Oui | Version du format. Aujourd'hui : `1`. |
| `id` | Oui | Identifiant de la partie, par exemple `"seance-2"`. |
| `titre` | Oui | Titre, sans le numéro. L'application affiche « Séance 2 : La méthode des 4 questions ». |
| `objectifs` | Non | Liste de textes affichée sur l'écran de présentation de la partie. |
| `etapes` | Oui | Liste ordonnée des étapes (au moins une). |

### Une étape

| Champ | Obligatoire | Rôle |
|---|---|---|
| `id` | Oui | Identifiant unique, par exemple `"s2-etape-1"`. Il apparaît dans l'adresse de la page. |
| `titre` | Oui | Titre de l'étape. |
| `blocs` | Oui | Liste des parties « à lire » (peut être vide `[]`). Voir section 7. |
| `exercices` | Non | Liste ordonnée des exercices de l'étape. Voir section 8. |
| `auChoix` | Non | `true` : exercices facultatifs, marqués « (au choix) », hors du total obligatoire. `false` par défaut. |
| `ouvertureApres` | Non | Liste d'`id` d'exercices. Tant qu'ils ne sont pas tous validés, le contenu de l'étape (blocs et exercices) n'est pas affiché. Les exercices peuvent être dans une autre partie. |

Exemples :

```json
{ "id": "s2-etape-5", "titre": "Parcours A — Je découvre", "auChoix": true, "blocs": [], "exercices": [] }
```

```json
{
  "id": "s4-etape-2",
  "titre": "La règle simple à retenir",
  "ouvertureApres": ["s4-e01", "s4-e02", "s4-e03", "s4-e04", "s4-e05", "s4-e06", "s4-e07", "s4-e08"],
  "blocs": []
}
```

Utilisez `ouvertureApres` **seulement** pour un contenu qui donne des réponses : chaque étape fermée est une contrainte de plus pour le stagiaire.

Déroulé à l'écran : présentation de la partie → étape 1 (à lire) → exercices de l'étape 1 → étape 2 (à lire) → etc. Chaque exercice a son propre écran. Le repère « Séance 2 › Étape 3 sur 7 › Exercice 4 sur 13 » est toujours visible en haut.

---

## 7. Les blocs « à lire »

Dans tous les textes, vous pouvez mettre des mots **en gras** en les entourant de deux étoiles : `"Le **modèle** calcule le mot le plus probable."`

### Paragraphe

```json
{ "type": "paragraphe", "texte": "Une seule idée par phrase." }
```

### Sous-titre

```json
{ "type": "sous_titre", "texte": "Pour comparer : le marché de quartier" }
```

### Liste (à puces ou numérotée)

```json
{
  "type": "liste",
  "numerotee": true,
  "elements": ["Vous envoyez votre demande à l'IA.", "Vous lisez la réponse."]
}
```

`numerotee` est facultatif (`false` par défaut : liste à puces).

### Définitions

```json
{
  "type": "definitions",
  "elements": [
    { "terme": "Hallucination", "definition": "Quand l'IA invente une information fausse en ayant l'air sûre d'elle." }
  ]
}
```

### Encadré

```json
{
  "type": "encadre",
  "style": "attention",
  "titre": "Informations de janvier 2025",
  "texte": "Le formateur les confirme le jour de l'atelier."
}
```

- `style` : `"info"` (par défaut), `"attention"` ou `"astuce"`. Chaque style a son icône et sa couleur, mais c'est le **titre** qui porte le message : écrivez-le toujours.
- `titre` : facultatif, recommandé.
- `texte` et/ou `elements` (une liste de textes) : au moins l'un des deux. `numerotee: true` numérote la liste.

### Illustration

```json
{
  "type": "illustration",
  "fichier": "assets/images/04-iteration-conversation.jpg",
  "alt": "Schéma en cercle : 4 étapes reliées par des flèches. Le texte du schéma est écrit juste après l'image.",
  "legende": "L'itération : après l'étape 4, on revient à l'étape 1.",
  "transcription": {
    "titre": "Les 4 étapes du cercle :",
    "numerotee": true,
    "elements": ["J'écris ma demande.", "Je lis la réponse.", "Ce n'est pas ce que je voulais.", "Je précise et je renvoie."]
  }
}
```

| Champ | Obligatoire | Rôle |
|---|---|---|
| `fichier` | Oui | Chemin **relatif** de l'image, en minuscules. |
| `alt` | Oui | Texte alternatif lu par les lecteurs d'écran. Mettre `""` seulement pour une image purement décorative. |
| `legende` | Non | Légende visible sous l'image. |
| `transcription` | Non, mais **obligatoire si l'image contient du texte ou un schéma** | Le contenu de l'image, écrit en texte dans la page (règle d'accessibilité). |

### Tableau

```json
{
  "type": "tableau",
  "legende": "Les signaux de vigilance",
  "entetes": ["Je vérifie quand je vois…", "Pourquoi"],
  "lignes": [
    ["Une citation attribuée à quelqu'un", "L'IA peut inventer une phrase et l'attribuer à tort à une personne connue."]
  ]
}
```

La première case de chaque ligne sert de titre à la ligne. Sur un petit écran, le tableau défile horizontalement dans son cadre.

---

## 8. Les 3 types d'exercices

### Champs communs à tous les types

| Champ | Type | Obligatoire | Rôle |
|---|---|---|---|
| `id` | texte | **Oui** | Forme `s2-e07`. Unique. **Ne jamais modifier ni réutiliser.** |
| `type` | texte | **Oui** | `"qcm_unique"`, `"qcm_multiple"` ou `"texte_libre"`. |
| `question` | texte | **Oui** | Une seule question, en FALC. |
| `difficulte` | texte | Non | `"facile"`, `"moyen"` ou `"difficile"`. Vérifié, mais **pas encore affiché à l'écran** : l'usage reste à définir. |
| `tempsMinimumSecondes` | nombre entier ≥ 0 | Non | Délai avant de pouvoir valider. Absent ou `0` = pas de délai. Écrire le nombre **sans guillemets**. |

Conseils pour le délai :

- QCM court : pas de délai (champ absent). C'est le cas de tous les QCM des séances du livret. Dans les séances 5 et 6, les QCM à plusieurs réponses ont un délai de 10 à 20 secondes.
- Réponse courte à écrire : 10 à 20 secondes.
- Réponse longue ou recherche (demande complète, chasse à l'erreur) : 30 à 60 secondes.
- Le délai freine la précipitation. Il ne prouve pas que le stagiaire a lu.

### 8.1 `qcm_unique` — une seule bonne réponse

Affiché avec des boutons radio : une seule réponse possible.

```json
{
  "id": "s4-e05",
  "type": "qcm_unique",
  "question": "Cas 5 : mon CV pour le faire relire. Est-ce que je le saisis dans une IA en ligne ?",
  "options": [
    { "id": "a", "texte": "Je saisis" },
    { "id": "b", "texte": "Je ne saisis pas" },
    { "id": "c", "texte": "Prudence" }
  ],
  "reponseCorrecte": "c",
  "justification": { "libelle": "Pourquoi ? (en une phrase)", "obligatoire": false },
  "explicationCorrection": "Le CV contient des données personnelles. Anonymisez-le si possible avant de le saisir.",
  "difficulte": "moyen"
}
```

| Champ | Obligatoire | Rôle |
|---|---|---|
| `options` | Oui | Au moins 2 options `{ "id", "texte" }`. Chaque `id` d'option est unique dans l'exercice. |
| `reponseCorrecte` | Oui | L'`id` de la bonne option. Il doit exister dans `options`. |
| `explicationCorrection` | Oui | Affichée après validation, que la réponse soit juste ou fausse. |
| `justification` | Non | Ajoute une case « Pourquoi ? » sous les choix. `libelle` (obligatoire) : le texte au-dessus de la case. `obligatoire` : `true` pour empêcher la validation tant que la case est vide ; `false` par défaut. |
| `sansNote` | Non | `true` : pas de « Bonne réponse » ni de « Ce n'est pas la bonne réponse ». La correction affiche « Il n'y a pas de note pour cet exercice » et « Le choix le plus naturel : … ». À utiliser quand plusieurs réponses se justifient. |

### 8.2 `qcm_multiple` — plusieurs bonnes réponses

Affiché avec des cases à cocher. Le message « Plusieurs réponses sont possibles. Cochez toutes les bonnes réponses. » s'affiche automatiquement.

La réponse est **juste seulement si toutes les bonnes cases sont cochées, et aucune mauvaise**. La correction détaille chaque option. Les séances 5 et 6 utilisent ce type ; les séances du livret ne l'utilisent pas.

```json
{
  "id": "s3-e19",
  "type": "qcm_multiple",
  "question": "Parmi ces informations, lesquelles faut-il vérifier ailleurs ?",
  "options": [
    { "id": "a", "texte": "Une date très précise" },
    { "id": "b", "texte": "Une citation attribuée à quelqu'un" },
    { "id": "c", "texte": "Une reformulation de mon propre texte" }
  ],
  "reponsesCorrectes": ["a", "b"],
  "explicationCorrection": "Une date précise et une citation font partie des signaux de vigilance.",
  "difficulte": "moyen",
  "tempsMinimumSecondes": 10
}
```

*(Exemple de format, qui n'est pas dans le livret.)*

| Champ | Obligatoire | Rôle |
|---|---|---|
| `options` | Oui | Comme pour `qcm_unique`. |
| `reponsesCorrectes` | Oui | **Liste** des `id` des bonnes options (au moins un). Attention au `s` et aux crochets `[ ]`. |
| `explicationCorrection` | Oui | Affichée après validation. |
| `justification` | Non | Comme pour `qcm_unique`. |

`sansNote` n'existe pas pour ce type.

### 8.3 `texte_libre` — le stagiaire écrit sa réponse

Deux modes, avec le champ `mode`.

**Mode `"modele"` (par défaut)** : pas de note. La correction affiche la réponse du stagiaire, puis l'exemple de réponse s'il existe, puis l'explication. Idéal pour « écrivez avec vos mots ».

```json
{
  "id": "s2-e07",
  "type": "texte_libre",
  "mode": "modele",
  "question": "Ma demande à l'IA : écrivez le texte complet que vous envoyez.",
  "reponseModele": "Je travaille au support informatique. Un utilisateur m'écrit qu'il n'arrive plus à se connecter…",
  "explicationCorrection": "Vérifiez que votre demande répond aux 4 questions : quoi, pour qui, comment, avec quoi.",
  "difficulte": "moyen",
  "tempsMinimumSecondes": 45
}
```

Sans exemple de réponse (par exemple pour des impressions personnelles), l'explication suffit :

```json
{
  "id": "s1-e01",
  "type": "texte_libre",
  "question": "Vos impressions après la manipulation libre : qu'est-ce qui vous a marqué ?",
  "explicationCorrection": "Il n'y a pas de bonne ou de mauvaise impression.",
  "tempsMinimumSecondes": 30
}
```

**Mode `"comparaison"`** : la réponse est comparée à une liste de réponses acceptées. Pour les réponses courtes et précises (un mot, un nombre).

```json
{
  "id": "s2-e14",
  "type": "texte_libre",
  "mode": "comparaison",
  "question": "Quel mot le camarade n'a pas compris dans son document ?",
  "reponsesAcceptees": ["API", "une API", "l'API"],
  "fautesAcceptees": 1,
  "reponseModele": "API",
  "explicationCorrection": "Le mot est « API ».",
  "difficulte": "facile"
}
```

*(Exemple de format, qui n'est pas dans le livret.)*

| Champ | Obligatoire | Rôle |
|---|---|---|
| `mode` | Non | `"modele"` (par défaut) ou `"comparaison"`. |
| `reponseModele` | Oui en mode `"comparaison"`. En mode `"modele"` : oui **ou** `explicationCorrection` | L'exemple de réponse affiché dans la correction. |
| `reponsesAcceptees` | Oui en mode `"comparaison"` | Liste de toutes les formes acceptées. Pensez aux variantes. |
| `fautesAcceptees` | Non | Nombre de fautes de frappe tolérées (1 par défaut). Mettre `0` pour exiger la réponse exacte. |
| `explicationCorrection` | Non, recommandé | Affichée après validation. |

Comment marche la comparaison :

- les **majuscules**, les **accents**, les **espaces en trop** et la **ponctuation finale** ne comptent pas ;
- une faute de frappe est acceptée par défaut ;
- **les réponses de moins de 4 caractères doivent être exactes** (« API » avec une faute ne passe pas) ;
- pour une question ouverte, préférez le mode `"modele"` : une comparaison automatique mettrait des stagiaires en échec sans raison.

⚠️ **Ne posez pas de question personnelle sensible en texte libre** (santé, handicap, difficultés personnelles). Les réponses sont enregistrées dans le navigateur et dans le fichier d'export. C'est pour cette raison que la fiche « Mes besoins » se remplit sur papier (CLAUDE.md, D-012).

---

## 9. Les textes de l'interface

Tous les textes des boutons et des messages sont dans `content/interface.json`. Vous pouvez les reformuler librement.

- Les repères entre accolades, comme `{numero}` ou `{nom}`, sont remplacés automatiquement. **Gardez-les tels quels.**
- Ne changez pas les **noms des champs** (à gauche des deux-points), seulement les textes (à droite).
- Rubriques principales : `navigation` (menu, repères, plan), `accueil`, `exercice` (boutons et messages du déroulé), `types` (textes propres à chaque type), `verrouillage` (étapes fermées), `sauvegarde` (export et import), `erreurs` (messages pour le formateur).

**Seule exception** : le message affiché quand l'application ne peut pas démarrer est écrit dans `index.html`. Il ne peut pas venir d'un JSON, car il sert justement quand les JSON ne se chargent pas.

---

## 10. Sauvegarde, export et import

### Sauvegarde automatique

À chaque validation, la réponse est enregistrée dans le `localStorage` du navigateur, sous le nom `atelier-ia-progression`. Un avertissement reste **visible en permanence** en haut de chaque page :

> Votre travail est gardé sur cet ordinateur seulement. Pour le garder, cliquez sur « Enregistrer mon travail dans un fichier ».

Si le navigateur bloque cette sauvegarde, l'application le détecte, affiche un avertissement et reste utilisable. Le travail est alors perdu à la fermeture de la page, sauf s'il est exporté.

### Exporter (« Enregistrer mon travail dans un fichier »)

Télécharge un fichier `mon-travail-atelier-ia-AAAA-MM-JJ.json`, souvent dans le dossier « Téléchargements ». Le stagiaire le garde sur une clé USB ou dans ses documents.

Contenu du fichier :

```json
{
  "format": "atelier-ia-progression",
  "version": 1,
  "dateExport": "2026-09-14T09:30:00.000Z",
  "exercices": {
    "s0-e01": { "reponse": "b", "valide": true, "correctionVue": true, "resultat": "juste", "date": "2026-09-14T09:12:00.000Z" },
    "s3-e01": { "reponse": { "choix": "b", "justification": "Donnée actuelle" }, "valide": true, "correctionVue": true, "resultat": "non_note", "date": "2026-09-14T09:20:00.000Z" },
    "s2-e07": { "reponse": "Je travaille au support…", "valide": true, "correctionVue": false, "resultat": "non_note", "date": "2026-09-14T09:25:00.000Z" }
  }
}
```

- `reponse` : l'`id` choisi (QCM unique), la liste des `id` cochés (QCM multiple), le texte écrit (texte libre), ou `{ "choix", "justification" }` pour un QCM avec case « Pourquoi ? ».
- `resultat` : `"juste"`, `"faux"` ou `"non_note"`.

Le fichier contient **seulement** : les identifiants d'exercices, les réponses, l'état (validé, correction vue), le résultat et la date. **Aucun nom, aucune donnée de santé ou de handicap.** Attention : les réponses écrites en texte libre sont celles du stagiaire, par exemple son métier visé (parcours C).

### Importer (« Reprendre un travail enregistré »)

1. Le stagiaire choisit son fichier.
2. L'application **vérifie le fichier avant de toucher à quoi que ce soit** : est-ce un JSON ? est-ce un fichier de **cet** atelier ? est-ce la bonne version ? Les entrées abîmées sont ignorées.
3. Si le fichier est correct, une fenêtre résume son contenu et demande une confirmation. Le bouton sélectionné en premier est « Non, garder mon travail actuel ».
4. Seulement après confirmation, le travail du navigateur est **remplacé** par celui du fichier.

Un fichier exporté depuis l'atelier « Culture informatique et Web » est refusé.

---

## 11. Limites connues

### Le verrouillage n'est PAS un dispositif anti-triche

Le verrouillage des corrections, les étapes fermées et le délai minimum sont des **garde-fous pédagogiques contre la précipitation**. Ils ne protègent pas contre une fraude volontaire :

- les fichiers JSON sont **publics** : les bonnes réponses sont lisibles par toute personne qui ouvre les fichiers ou les outils de développement du navigateur ;
- le travail enregistré (`localStorage`) et les fichiers exportés peuvent être **modifiés à la main** ;
- un fichier exporté par un stagiaire peut être importé par un autre.

C'est un choix assumé (CLAUDE.md, D-002) : une vraie protection demanderait un serveur. La présence du formateur dans la salle complète le dispositif. **Ne présentez jamais ce mécanisme comme infalsifiable.**

### Le travail peut être perdu

Le travail est gardé **dans un navigateur, sur un ordinateur**. Il est perdu en cas de :

- changement d'ordinateur ou de navigateur ;
- nettoyage du cache ou des données de navigation (y compris « Effacer l'historique » avec les données de sites) ;
- navigation privée ;
- réinitialisation automatique des postes à la déconnexion, selon la configuration de l'ESRP (**à vérifier avec le service informatique**).

**Seule parade : l'export du travail dans un fichier**, puis l'import sur le nouveau poste.

### Autres limites

- **Poste partagé** : deux stagiaires qui utilisent le même poste avec la même session Windows partagent le même travail. Le second verra les réponses et corrections du premier. Point ouvert, non traité (CLAUDE.md, section 2.4). En attendant : une session Windows par stagiaire, ou export puis effacement des données du site entre deux stagiaires.
- **Pas de nouvelle tentative** : un exercice validé ne peut pas être refait, même après import ou rechargement.
- **Double-clic sur `index.html`** : ne fonctionne pas (voir section 2).
- **Le délai repart de zéro** si la page est rechargée.
- **QCM de positionnement** : le glossaire de la Séance 1 contient des réponses de ce QCM. Comme le menu permet d'ouvrir toutes les parties, un stagiaire peut le lire avant de répondre. La Séance 1 n'est pas fermée : ce serait contraire à la navigation libre demandée.
- **Parcours au choix** : l'application n'impose pas de faire « au moins un parcours ».
- **`difficulte`** est vérifié mais pas encore utilisé à l'écran.
- **Informations datées** : le panorama des outils (Séance 1) et la question 3 du débat (Séance 4) décrivent la situation de **janvier 2025**, comme le livret. Elles n'ont pas été revérifiées pour cette application. Le formateur doit les confirmer avant l'atelier, notamment les conditions d'inscription (vérification par téléphone).
- **Séances 5 et 6 : informations de septembre 2026.** Elles ont été vérifiées le 14 septembre 2026 et vieilliront vite (outils, chiffres d'études, droit européen). La liste « Ce qui risque d'être faux dans 6 mois » est dans le guide du formateur, section 8 : à relire avant chaque session.
- **Guide du formateur public** : `formateur/guide-seances-5-6.md` contient les réponses attendues des séances 5 et 6. Il est publié dans le dépôt, donc public, comme les JSON (choix du formateur, CLAUDE.md, D-013).

### Tests réalisés et tests à faire

**Tests automatiques réalisés** le 2026-09-15 dans **Edge 153** et **Chrome 153** (sans fenêtre, via un serveur local) : 80 vérifications, toutes réussies dans les deux navigateurs, sans erreur JavaScript ni fichier introuvable. Ils vérifient notamment :

- les 8 parties, 47 étapes et 85 exercices s'affichent sans erreur ;
- les 18 images (JPEG et SVG) existent et sont décodées par le navigateur ;
- séances 5 et 6 : compteurs de l'accueil (obligatoires et « au choix »), exercice sans note, trace de l'activité présente en tableau, lien de la fin de « Mes besoins » vers la séance 5 ;
- à 320 px de large, il n'y a ni défilement horizontal, ni id en double, ni image sans `alt` ;
- aucune correction ni explication n'est présente dans la page avant la validation, y compris après un rechargement ;
- le délai anti-précipitation n'a pas de compte à rebours et fait une seule annonce à la fin ;
- la case « Pourquoi ? » fonctionne, en version facultative et obligatoire ;
- les exercices sans note et les étapes fermées puis ouvertes fonctionnent ;
- l'export, puis l'import avec confirmation, annulation et refus d'un fichier d'un autre atelier fonctionnent ;
- les messages d'erreur de contenu (JSON mal écrit, exercice inconnu) sont clairs.

Les contrastes des couleurs ont été **calculés** (formule WCAG) : tous au-dessus de 4,5:1 pour le texte et de 3:1 pour les contours.

**Tests manuels à faire avant la mise en service** (non réalisés) : parcours complet au clavier seul, parcours avec le lecteur d'écran NVDA, zoom à 200 %, vérification des contrastes avec un outil dédié, essai sur **Firefox** et sur les navigateurs réellement installés sur les postes de l'ESRP.

---

## 12. Notes sur le contenu du livret

### Sources

- **Contenu repris** : `Livret_Stagiaire_Atelier_IA.pdf` (livret du stagiaire, 38 pages). Seul le contenu destiné aux stagiaires est dans l'application.
- **Consulté pour certaines explications** : `2.Atelier_IA–Prise_En_Main_Et_Usages.pdf` (fiche pédagogique du formateur).

### Ce qui vient directement du livret

- Tous les textes des séances, le glossaire, les tableaux, les analogies et les encadrés.
- Les 10 questions du QCM de positionnement, leurs réponses et leurs justifications (page « Corrigés »).
- Les 8 situations « IA ou moteur de recherche » et les 8 cas « Je saisis / je ne saisis pas / prudence », avec les réponses et raisons de la page « Corrigés ».

### Ce qui a été rédigé pour l'application (à relire et valider par le formateur)

- **Les explications de correction de tous les exercices en texte libre** (Séances 1 à 4). Elles s'appuient sur le livret (4 questions, relances, signaux de vigilance) et sur la fiche formateur, mais leur formulation est nouvelle.
- **Les exemples de réponse** du parcours A (`s2-e01`) et du parcours B (`s2-e03` à `s2-e08`). Le livret ne donne pas de réponse modèle pour ces exercices.
- Le découpage des zones d'écriture en exercices : un écran par case du livret (parcours B et C, grille de comparaison, chasse à l'erreur).
- Quelques objectifs de présentation (« Avant de commencer », Séance 1 ligne 2, Séance 2 ligne 3, « Mes besoins »), l'étape « Après le QCM » et la liste « Dans l'application » (Séance 2, étape 4).
- Les valeurs de `difficulte` (les parcours A, B et C sont en `facile`, `moyen` et `difficile`) et de `tempsMinimumSecondes`.

### Adaptations du livret

- **La page « Corrigés » n'est pas reproduite** : chaque corrigé s'affiche seulement après la validation de son exercice (CLAUDE.md, D-009).
- **« Comment utiliser ce livret »** : « Vous pouvez écrire dedans. Il y a beaucoup d'espaces vides pour écrire. » devient « Vous pouvez écrire dans les cases. » ; « Le corrigé est à la fin du livret » devient « La correction s'affiche seulement après votre réponse. »
- **« Vos réponses sont confidentielles »** (après le QCM de positionnement) est retiré : l'application ne peut pas le garantir (poste partagé, fichier d'export). Le reste de la phrase est gardé.
- **Italique remplacé par du gras** (règle FALC), majuscules de « NE DOIT JAMAIS » (question 7) remplacées par des minuscules.
- **Analogie de la colocation** : placée dans l'étape sur l'itération (Séance 2, étape 3) au lieu d'après le parcours C, car le texte « à lire » d'une étape s'affiche avant ses exercices.
- **« Règle à retenir » du tri IA ou moteur** : dans le livret, elle est sous le tableau. Elle est placée dans l'étape fermée qui suit le tri, avec l'affiche « balance ».
- **Exercices de tri** : une situation par écran. La « justification brève » demandée par le livret devient une case « Pourquoi ? » facultative. Le tri « IA ou moteur » est **sans note**, car son corrigé dit que plusieurs réponses se justifient.
- **Fiche « Mes besoins »** : présentée en lecture seule, à remplir sur papier ou à l'oral (CLAUDE.md, D-012). La fiche formateur cite une « version numérique remplissable » comme adaptation possible : ce choix reste à discuter.

### Écart entre les deux documents

- **Cas 6 du tri (extrait de code d'un projet professionnel)** : le livret du stagiaire donne « Prudence » ; le tableau de la fiche formateur donne « Prudence / non ». L'application suit le livret du stagiaire (« Prudence », noté juste ou faux). À trancher par le formateur.

### À propos des illustrations

- **8 illustrations** ont été fournies, et non 9. Le livret PDF n'en contient aucune.
- **Les noms de 4 fichiers d'origine ne correspondent pas à leur contenu.** Correspondance vérifiée en ouvrant chaque image :

| Fichier d'origine | Contenu réel | Fichier publié |
|---|---|---|
| `1 — Ce qu'est une IA générative.png` | IA générative | `01-ia-generative-plausible.jpg` |
| `2 — L'analogie de la boulangerie.png` | Boulangerie | `02-analogie-boulangerie.jpg` |
| `3 — IA ou moteur de recherche.png` | Balance IA / moteur | `07-ia-ou-moteur-balance.jpg` |
| `4 — Les quatre questions avant d'écrire.png` | **Affiche récapitulative en 3 cases** | `08-recapitulatif-trois-idees.jpg` |
| `5 — L'itération.png` | **Les 4 questions** | `03-quatre-questions.jpg` |
| `6 — Les signaux de vigilance.png` | **Le cycle de l'itération** | `04-iteration-conversation.jpg` |
| `7 — Ce que je ne saisis pas.png` | **Les signaux de vigilance** | `06-signaux-vigilance.jpg` |
| `8 — Les trois parcours.png` | Les trois parcours | `05-trois-parcours.jpg` |

- **Il n'y a donc pas d'illustration « Ce que je ne saisis pas »** : la Séance 4 n'a pas d'image.
- L'affiche récapitulative reprend les illustrations 1, 2 et la balance. Sa troisième case donne des réponses du tri de la Séance 3 : elle est dans une étape fermée.
- Petites différences entre images et texte, sans contradiction : la boulangerie de l'image compare un vrai pain et un pain de décoration, le texte parle d'une boulangerie qui fabrique un pain ressemblant ; le cycle de l'itération a 4 étapes, l'encadré FALC en a 3.
- Les images ont été redimensionnées (1200 px de large, 1024 px pour les carrées) et converties en JPEG : environ 840 Ko au total au lieu d'environ 8,8 Mo.
- **Les 8 fichiers d'origine contiennent un marquage de provenance C2PA** qui mentionne « trainedAlgorithmicMedia » (média produit par un modèle entraîné) et « OpenAI ». Ce marquage a été perdu lors de la compression. Pour rester transparent, le pied de page indique : « Les illustrations ont été créées avec une intelligence artificielle. » Vérifiez les droits de diffusion et l'absence de logo ou de marque avant d'ajouter une nouvelle image.

### Séances 5 et 6 « Aller plus loin »

- **Elles ne viennent pas du livret.** Elles ont été rédigées pour l'application, à partir d'un cahier des charges fourni par le formateur (ingénierie de la demande et du contexte ; boucle agentique). **Tout leur contenu est à relire et valider par le formateur.**
- **Paramètres non fournis** dans ce cahier des charges : des valeurs par défaut ont été choisies (métiers, durée, absence d'outil agentique). Liste et moyen de les changer : guide du formateur, section 0.
- **Étiquettes** : chaque affirmation technique est marquée **Mesuré** (une étude a compté), **Observé** (des cas documentés existent) ou **Supposé** (avis d'experts, sans preuve), avec sa date. Les sources sont dans le guide du formateur, section 7.
- **La trace de l'activité** (séance 6, étape 7) est un exemple construit, pas la copie d'un vrai outil. La page le dit.
- **Les 10 schémas** ont été dessinés en SVG par Claude (une IA), au lieu d'utiliser les prompts d'images du cahier des charges. Plusieurs corrections ont été apportées à ces prompts (couleurs, lisibilité en noir et blanc, affirmations non prouvées) : guide du formateur, section 10.4.
- **Tensions avec la séance 2, non modifiées** : le corrigé de `s2-e06` (« Plus l'IA a d'informations sur la situation, plus sa réponse est utile ») et l'étape 2 (« La qualité de la demande détermine la qualité de la réponse ») sont nuancés par la séance 5. Propositions de reformulation : guide du formateur, section 10.5. À trancher.
- **Aucun essai avec des stagiaires** : les durées annoncées sont des estimations.

---

## 13. Pour les développeurs : créer un nouveau type d'exercice

Contraintes du projet : HTML, CSS et JavaScript **vanilla**, modules ES natifs, **aucune dépendance**, aucun CDN, aucun build. Code et commentaires en français.

1. Créer `js/types/mon-type.js` qui exporte un objet respectant ce contrat :

```js
export default {
  // Valeur du champ "type" dans le JSON
  type: 'mon_type',

  // Vérifie les champs propres à ce type. Renvoie une liste d'erreurs { champ, code, valeur?, valeurs? }.
  // Les champs communs (id, type, difficulte, tempsMinimumSecondes) sont déjà vérifiés par le chargeur.
  // "code" renvoie à un message de content/interface.json (erreurs.codes).
  verifierStructure(exercice) { return []; },

  // Construit le HTML accessible de la question dans le conteneur, SANS la correction.
  // "textes" = rubrique types.mon_type de content/interface.json.
  afficher(exercice, conteneur, textes) {},

  // Renvoie la réponse du stagiaire, ou null si pas de réponse.
  // Formes acceptées par la sauvegarde : texte, liste de textes, ou { choix, justification }.
  lireReponse(conteneur) {},

  // Remet à l'écran une réponse déjà enregistrée (après rechargement).
  restaurerReponse(conteneur, reponse) {},

  // true (juste), false (faux) ou null (non noté).
  estCorrecte(exercice, reponse) {},

  // Détail de la correction : liste de { etat: 'juste' | 'faux' | 'neutre', libelle, texte }.
  // Le moteur se charge de l'afficher.
  decrireCorrection(exercice, reponse, textes) { return []; }
};
```

2. L'ajouter dans `js/types/registre.js`.
3. Ajouter ses textes dans `content/interface.json` (rubrique `types`) et ses éventuels codes d'erreur (rubrique `erreurs.codes`).
4. Documenter ses champs JSON dans ce README.
5. Consigner la décision dans CLAUDE.md, section 6.

Un type d'exercice **ne doit jamais** afficher la correction, gérer le délai, bloquer les champs ou écrire dans le `localStorage`. C'est le rôle du moteur (`moteur-exercices.js`). Ainsi, un nouveau type ne peut pas oublier le verrouillage.

`lireReponse` ne reçoit pas l'exercice. Si un réglage du JSON change la lecture de la réponse, écrivez-le dans un attribut `data-` du champ au moment d'`afficher` (voir la case « Pourquoi ? » dans `commun-qcm.js`).

Rappel : **aucun texte affiché ne doit être écrit dans le JavaScript**. Tous les textes viennent de `content/`.
