# Guide du formateur — Séance 1 : des demandes à tester

- **Où, dans l'application :** séance 1, étape « Des demandes à tester », puis l'exercice `s1-e03` dans l'étape « Manipulation libre : vos notes ».
- **Où, dans la fiche formateur :** fin de l'étape 2 (« Manipulation à l'aveugle ») et étape 3 (« Mise en commun »).
- **Rédigé le :** 15 septembre 2026. Ce n'est pas un contenu du livret : voir CLAUDE.md, D-014.
- **Statut :** proposition, **pas encore essayée avec des stagiaires**.

> ⚠️ Ce guide est public, comme tout le dépôt. Il donne les réponses attendues.

---

## 1. Pourquoi cette étape

- **Le risque :** pendant le temps libre, un stagiaire peut poser des questions simples et n'obtenir que des réponses justes. Il ne voit alors aucune des 3 idées à retenir : « plausible, pas vrai », « elle se trompe avec assurance », « pas un moteur de recherche ».
- **Ce que dit déjà la fiche formateur :** « on ne peut pas garantir que l'IA se trompera au bon moment le jour J » (préparation de la séance 3).
- **Le choix fait :** garder le temps libre, puis proposer des demandes choisies pour montrer les limites.
- **Pourquoi pas une liste dès le début :** la fiche fait de la manipulation « à l'aveugle » le cœur de l'observation : « Que demande spontanément le stagiaire ? ». Une liste donnée tout de suite supprimerait cette observation.

---

## 2. Déroulé proposé (étape 2 de la fiche, 25 minutes)

| Temps | Ce qui se passe | Rôle du formateur |
|---|---|---|
| 0 – 12 min | Temps libre, comme dans la fiche. | Observer sans guider. |
| 12 – 22 min | Signal du formateur. Les stagiaires ouvrent l'étape « Des demandes à tester » et en testent au moins 3, une par idée. | Circuler. Aider à copier une demande et à vérifier. Ne pas donner la réponse. |
| 22 – 25 min | Notes dans l'application (`s1-e01`, `s1-e03`, `s1-e02`). | Rappeler qu'il n'y a pas de mauvaise réponse. |

Puis l'étape 3 de la fiche (mise en commun), avec une relance de plus : « Qui a eu une réponse fausse ou inventée ? Comment l'avez-vous vu ? ».

**Durées :** estimations, non mesurées. Si le groupe lit lentement, réduisez la liste à 3 demandes (une par idée), que vous choisissez.

**Point connu :** l'application montre les 3 formules dès l'étape 1, alors que la fiche prévoit de manipuler avant d'expliquer. C'est l'ordre du livret. Si vous tenez à cet ordre, faites ouvrir l'application seulement après la manipulation.

---

## 3. Avant l'atelier (obligatoire)

1. **Testez les 7 demandes vous-même**, sur l'outil réellement utilisé par les stagiaires, la même semaine. Notez lesquelles donnent une erreur.
2. **Vérifiez que le roman « Le Jardinier de la gare de Pontoise » (Martine Lebrun, 2009) n'existe pas.** Il a été inventé pour l'exercice, mais son absence n'a pas été vérifiée dans un catalogue de bibliothèque. S'il existe, changez le titre dans `content/seance-1.json`.
3. **Préparez une capture de secours :** une vraie réponse fausse obtenue avec l'outil, avec la date et le nom de l'outil. Montrez-la à la mise en commun si personne n'a obtenu d'erreur. **Ne fabriquez jamais une fausse capture** : ce serait enseigner la vérification avec un faux document.
4. Si la ville du centre est très petite (pas de médiathèque), donnez aux stagiaires une ville proche à écrire à la place de [ville].

---

## 4. Les 7 demandes : ce qu'on peut observer

Aucune demande ne garantit une erreur (**inférence**, confiance élevée). Les outils de 2026 repèrent souvent ces pièges, surtout ceux qui cherchent sur Internet.

| Demande | Réponse de référence | Ce qu'on peut observer | Si l'IA répond juste |
|---|---|---|---|
| Résumé du roman « Le Jardinier de la gare de Pontoise » | Livre inventé (à vérifier, voir 3.2). | Un résumé détaillé d'un livre qui n'existe pas. | « Je ne trouve pas ce livre » est une bonne réponse. Demandez : « Comment l'IA aurait-elle pu le savoir ? » |
| 3 articles de presse avec liens | Pas de réponse fixe : il faut cliquer. | Liens qui ne marchent pas, articles inventés, dates fausses, article réel qui ne dit pas ce que résume l'IA. | Faites vérifier qu'un article dit **vraiment** ce que l'IA en dit : c'est l'erreur la plus difficile à voir. |
| Nombre de « r » dans « serrurerie » | **4** (s-e-**r**-**r**-u-**r**-e-**r**-i-e). | Un chiffre faux donné sans hésiter. | Fréquent avec les anciens modèles, plus rare avec les modèles qui raisonnent (**observé**). |
| Prix Nobel de Victor Hugo | **Jamais.** Victor Hugo est mort en 1885 ; le premier prix Nobel a été remis en 1901. | Une année inventée, ou une réponse qui accepte la fausse idée de départ. | Beaucoup d'outils repèrent le piège. Faites remarquer que la question contenait une fausse idée : l'IA ne la corrige pas toujours. |
| Nombre de boulangeries en France, un seul chiffre | Pas de chiffre exact unique : il dépend de la source, de l'année et de ce qu'on compte. | Deux chiffres différents, chacun présenté avec assurance, souvent sans source. | Même avec le même chiffre, demandez : « D'où vient-il ? De quelle année ? » |
| Horaires de la médiathèque aujourd'hui | Site de la médiathèque ou de la mairie. | Horaires inventés, ou horaires d'une autre ville. | Un outil qui cherche sur Internet peut répondre juste. Faites comparer avec le site officiel (jours fériés, horaires d'été). |
| Météo en ce moment | La fenêtre, ou un site de météo. | « Je n'ai pas accès à la météo », ou une météo inventée. | Un outil connecté peut répondre juste : c'est l'occasion d'expliquer que certains outils cherchent, puis **rédigent** à partir de ce qu'ils trouvent. |

---

## 5. Encadré formateur

- **Ce qu'il faut dire :**
  - Ces demandes montrent des limites. Elles ne montrent pas que l'IA est inutile.
  - Une réponse juste ne prouve pas que l'IA a toujours raison.
  - Pour savoir si c'est vrai, on vérifie ailleurs : un site officiel, un livre, un comptage fait soi-même.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Avec ces questions, l'IA se trompe à tous les coups. » C'est faux, et les stagiaires le verront.
  - « L'IA ment. » Elle n'a pas d'intention : elle produit un texte vraisemblable.
  - « Les IA qui cherchent sur Internet ne se trompent plus. » **Mesuré** (étude sur des outils juridiques avec recherche documentaire, *Journal of Empirical Legal Studies*, 2025) : ces outils produisent encore des erreurs, même avec des documents.
  - Un pourcentage d'erreurs « en général ». Il n'en existe pas de fiable pour tous les outils.
- **Question hors de portée, par exemple « Pourquoi elle ne sait pas compter les lettres ? » :** « Je ne sais pas l'expliquer simplement et sûrement. Ce qu'on peut retenir : elle ne lit pas les mots lettre par lettre comme nous. On vérifie donc soi-même. »
- **3 erreurs de compréhension probables** (anticipées, non mesurées) :
  1. « Je n'ai pas eu d'erreur, donc mon outil est fiable. »
  2. « L'IA s'est trompée une fois, donc elle ne sert à rien. »
  3. Croire que l'IA a « fait exprès » de piéger, ou qu'elle « a honte » quand on la corrige.

---

## 6. Ce qu'on sait

| Affirmation | Étiquette | Source | Confiance |
|---|---|---|---|
| Les IA peuvent inventer des références (titres, auteurs, liens). | Mesuré, sur des modèles de 2023 | Walters et Wilder, *Scientific Reports*, 2023. Référence non relue pour ce guide. | Élevée pour le phénomène ; faible pour la fréquence avec les outils de 2026. |
| Des outils avec recherche documentaire se trompent encore. | Mesuré | Étude sur les outils juridiques, *Journal of Empirical Legal Studies*, 2025 (voir guide des séances 5 et 6, section 7). | Élevée pour ces outils. |
| Compter les lettres d'un mot pose problème à certains modèles. | Observé | Nombreux exemples publics depuis 2024. | Moyenne ; en recul avec les modèles qui raisonnent. |
| La même question peut donner des réponses différentes. | Observé | Fonctionnement connu des IA génératives ; à constater en séance. | Élevée. |

---

## 7. Ce qui risque d'être faux dans 6 mois

**Date :** 15 septembre 2026. À relire au plus tard en mars 2027.

- Les demandes qui produisent encore une erreur changeront avec chaque version des outils. **Refaites le test de la section 3 avant chaque atelier.**
- Les demandes « comptage » et « Victor Hugo » sont les plus susceptibles de ne plus rien montrer. Gardez-les pour la discussion, et comptez surtout sur les demandes « articles avec liens » et « boulangeries ».
- Si une demande ne montre plus rien depuis plusieurs ateliers, remplacez-la dans `content/seance-1.json`. Gardez les 3 colonnes, et une ligne par idée au minimum.
