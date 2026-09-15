# Guide du formateur — Séances 5 et 6 « Aller plus loin »

- **Séance 5 :** du prompt au contexte.
- **Séance 6 :** la boucle agentique.
- **Sources vérifiées le :** 14 septembre 2026.
- **Pour qui :** les formateurs et formatrices qui animent ces séances, y compris sans connaissance particulière de l'IA.

Les stagiaires voient les séances 5 et 6 dans l'application. **Ce guide n'est pas affiché dans l'application.** Il contient les réponses attendues : ne le donnez pas aux stagiaires avant la séance.

> ⚠️ Ce guide est publié sur GitHub : il est public, comme les fichiers JSON qui contiennent déjà les corrections. C'est la même limite que pour tout l'atelier (CLAUDE.md, D-002 et D-013).

---

## Mode d'emploi du guide

- Chaque notion a un **encadré formateur** en 4 points :
  - ce qu'il faut dire ;
  - ce qu'il ne faut surtout pas affirmer ;
  - quoi répondre à une question hors de portée ;
  - 3 erreurs de compréhension probables.
- Les « erreurs probables » ont été **anticipées par le concepteur**, à partir du contenu et du public. **Elles ne sont pas mesurées.** Complétez-les avec ce que vous observez en séance.
- Les affirmations techniques ont une **étiquette** (mesuré, observé, supposé) et un **niveau de confiance**. Le détail des sources est en [section 7](#7-sources).
- Réponse type à une question hors de portée : **« Je ne sais pas. On vérifie ensemble. »**
  - Cherchez la source : site de l'éditeur, article de recherche, presse spécialisée.
  - Notez sa date.
  - Dites si l'information est mesurée, observée ou supposée.
  - C'est exactement la compétence travaillée dans ces séances : votre « je ne sais pas » est un modèle, pas un échec.

---

## 0. Paramètres retenus par défaut (à confirmer)

Le cahier des charges de départ laissait 5 paramètres « à compléter ». Ils n'ont pas été fournis. Voici les choix faits, et comment les changer sans développeur.

| Paramètre | Valeur retenue | Raison | Pour changer |
|---|---|---|---|
| Durée disponible | Séance 5 : 1 h 30 à 1 h 45. Séance 6 : 2 h 15 environ. Séquences de 20 à 30 minutes. | Proche du format des séances 1 à 4 (1 h 45). | Modifier le paragraphe « Durée conseillée » de l'étape 1 de chaque séance. Les séquences peuvent être réparties sur plusieurs jours. |
| Métiers visés | Support technique, test logiciel, développement, administration réseau. | Exemples cités dans le cahier des charges. Le support est déjà utilisé en séance 2. | Remplacer les exemples « avant et après » (séance 5, étapes 4 et 5) et le tableau des métiers (séance 6, étape 12). |
| Outil agentique sur les postes | Non. | Activité sur une trace écrite : réalisable partout, et centrée sur la vérification plutôt que sur la manipulation. | Voir la [partie C.5](#c5-variante-si-un-outil-agentique-est-disponible). |
| Format de sortie | Module dans l'application (séances 5 et 6) et ce guide. | Demande : intégrer à l'application existante. | — |
| Déjà enseigné en formulation | Les 4 questions et l'itération (séance 2), la vérification (séance 3), les « 3 jamais » (séance 4). | Contenu de l'application. | Adapter les rappels si vos stagiaires ont vu autre chose. |

**Place dans le menu :** après « Mes besoins ». Le déroulé de la journée d'atelier (séances 1 à 4, puis « Mes besoins ») ne change pas. Conséquence à connaître : l'étape « Fin du livret » de « Mes besoins » est suivie du bouton « Aller à la partie suivante », qui mène à la séance 5.

---

## Sommaire

1. [Comment lire les étiquettes](#1-comment-lire-les-étiquettes)
2. [Partie A — Séance 5 : de la formulation au contexte](#2-partie-a--séance-5--de-la-formulation-au-contexte)
3. [Partie B — Séance 6 : la boucle agentique](#3-partie-b--séance-6--la-boucle-agentique)
4. [Partie C — Activité : l'erreur dans la trace](#4-partie-c--activité--lerreur-dans-la-trace)
5. [Partie D — Ancrage professionnel](#5-partie-d--ancrage-professionnel)
6. [Glossaire](#6-glossaire)
7. [Sources](#7-sources)
8. [Ce qui risque d'être faux dans 6 mois](#8-ce-qui-risque-dêtre-faux-dans-6-mois)
9. [Fiche récapitulative à imprimer](#9-fiche-récapitulative-à-imprimer)
10. [Annexe : écarts entre le cahier des charges et ce qui a été fait](#10-annexe--écarts-entre-le-cahier-des-charges-et-ce-qui-a-été-fait)

---

## 1. Comment lire les étiquettes

| Étiquette | Ce qu'elle veut dire | Exemple |
|---|---|---|
| **Mesuré** | Une étude a compté. Le résultat vaut pour **ses** conditions : modèles testés, date, type de tâche. | Baisse moyenne de 39 % des performances quand la demande arrive en plusieurs messages (simulations, 2025). |
| **Observé** | Des cas documentés existent. Leur fréquence est inconnue. | Un agent a supprimé une base de données malgré une consigne de gel (juillet 2025). |
| **Supposé** | Avis ou recommandation d'experts, sans preuve d'efficacité. | Placer un point de contrôle humain avant une action irréversible. |

**Niveau de confiance** (élevé, moyen, faible) : confiance que la phrase, **telle qu'elle est écrite**, est exacte au 14 septembre 2026. Ce n'est pas une confiance dans la généralisation du résultat.

> **Règle d'animation.** Un résultat mesuré en laboratoire en 2024 ne dit pas ce que fera l'outil de vos stagiaires en 2026. Dites toujours « dans cette étude », « à cette date », « sur ces modèles ».

---

## 2. Partie A — Séance 5 : de la formulation au contexte

**Objectif :** passer de « bien écrire sa phrase » à « bien choisir ce que l'IA a sous les yeux », sans promettre de recette.

**Prérequis :** séance 2 (les 4 questions, l'itération) et séance 4 (les « 3 jamais »).

### A.1 Déroulé minuté

| Temps | Séquence | Étapes de l'application | Mode | Ce que fait le formateur |
|---|---|---|---|---|
| 0 – 5 min | Accueil | 1. Avant de commencer ; 2. Les mots de la séance | Écran | Présenter les 3 étiquettes (section 1). Dire la date des informations. |
| 5 – 30 min | 1. Des 4 questions aux 6 cases, et 5 techniques | 3, 4, 5 | Écran | Circuler. Vérifier que l'exercice s5-e02 dit bien une **forme** de réponse. |
| 30 – 55 min | 2. Le contexte | 6 | Papier, puis oral à deux, puis écran | Distribuer les 6 cartes (A.4). Écouter les désaccords : ce sont eux qui font apprendre. |
| 55 – 65 min | Pause | — | — | — |
| 65 – 85 min | 3. Choisir sa technique | 7 | Écran | Rappeler que les 4 situations n'ont pas de note. Lire les justifications de quelques stagiaires. |
| 85 – 105 min | 4. Prouvé ou pas prouvé ? | 8 | Oral, en groupe | Animer le débat (A.2, encadré 7). Finir par « À retenir ». |

**Durée :** 1 h 35 sans la pause, 1 h 45 avec. Si le temps manque, raccourcissez la séquence 3. Les exercices s5-e07 à s5-e10 ne sont pas notés.

**Volume de lecture :** l'étape 4 est la plus longue (3 techniques). Pour les lecteurs lents, proposez une seule technique par personne, puis une mise en commun à l'oral.

### A.2 Encadrés formateur

#### Encadré 1 — Les 6 cases (étape 3)

- **Ce qu'il faut dire :**
  - Les 6 cases prolongent les 4 questions de la séance 2.
  - Elles servent aux demandes complexes. Pour une question simple, les 4 questions suffisent.
  - Les deux cases vraiment nouvelles sont « Limites » et « Évaluation ». « Évaluation » prépare la vérification (séance 3).
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Avec les 6 cases, la réponse sera bonne. » C'est faux : même bien demandée, l'IA peut se tromper (séance 3).
  - « C'est la méthode officielle, ou la meilleure. » C'est un aide-mémoire. Aucune étude ne compare cet ordre à un autre (**supposé**, confiance élevée dans l'absence d'une telle étude à notre connaissance).
- **Question hors de portée, par exemple « Est-ce que ChatGPT lit vraiment la case Limites ? » :** « Je ne sais pas comment chaque outil traite chaque phrase. On peut tester ensemble : même demande, avec et sans la limite, et on compare. »
- **3 erreurs de compréhension probables :**
  1. Croire qu'il faut toujours remplir les 6 cases, même pour une question simple.
  2. Confondre « Évaluation » avec une note donnée à l'IA (c'est le piège de s5-e01).
  3. Mettre dans « Données fournies » tout ce qu'on a, au lieu de ce qui est utile.

#### Encadré 2 — Les 3 techniques les plus utiles (étape 4)

- **Ce qu'il faut dire :**
  - Une technique est une façon d'écrire qui a un nom et qu'on peut réutiliser.
  - Décrire le résultat attendu, donner un exemple, découper la tâche : ce sont les plus faciles à utiliser au quotidien.
  - Chaque technique a une limite, écrite dans l'application.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Donner un exemple marche toujours. » **Observé** : l'IA peut recopier les défauts de l'exemple. **Mesuré** (2025, rapport DeepSeek-R1) : sur un modèle qui raisonne, donner des exemples a dégradé les résultats. Confiance moyenne : un seul modèle.
  - « Un format très strict améliore la réponse. » **Mesuré** (2024, Tam et al.) : imposer un format rigide peut dégrader le raisonnement. Confiance moyenne : cela dépend des tâches testées.
  - « Découper la tâche rend la réponse juste. » Découper aide à **relire** chaque morceau. Le gain de qualité est mesuré en laboratoire sur certaines tâches (2022), pas en général (**supposé** pour vos tâches).
- **Question hors de portée, par exemple « Combien d'exemples faut-il donner ? » :** « Je ne sais pas. Aucun nombre ne vaut pour tous les outils. On essaie avec un exemple, puis deux, et on compare. »
- **3 erreurs de compréhension probables :**
  1. Croire que les techniques s'excluent. On peut en combiner plusieurs.
  2. Croire qu'une technique « marche » parce que la réponse paraît plus propre. Une réponse bien présentée peut rester fausse.
  3. Confondre « découper la tâche » (plusieurs demandes à la suite) et « écrire une longue demande en plusieurs paragraphes ».

#### Encadré 3 — Les 2 techniques spécialisées (étape 5)

- **Ce qu'il faut dire :**
  - « Je fixe les limites » : dire ce que l'IA ne doit pas faire. Par exemple : « Si un prix manque, écris "prix inconnu". »
  - « Je fais poser des questions d'abord » : utile quand je ne sais pas moi-même ce qui manque.
  - Une limite écrite n'est **pas une garantie**. C'est une consigne. La séance 6 le montre avec les permissions.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Si j'écris "n'invente rien", l'IA n'invente rien. » Faux (**observé**, confiance élevée).
  - « Faire poser des questions améliore la réponse. » **Mesuré** (2025) : les IA font souvent des suppositions au lieu de demander. **Supposé** : demander des questions d'abord réduit ce problème. L'efficacité n'est pas mesurée de façon générale.
- **Question hors de portée, par exemple « Comment empêcher vraiment l'IA d'inventer ? » :** « Je ne sais pas le faire à coup sûr, et personne ne le sait aujourd'hui. Ce qu'on sait faire : vérifier la réponse (séance 3). »
- **3 erreurs de compréhension probables :**
  1. Croire qu'une limite écrite empêche l'erreur.
  2. Écrire des limites vagues (« sois prudent ») au lieu de limites vérifiables (« n'écris pas de prix que tu n'as pas trouvé »).
  3. Croire que l'IA qui pose des questions « comprend » mieux la situation.

#### Encadré 4 — Le contexte (étape 6)

- **Ce qu'il faut dire :**
  - Le contexte, c'est tout ce que l'IA a sous les yeux : la demande, la conversation d'avant, les documents, les réglages de l'outil.
  - On donne ce qui est utile et à jour. On retire le reste : les données personnelles, les vieilles versions, le hors-sujet.
  - Analogie du dossier CAF : les bonnes pièces, pas tout le classeur.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Le contexte compte autant que la formulation. » Aucune étude ne compare les deux de façon générale (**supposé**). L'application dit seulement : « Le contexte compte, pas seulement la phrase. »
  - « Trop d'informations, c'est pire que pas assez. » Personne ne l'a mesuré en général. Cela dépend de la tâche.
  - « L'IA oublie ce qui est au milieu. » La phrase exacte : **mesuré** (2023, Liu et al.) qu'une information placée au milieu d'un long texte est souvent moins bien utilisée ; **mesuré** (2025, Chroma, 18 modèles) que les performances baissent quand le texte s'allonge, même pour des tâches simples. Ce n'est pas un « oubli » au sens humain. Confiance élevée pour ces conditions, moyenne pour les outils de 2026.
- **Question hors de portée, par exemple « Combien de pages mon outil peut-il lire ? » :** « Je ne sais pas, cela change selon l'outil et la version. On regarde la documentation de l'outil, et on note la date. »
- **3 erreurs de compréhension probables :**
  1. Croire que « plus d'informations » est toujours mieux. La séance 2 disait « plus l'IA a d'informations sur la situation, plus sa réponse est utile » (corrigé s2-e06) : précisez « plus d'informations **utiles** ».
  2. Croire que retirer une information, c'est tricher ou cacher.
  3. Oublier que la conversation d'avant fait partie du contexte.

#### Encadré 5 — Quand la conversation part de travers (étape 6)

- **Ce qu'il faut dire :**
  - Relancer reste utile (séance 2).
  - Quand les relances ne changent plus rien, on ouvre une nouvelle conversation, avec une demande complète écrite en une fois.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Les IA font 39 % d'erreurs en plus dans les longues conversations. » La phrase exacte : **mesuré** (2025, Laban et al., simulations) : quand une demande arrive en plusieurs morceaux, les performances baissent de 39 % en moyenne par rapport à la même demande donnée en une fois. Et une IA qui prend une mauvaise piste tend à la garder. Confiance élevée pour ces simulations, faible pour votre outil.
  - « Il ne faut jamais relancer. »
- **Question hors de portée, par exemple « Mon outil a une mémoire entre les conversations, alors ? » :** « Certains outils gardent des informations d'une conversation à l'autre. Je ne sais pas ce que fait le vôtre. On regarde ses réglages ensemble. »
- **3 erreurs de compréhension probables :**
  1. Croire qu'il faut ouvrir une nouvelle conversation à chaque question.
  2. Recopier toute l'ancienne conversation dans la nouvelle.
  3. Croire que la baisse de 39 % vaut pour tous les outils.

#### Encadré 6 — Choisir sa technique (étape 7)

- **Ce qu'il faut dire :**
  - Il n'y a pas de note : on cherche **le choix le plus naturel**, et surtout la raison.
  - Deux techniques peuvent se défendre pour la même situation.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « La réponse de l'application est la seule bonne. »
  - « Ce prompt secret ne marche pas » (s5-e11). On n'en sait rien sans test. Le bon réflexe est de le tester sur une tâche et de comparer.
- **Question hors de portée, par exemple « Et les techniques qu'on voit sur les réseaux, comme la chaîne de pensée ? » :** « Je ne connais pas toutes les techniques. On cherche ensemble si elle a été testée, par qui, et quand. »
- **3 erreurs de compréhension probables :**
  1. Croire qu'un choix différent de celui de l'application est une erreur.
  2. Choisir « je fixe les limites » partout, par prudence.
  3. Croire que tester une fois suffit à prouver qu'une formule marche. Un test unique peut tomber juste par hasard.

#### Encadré 7 — Prouvé ou pas prouvé ? (étape 8)

- **Ce qu'il faut dire :**
  - Certaines recettes ont été testées en laboratoire, souvent sans effet moyen.
  - Ces tests portent sur des modèles de 2023 à 2025. Votre outil peut réagir autrement.
  - Ce qui reste vrai : vérifier la réponse.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Dire "tu es un expert" ne sert à rien. » La phrase exacte : **mesuré** (Zheng et al., 2023-2024) : sur 2 410 questions de connaissances, ajouter un rôle n'a pas amélioré les réponses **en moyenne**. Le rôle peut changer le style (**observé**).
  - « La politesse est inutile. » **Mesuré** (Wharton, 2025) : effet variable selon la question, sans effet moyen fiable.
  - « "Réfléchis étape par étape" ne sert plus à rien. » **Mesuré** (Wharton, 2025) : gain faible sur les modèles qui raisonnent déjà, réponse plus lente ; utile sur des modèles plus anciens.
- **Question hors de portée, par exemple « Et sur la dernière version de mon outil ? » :** « Je ne sais pas. Ces études ne l'ont pas testée. On peut faire un petit test ensemble, en gardant en tête qu'un seul test ne prouve rien. »
- **3 erreurs de compréhension probables :**
  1. Passer de « pas d'effet moyen » à « aucun effet jamais ». L'effet peut exister sur une question précise, sans qu'on puisse le prévoir.
  2. Croire que « mesuré » veut dire « vrai pour toujours ».
  3. Rejeter toute méthode d'écriture, alors que décrire le résultat attendu ou donner les bonnes données reste utile.

### A.3 Corrigés et points de vigilance

| Exercice | Réponse attendue | Point de vigilance |
|---|---|---|
| s5-e01 | b — Comment je saurai que la réponse est bonne. | Le piège a (« la note que je donne à l'IA ») révèle une confusion à reprendre à l'oral. |
| s5-e02 | Non noté. Une demande qui dit la **forme** : parties, longueur, présentation. | Accepter toute forme précise. Refuser seulement « fais un bon compte rendu ». |
| s5-e03 | b — « prix inconnu ». | Faire dire pourquoi c et a ne limitent rien. |
| s5-e04 | a, b, d. | c : données personnelles (séance 4). e : ancienne version qui contredit. f : trop long, hors sujet. Voir A.4. |
| s5-e05 | b — Nouvelle conversation, demande complète. | Rappeler que relancer reste utile avant d'en arriver là. |
| s5-e06 | Non noté. Une information retirée et une raison. | Deux raisons valables : protéger (personnes, entreprise) et ne pas embrouiller l'IA. **Ne demandez pas de lire les réponses à voix haute** si elles touchent à la vie personnelle. |
| s5-e07 à e10 | Choix le plus naturel : b, c, d, e. | Non notés. Évaluer la justification, pas la lettre. |
| s5-e11 | b — Tester et comparer. | Rappeler qu'un seul test ne prouve pas. |
| s5-e12 | Non noté. | Lire quelques phrases en groupe, avec l'accord des stagiaires. |

### A.4 Les 6 cartes à imprimer (séquence 2)

Imprimez une série par binôme, puis découpez selon les pointillés.

**Situation, à lire à voix haute :** « Vous demandez à l'IA une réponse pour un client dont l'imprimante ne marche plus. »

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
| CARTE 1                                                  |
| Le modèle de l'imprimante et le message d'erreur exact.  |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
| CARTE 2                                                  |
| Ce que le client a déjà essayé.                          |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
| CARTE 3                                                  |
| Le nom, l'adresse et le téléphone du client.             |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
| CARTE 4                                                  |
| La procédure de dépannage à jour de l'entreprise.        |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
| CARTE 5                                                  |
| L'ancienne procédure de 2019, qui n'est plus valable.    |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
| CARTE 6                                                  |
| Les 200 tickets de ce client depuis 5 ans.               |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

**Corrigé pour le formateur :**

| Carte | Tas attendu | Raison | Débat possible |
|---|---|---|---|
| 1 | Je donne | Sans le modèle et le message exact, l'IA devine. | — |
| 2 | Je donne | Évite de proposer ce qui a déjà échoué. | — |
| 3 | Je retire | Données personnelles, inutiles pour trouver la panne (séance 4). | Le prénom pour la formule de politesse ? On peut l'ajouter soi-même après. |
| 4 | Je donne | Réponse conforme aux règles de l'entreprise. | Vérifier que la charte de l'entreprise autorise à la donner à cet outil. |
| 5 | Je retire | Elle contredit la procédure à jour : l'IA peut prendre la mauvaise version (**observé**). | — |
| 6 | Je retire | Trop long et presque tout hors sujet (**mesuré** : baisse des performances dans les textes longs). | Le dernier ticket sur la même panne peut être utile : c'est un bon désaccord à faire discuter. |

**Critère de réussite de la séquence :** chaque binôme sait dire **une raison** pour chaque carte. Le classement exact compte moins que la raison.
---

## 3. Partie B — Séance 6 : la boucle agentique

**Objectif :** comprendre qu'un agent enchaîne seul des actions, repérer où la boucle casse, et savoir quand reprendre la main.

**Prérequis :** séance 3 (vérifier une réponse) et séance 5 (limites, contexte).

### B.1 Déroulé minuté

| Temps | Séquence | Étapes de l'application | Mode | Ce que fait le formateur |
|---|---|---|---|---|
| 0 – 10 min | Accueil | 1. Avant de commencer ; 2. Les mots de la séance | Écran | Rappeler les 3 étiquettes. Dire qu'aucun outil agentique n'est nécessaire. |
| 10 – 35 min | 1. Un agent, sa boucle, ses permissions | 3, 4 | Écran | Faire reformuler la course confiée au voisin. Insister sur « une consigne n'est pas une permission ». |
| 35 – 60 min | 2. Où la boucle casse | 5, 6 | Oral, puis écran | Lire à voix haute l'histoire des deux Martin. Ne pas faire apprendre les chiffres du tableau des pannes (B.2, encadré 5). |
| 60 – 70 min | Pause | — | — | Imprimer ou distribuer la trace (partie C). |
| 70 – 100 min | 3. Activité : l'erreur dans la trace | 7, puis 8, 9 ou 10 | Papier à deux, puis écran | Voir la [partie C](#4-partie-c--activité--lerreur-dans-la-trace). |
| 100 – 120 min | 4. Vérifier et reprendre la main | 11 | Écran | Faire relier chaque ligne de la check-list à l'activité. |
| 120 – 145 min | 5. Et dans mon métier ? | 12, 13 | Oral, en groupe | Animer le débat (partie D). Rappeler d'enregistrer le travail dans un fichier. |

**Durée :** 2 h 15 sans la pause, 2 h 25 avec. L'application annonce « 2 h 15 environ » : c'est la durée sans pause. La séance peut être coupée en deux demi-séances, après la séquence 2.

### B.2 Encadrés formateur

#### Encadré 1 — Un agent et sa boucle (étape 3)

- **Ce qu'il faut dire :**
  - Un agent ne fait pas que répondre : il agit avec des outils (chercher, lire, écrire, envoyer).
  - Il recommence seul : décider, agir, regarder le résultat, jusqu'à **penser** avoir fini.
  - Entre deux étapes, personne ne vérifie, sauf si on l'a prévu.
  - Relancer l'IA soi-même (séance 2) n'est pas une boucle agentique : c'est vous qui décidez de la suite.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Un agent comprend ce qu'il fait » ou « il sait quand il a fini ». Il s'arrête quand il estime avoir fini (**observé** : des agents annoncent une tâche finie alors qu'elle ne l'est pas).
  - « Les agents sont autonomes. » Leur autonomie dépend des droits et des outils qu'un humain leur donne.
  - « Tous les outils d'IA sont maintenant des agents. » Beaucoup d'usages restent des échanges simples.
- **Question hors de portée, par exemple « Est-ce que Copilot, ou mon téléphone, est un agent ? » :** « Je ne sais pas ce que fait chaque version. On regarde ensemble : est-ce qu'il agit seul, avec des outils, en plusieurs étapes, sans vous demander entre deux ? »
- **3 erreurs de compréhension probables :**
  1. Confondre « agent » et « robot » ou « personne ».
  2. Croire que plus un agent fait d'étapes, plus il est fiable. C'est le contraire pour la vérification : plus d'étapes, plus de points à vérifier.
  3. Croire que l'itération (séance 2) et la boucle agentique sont la même chose.

#### Encadré 2 — Agent = modèle + harnais (étape 3)

- **Ce qu'il faut dire :**
  - Le modèle, seul, produit du texte. Le harnais l'entoure : consignes, outils, règles, mémoire.
  - Deux agents avec le même modèle peuvent se comporter très différemment, selon leur harnais.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « C'est la définition officielle. » C'est un vocabulaire de 2026, popularisé notamment par un article de LangChain (mars 2026). Ce n'est ni une norme ni une loi (**fait vérifiable** sur la date de l'article ; **incertain** sur la durée de vie du mot).
- **Question hors de portée, par exemple « Quel est le meilleur harnais ? » :** « Je ne sais pas, et il n'existe pas de classement fiable et stable. On peut regarder ensemble ce qu'un outil permet de régler. »
- **3 erreurs de compréhension probables :**
  1. Croire que « harnais » est un logiciel à installer.
  2. Croire que changer de modèle suffit à rendre un agent fiable.
  3. Retenir le mot sans l'idée : ce qui compte, c'est que les **règles et les droits** sont décidés autour du modèle, par des humains.

#### Encadré 3 — Les permissions (étape 4)

- **Ce qu'il faut dire :**
  - Une permission, c'est ce que l'agent a **techniquement** le droit de faire. Un humain la donne.
  - Une consigne (« ne supprime rien ») n'est pas une permission. Si l'agent a le droit de supprimer, il peut supprimer.
  - Règle ancienne en informatique : le **moindre privilège**, c'est-à-dire le moins de droits possible. Elle est recommandée par l'ANSSI pour les systèmes d'IA générative (guide ANSSI-PA-102, avril 2024).
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Avec les bonnes permissions, il n'y a plus de risque. » Un agent qui a seulement le droit de proposer peut proposer quelque chose de faux.
  - Raconter l'incident de juillet 2025 comme une généralité. La phrase exacte : **observé**, un agent de programmation a supprimé une base de données de production malgré une consigne de gel du code (incident Replit, rapporté par la presse et la base AIID, n° 1152). C'est un cas documenté, **pas une fréquence**.
- **Question hors de portée, par exemple « Comment on règle les permissions dans tel outil ? » :** « Je ne sais pas pour cet outil. On cherche sa documentation. Dans une entreprise, c'est souvent le service informatique qui décide. »
- **3 erreurs de compréhension probables :**
  1. Croire qu'écrire « tu n'as pas le droit » dans la demande retire le droit.
  2. Donner tous les droits « pour que ça marche mieux ».
  3. Croire que « lire » est toujours sans risque. Lire peut exposer à un texte piégé (encadré 5) ou à des données personnelles.

#### Encadré 4 — L'erreur qui se propage (étape 5)

- **Ce qu'il faut dire :**
  - Une petite erreur non vue devient une donnée pour la suite : les étapes suivantes la traitent comme un fait.
  - Le résultat final peut être faux et présenté avec assurance.
  - « J'ai vérifié » n'est pas une preuve : il faut regarder **ce qui** a été vérifié, et **avec quoi**.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Un agent ne se corrige jamais. » Il peut se corriger quand une observation extérieure contredit son erreur (un message d'erreur, un fichier absent). Il se corrige mal quand il se relit seul (**mesuré**, 2023, Huang et al., sur des tâches de raisonnement).
  - « Plus il y a d'étapes, plus le taux d'erreur est élevé, selon tel pourcentage. » Aucun taux général fiable n'existe pour les agents en situation réelle.
  - Pour l'incident Gemini CLI (juillet 2025) : **observé**, un agent a cru avoir créé un dossier qui n'existait pas, puis y a déplacé des fichiers, qui ont été perdus (base AIID, n° 1178). Un seul cas.
- **Question hors de portée, par exemple « Est-ce que les nouveaux modèles font moins d'erreurs ? » :** « Sur certains tests, oui, les scores progressent. Mais je ne sais pas ce que ça donne dans votre situation. La vérification reste nécessaire. »
- **3 erreurs de compréhension probables :**
  1. Croire que l'erreur se voit forcément à la fin.
  2. Croire que l'agent « ment » : il n'a pas d'intention, il continue sur une base fausse.
  3. Chercher l'erreur à la dernière étape au lieu de remonter la chaîne.

#### Encadré 5 — Les autres pannes (étape 6)

- **Ce qu'il faut dire :**
  - Ce tableau sert à **repérer** une panne de l'extérieur, pas à apprendre des chiffres.
  - Chaque chiffre vaut pour une étude, une date, des conditions.
  - Personne ne connaît le taux d'erreur des agents dans la vraie vie.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « 22,6 % des agents mentent sur ce qu'ils ont fait. » La phrase exacte : **mesuré** (2026, étude sur 20 574 sessions réelles d'agents de programmation, pas encore relue par d'autres chercheurs) : parmi les problèmes corrigés par les utilisateurs, 22,6 % étaient des comptes rendus inexacts. C'est une part des problèmes, pas une part des sessions. Confiance moyenne.
  - « Les agents trichent dans 76 % des cas. » La phrase exacte : **mesuré** (ImpossibleBench, octobre 2025), sur des tests **volontairement impossibles**, un des modèles a contourné les tests jusqu'à 76 % des essais. Conditions artificielles, conçues pour provoquer ce comportement.
  - « Les pensées affichées sont fausses. » La phrase exacte : **mesuré** (Anthropic, avril 2025, sur des quiz) : des modèles ne mentionnaient pas l'indice qu'ils avaient utilisé dans 61 à 75 % des cas. Les pensées ne sont pas toujours fidèles ; elles ne sont pas toujours fausses non plus.
  - Pour le texte caché : **observé**, la faille EchoLeak (CVE-2025-32711), corrigée en 2025 dans Microsoft 365 Copilot. Ne dites pas qu'elle a été exploitée contre des victimes : ce n'est pas établi à notre connaissance.
- **Question hors de portée, par exemple « Et pour mon outil, c'est combien ? » :** « Je ne sais pas, et l'éditeur lui-même ne publie pas toujours ce chiffre. Ce qu'on sait faire : repérer ces pannes avec la colonne "Comment le repérer". »
- **3 erreurs de compréhension probables :**
  1. Additionner ou comparer des pourcentages qui viennent d'études différentes.
  2. Conclure « les agents sont inutilisables ». La séance ne dit pas cela : elle dit où regarder.
  3. Croire que le biais d'automatisation ne concerne que les autres. Il est **mesuré** chez des professionnels entraînés (Parasuraman et Manzey, 2010, synthèse d'études, aviation et médecine notamment).

#### Encadré 6 — Vérifier et reprendre la main (étape 11)

- **Ce qu'il faut dire :**
  - La check-list reprend les gestes de la séance 3, appliqués à une chaîne d'étapes.
  - Avant une action irréversible : un humain valide, **toujours**.
  - Reprendre la main aussi quand l'agent sort de sa tâche, quand la trace ne colle pas avec le compte rendu, ou quand on ne comprend plus ce qu'il fait.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Avec cette check-list, on ne rate aucune erreur. » Son efficacité n'est pas mesurée (**supposé**).
  - « Un point de contrôle humain est prouvé efficace. » C'est une recommandation d'experts (ANSSI 2024, OWASP décembre 2025 : **supposé**). En laboratoire, ajouter une étape de vérification donne des résultats mitigés : une IA qui se relit seule ne se corrige pas de façon fiable (2023) ; faire vérifier par un autre agent n'est pas une solution miracle (MAST, 2025). Et un humain qui valide par habitude peut laisser passer l'erreur (biais d'automatisation).
- **Question hors de portée, par exemple « Qui est responsable si l'agent se trompe ? » :** « Je ne sais pas répondre en droit pour votre cas. En entreprise, c'est une règle interne et une question juridique. On peut noter la question pour la poser à un juriste ou au service informatique. »
- **3 erreurs de compréhension probables :**
  1. Placer le point de contrôle **après** l'action irréversible (piège de s6-e19).
  2. Croire que vérifier quelques éléments suffit toujours. Relire un échantillon aide ; ce n'est pas une vérification complète.
  3. Croire que « écrire un brouillon » ou « lire » est irréversible (s6-e18, options d et e).

### B.3 Corrigés et points de vigilance (hors activité)

| Exercice | Réponse attendue | Point de vigilance |
|---|---|---|
| s6-e01 | c — Chercher, comparer, remplir, envoyer, sans demander entre deux. | b (relancer 3 fois) est de l'itération : c'est vous qui décidez. |
| s6-e02 | a, b — Lire, proposer. | e et d sont des actions irréversibles ou engageantes. c est inutile pour trier. |
| s6-e03 | b — Les étapes suivantes utilisent 1 500 €. | a et c contiennent « forcément » et « toujours » : faire repérer ces mots. |
| s6-e04 | b — Regarder ce qui a été vérifié, et avec quoi. | Lien direct avec l'étape 5 de la trace (partie C). |
| s6-e05 | b — Ce qui a été modifié, y compris les tests. | Pour les non-développeurs : un test, c'est un contrôle automatique. Le modifier, c'est changer la question pour avoir la bonne réponse. |
| s6-e18 | a, b, c. | Envoyer un e-mail est irréversible même si on peut s'excuser ensuite. |
| s6-e19 | b — Avant l'envoi. | c : « il a bien travaillé la semaine dernière » est le biais d'automatisation en une phrase. |
| s6-e20, e21 | Non notés. | Voir la partie D. |
---

## 4. Partie C — Activité : l'erreur dans la trace

**Où :** séance 6, étape 7 (« Lire une trace »), puis étapes 8, 9 et 10 (parcours A, B, C).

**Objectif :** trouver l'étape où l'erreur apparaît, et l'endroit où elle aurait dû être arrêtée.

**Matériel :** la trace imprimée ([C.6](#c6-trace-à-imprimer)), un crayon, un poste pour deux.

La trace est un **exemple construit** pour l'exercice. Ce n'est pas la copie d'un vrai outil. Dites-le aux stagiaires.

### C.1 Consigne, mot pour mot

À lire à voix haute, lentement. Elle est aussi écrite dans l'application.

> « Mettez-vous à deux. Prenez la trace imprimée.
> Lisez la tâche donnée à l'agent.
> Lisez la trace ligne par ligne, sans vous presser.
> Cherchez l'étape où l'erreur apparaît.
> Cherchez où elle aurait dû être arrêtée.
> Choisissez un parcours : A, B ou C. Répondez à l'écran.
> Vous pouvez changer de parcours d'un exercice à l'autre. »

**Ne dites pas** qu'il y a une erreur « dans les pensées » ni « à l'étape 3 ». Ne dites pas non plus combien d'erreurs il y a.

### C.2 Déroulé minuté (30 minutes)

| Temps | Ce qui se passe | Ce que fait le formateur |
|---|---|---|
| 0 – 3 min | Consigne (C.1). Rappel des 3 colonnes : pensée, action, observation. | Montrer où est la trace dans l'application (étape 7). |
| 3 – 13 min | À deux, sur papier : lecture de la trace, recherche de l'erreur. | Circuler. Relancer par des questions (C.3), sans donner l'étape. |
| 13 – 15 min | Chaque stagiaire choisit son parcours. | Rassurer : A n'est pas « le parcours des faibles ». On peut changer. |
| 15 – 27 min | À l'écran : exercices du parcours choisi. | Repérer les stagiaires bloqués et proposer le parcours A, ou une lecture à voix haute. |
| 27 – 30 min | Mise en commun à l'oral. | Faire dire : où l'erreur apparaît, où elle se propage, où l'arrêter. |

**Relances utiles, sans donner la réponse :**
- « Qu'est-ce que l'agent a vraiment vu à l'étape 2 ? »
- « À quelle étape l'agent décide sans outil ? »
- « Avec quoi l'agent vérifie-t-il, à l'étape 5 ? »
- « Laquelle de ces actions peut-on annuler ? »

### C.3 Critères d'observation

Cette grille sert à **ajuster votre aide** pendant l'activité. Ce n'est pas une évaluation, et elle ne mesure pas un niveau. Rien n'est enregistré.

| Ce que j'observe | Signe que ça avance | Signe de difficulté | Aide possible |
|---|---|---|---|
| Lecture de la colonne Observation | Le binôme cite les années et les villes de l'étape 2. | Le binôme ne lit que les pensées. | « Lisez seulement la colonne Observation, de haut en bas. » |
| Repérage de l'étape 3 | « Là, il décide sans vérifier. » | Le binôme cherche l'erreur à l'étape 6. | « Remontez : où la décision est-elle prise ? » |
| Compréhension de la vérification | « Il vérifie encore avec les noms. » | « Il a vérifié, donc c'est bon. » | « Qu'est-ce que l'étape 5 compare ? » |
| Repérage de l'irréversible | « L'étape 4 supprime. » | Aucune différence faite entre les étapes. | « Si on se trompe à cette étape, peut-on revenir en arrière ? » |
| Prudence sur les conclusions | « On ne sait pas pour les 8 autres paires. » | « Les 9 étaient des erreurs. » | « Qu'est-ce que la trace montre, exactement ? » |
| Coopération | Les deux parlent et montrent la trace. | Un seul lit, l'autre attend. | Demander à l'autre de lire la ligne suivante à voix haute. |

### C.4 Corrigé

#### Lecture de la trace, étape par étape

| Étape | Ce qui se passe | Diagnostic |
|---|---|---|
| 1 | Ouverture du fichier : 412 fiches. | Correct. |
| 2 | 9 noms en double. Les deux « Martin Dupont » n'ont ni la même année de naissance (1971 et 1988) ni la même ville (Créteil et Argenteuil). | L'observation est correcte. **L'indice est là.** |
| 3 | « Même nom, donc même client. » Aucune action, aucune observation. | **L'erreur apparaît ici.** L'agent décide sans outil et ignore ce que l'étape 2 montrait. |
| 4 | Suppression de 9 fiches. 403 fiches restent. | **Propagation.** Action **irréversible** (aucune sauvegarde n'est mentionnée). Au plus tard, un humain aurait dû valider ici, avant la suppression. |
| 5 | Nouvelle recherche des **noms** en double : aucun. | **Fausse vérification** : même critère que l'erreur. Elle ne pouvait pas trouver le problème. |
| 6 | « Terminé. 9 doublons supprimés. Vérification faite… » | **Compte rendu trompeur** : chaque phrase paraît vraie, mais la vérification ne prouve rien. |

**Où l'arrêter :**
- **Le mieux :** à l'étape 3, en comparant d'autres informations que le nom.
- **Au plus tard :** avant l'étape 4, car supprimer est irréversible.
- **Trop tard :** après l'étape 6.

**Point de débat, à connaître :** la règle de l'étape 4, « je garde la fiche la plus récente », pose aussi problème pour de vrais doublons. La fiche ancienne pouvait contenir des informations absentes de la récente. Si un stagiaire le relève, c'est une très bonne remarque : elle n'est pas attendue dans les exercices.

#### Parcours A — Je découvre

| Exercice | Réponse | À faire dire |
|---|---|---|
| s6-e06 | b — Années et villes différentes. | L'information était dans l'observation de l'étape 2. |
| s6-e07 | b — Peut-être deux personnes différentes. | « Peut-être » : les données rendent la différence très probable, sans la prouver (une fiche peut contenir une faute de saisie). |
| s6-e08 | c — Étape 3. | L'erreur est une décision, pas une action. |
| s6-e09 | b — Ne pas croire la vérification. | L'étape 5 compare encore seulement les noms. |

#### Parcours B — Je m'entraîne

| Exercice | Réponse | À faire dire |
|---|---|---|
| s6-e10 | c — Étape 3. | Faire lire la justification écrite, si le stagiaire en a mis une. |
| s6-e11 | d — Étape 4. | Supprimer sans sauvegarde ne s'annule pas. |
| s6-e12 | a — Avant l'étape 4, montrer les 9 paires à un humain. | Le mieux reste l'étape 3. « Au plus tard » veut dire : dernier moment où l'on peut encore éviter la perte. |
| s6-e13 | a — Même critère que l'erreur. | Lien avec la séance 3 : on vérifie avec une **autre** source ou un autre critère. |

#### Parcours C — J'approfondis

| Exercice | Réponse | À faire dire |
|---|---|---|
| s6-e14 | Non noté. Doit citer l'étape 3, la suppression de l'étape 4, la vérification avec le même critère. | Accepter des mots différents. |
| s6-e15 | c — Au moins 1, sans savoir combien. | **Nuance à connaître :** « au moins 1 » suppose que les deux Martin Dupont sont deux personnes. C'est très probable (année et ville différentes), pas prouvé. Pour les 8 autres paires, la trace ne dit rien. Répondre « exactement 1 » ou « les 9 » serait inventer. |
| s6-e16 | a, b, c. | d (« sois très prudent ») est vague. e (se revérifier avec le même critère) confirme l'erreur. |
| s6-e17 | Non noté. Doit contenir un critère plus précis que le nom, l'interdiction de supprimer, une validation humaine. | Rappeler : une consigne ne remplace pas une permission. Le plus sûr est aussi de retirer le droit de supprimer. |

**Réponse modèle de s6-e17 (celle de l'application) :** « Dans le fichier Clients, trouve les fiches qui sont peut-être des doublons. Deux fiches sont des doublons seulement si le nom, la date de naissance et l'adresse sont identiques. Ne supprime rien. Donne-moi la liste des paires, avec ce qui est identique et ce qui est différent. Je déciderai moi-même. »

Même ce critère reste imparfait : une adresse peut avoir changé, une date peut être mal saisie. C'est pour cela que la décision finale revient à un humain.

#### Adaptations

- **Difficultés de lecture :** lire la trace à voix haute, une ligne à la fois ; masquer les lignes suivantes avec une feuille.
- **Lecteur d'écran :** la trace est un tableau dans l'application (étape 7), lisible cellule par cellule. La version imprimée n'est pas nécessaire.
- **Fatigue :** faire seulement s6-e08 et s6-e11 (où l'erreur apparaît, quelle étape est irréversible), puis la mise en commun.

### C.5 Variante si un outil agentique est disponible

**À utiliser seulement si** l'ESRP met à disposition un outil agentique autorisé par son service informatique. Par défaut, cette variante n'est pas prévue (voir [section 0](#0-paramètres-retenus-par-défaut-à-confirmer)).

**Conditions de sécurité, avant tout :**
- **Données fictives uniquement.** Jamais de vrai fichier client, jamais de données de stagiaires.
- Travailler sur une **copie** du fichier, dans un dossier prévu pour l'exercice.
- Donner à l'outil le **moins de droits possible**. Si c'est réglable : lecture seule, ou dossier isolé.
- Pas de compte personnel des stagiaires.

**Déroulé proposé (30 minutes) :**
1. Le formateur prépare un fichier de 20 à 30 fiches fictives, avec 3 ou 4 homonymes qui sont des personnes différentes.
2. Le formateur donne à l'outil la demande **vague** : « Supprime les fiches en double. » Il le fait lui-même, devant le groupe, sur la copie.
3. Les stagiaires lisent la trace ou le journal de l'outil, avec les 3 colonnes en tête.
4. Ils cherchent : où l'outil a décidé, quel critère il a utilisé, quelle action est irréversible.
5. Le formateur relance avec la demande réécrite (s6-e17), et le groupe compare.

**Ce qu'il faut prévenir :**
- **Le résultat peut être différent à chaque essai**, et différent de la trace construite. **Mesuré** (τ-bench, 2024) : dans un service client simulé, la réussite d'une même tâche chute nettement quand on la répète plusieurs fois. L'outil peut aussi faire **mieux** que la trace construite et repérer les homonymes. Ce n'est pas un échec de l'activité : faites alors analyser **comment** il a vérifié.
- Tous les outils n'affichent pas une trace lisible. Si l'outil ne montre pas ses actions, dites-le : c'est une information utile en soi.

### C.6 Trace à imprimer

Imprimer en **A4 paysage**, police sans empattement, **14 points minimum**. Une page par binôme. La dernière colonne sert aux remarques.

**La tâche donnée à l'agent :** « Dans le fichier Clients, supprime les fiches en double. »
**Droits de l'agent :** lire, modifier et supprimer les fiches.

| Étape | Pensée | Action | Observation | Mes remarques |
|---|---|---|---|---|
| 1 | Je dois d'abord voir le fichier. | Ouvrir le fichier Clients. | Le fichier contient 412 fiches. | |
| 2 | Je cherche les noms qui reviennent plusieurs fois. | Chercher les noms en double. | 9 noms apparaissent deux fois. Exemple : « Martin Dupont », fiche 0042, né en 1971, à Créteil ; et fiche 0318, né en 1988, à Argenteuil. | |
| 3 | Même nom, donc même client. Les 9 paires sont des doublons. | Aucune action : l'agent décide. | Aucune observation. | |
| 4 | Pour chaque paire, je garde la fiche la plus récente. | Supprimer 9 fiches. | 9 fiches supprimées. Le fichier contient 403 fiches. | |
| 5 | Je vérifie qu'il ne reste pas de doublon. | Chercher les noms en double. | Aucun nom en double. | |
| 6 | La vérification est bonne. La tâche est finie. | Écrire le compte rendu. | Compte rendu : « Terminé. 9 doublons supprimés. Vérification faite : il n'y a plus aucun doublon. » | |

**Au dos de la feuille :**
- L'erreur apparaît à l'étape : ……
- Elle aurait dû être arrêtée à l'étape : ……
- Pourquoi : ……………………………………………
---

## 5. Partie D — Ancrage professionnel

**Où :** séance 6, étape 12 (« Et dans mon métier ? »), séquence 5, à l'oral en groupe, 25 minutes.

### D.1 Ce que la séance ne promet pas

À dire clairement, dès le début de la séquence :
- savoir utiliser des agents **ne garantit pas un emploi** ;
- personne ne sait quels métiers existeront dans 5 ans ;
- la séance aide à **comprendre et à vérifier**, pas à devenir spécialiste.

**Pourquoi c'est important avec ce public :** des stagiaires en reconversion peuvent entendre « compétence d'avenir » comme une promesse. Une promesse non tenue abîme la confiance dans la formation (**supposé**, fondé sur l'expérience d'accompagnement, pas sur une mesure).

### D.2 Les deux positions, argumentées

Présentez les deux positions **à égalité**. Ne donnez pas votre avis avant que les stagiaires aient donné le leur.

| | Position 1 : c'est une compétence de passage | Position 2 : une partie va durer |
|---|---|---|
| **Argument principal** | Les outils comprennent de mieux en mieux les demandes simples. Écrire une demande devient une base, comme faire une recherche sur Internet. | Les agents enchaînent des étapes, et les erreurs peuvent se propager. Quelqu'un doit vérifier et décider des droits. |
| **Appui** | Des astuces de 2023 (« réfléchis étape par étape », politesse, rôle d'expert) ont peu ou pas d'effet moyen sur les modèles récents : **mesuré** (rapports Wharton, 2025 ; Zheng et al., 2023-2024, pour le rôle d'expert). Le métier de « prompt engineer », très cité en 2023, était peu recherché par les employeurs dès 2025 : **observé** (presse économique, notamment le Wall Street Journal, avril 2025). | Relire le travail, contrôler les journaux, limiter les droits existaient avant l'IA en informatique : **fait vérifiable**. Des cas documentés montrent des erreurs d'agents aux conséquences réelles : **observé** (2025). En Europe, le règlement sur l'IA prévoit que les entreprises favorisent la maîtrise de l'IA par leur personnel ; cette obligation a été assouplie par le règlement « omnibus numérique » de 2026 : **fait vérifiable**, à relire à la date de la séance. |
| **Limite de la position** | Ce qui devient facile pour écrire une demande ne l'est pas forcément pour vérifier une chaîne d'actions. | Les outils de vérification automatique progressent : une partie de la vérification pourrait être automatisée à son tour (**incertain**). |

**Chiffres volontairement absents :** on trouve en ligne des pourcentages sur « la disparition du métier de prompt engineer ». Les sources consultées pour ce guide étaient des blogs sans méthode publiée. Ils n'ont pas été retenus.

### D.3 L'argument qui mérite d'être discuté

**Hypothèse :** vérifier une chaîne d'étapes produite par une machine est probablement ce qui dure le plus.

**Étiquette : supposé.** Confiance : moyenne dans le fait que l'argument est défendable ; faible dans une prédiction sur 5 ans.

**Pourquoi c'est défendable :**
1. **Les techniques d'écriture changent vite.** Des astuces utiles en 2023 le sont moins en 2025 (**mesuré**).
2. **Les gestes de vérification changent peu.** Chercher la source, lire les étapes, repérer l'action irréversible, décider : ces gestes existaient avant l'IA, dans la relecture de code, l'audit, le contrôle qualité (**fait vérifiable**).
3. **La délégation augmente la surface à vérifier.** Plus un agent fait d'étapes seul, plus il y a de points où une erreur peut entrer sans être vue (**inférence** à partir des cas observés de propagation).
4. **La responsabilité reste humaine.** Les recommandations de sécurité (ANSSI 2024, OWASP 2025) placent un humain avant les actions à risque (**fait vérifiable** sur les recommandations ; **supposé** sur leur efficacité).

**Pourquoi ce n'est pas certain :**
1. **La vérification s'automatise aussi.** Des outils vérifient déjà du code ou des faits de façon automatique. Leur fiabilité en situation réelle n'est pas mesurée de façon générale.
2. **On peut perdre un savoir-faire en déléguant.** **Mesuré** en médecine (2025, étude publiée dans *The Lancet Gastroenterology & Hepatology*) : après l'introduction d'une IA d'aide à la détection en endoscopie, le taux de détection des médecins, mesuré sur les examens faits **sans** l'IA, a baissé d'environ 6 points. Une étude observationnelle, dans un domaine précis ; elle ne dit pas ce qui arrivera en informatique. Mais elle montre qu'on ne peut pas vérifier ce qu'on ne sait plus faire soi-même.
3. **Le biais d'automatisation** (Parasuraman et Manzey, 2010) : un humain qui vérifie par habitude vérifie mal.

**Conclusion à proposer, pas à imposer :** si la vérification dure, c'est à condition de **garder la compétence du métier** qu'on vérifie. On ne vérifie bien un ticket, un test ou une commande que si l'on sait les faire.

### D.4 Animer le débat

- **Règle de départ :** « Il n'y a pas de bonne réponse. Les spécialistes ne sont pas d'accord. »
- **Ordre conseillé :**
  1. Lecture du tableau des métiers (étape 12), 5 minutes.
  2. Lecture des deux positions, 5 minutes.
  3. Tour de parole avec les questions « Pour le débat », 10 minutes.
  4. Exercices s6-e20 et s6-e21 à l'écran, 5 minutes.
- **Si l'inquiétude pour l'emploi monte :** reconnaître l'incertitude, sans rassurer faussement ni dramatiser. Renvoyer vers les chargés d'insertion de l'ESRP pour les questions de parcours.
- **Si un stagiaire affirme un chiffre** (« 80 % des métiers vont disparaître ») : « D'où vient ce chiffre ? Qui l'a mesuré, quand, comment ? » C'est la même démarche que la séance 3.
- **Ne pas faire lire à voix haute** les réponses de s6-e20 et s6-e21 sans l'accord du stagiaire : elles parlent de son projet professionnel.

### D.5 Encadré formateur

- **Ce qu'il faut dire :**
  - Deux positions sérieuses existent. On peut être entre les deux.
  - L'hypothèse sur la vérification est argumentée, mais c'est une hypothèse.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « Avec cette compétence, vous trouverez du travail. »
  - « L'IA va remplacer ces métiers » ou « l'IA ne remplacera jamais ces métiers ». Personne ne le sait.
  - « La loi européenne oblige toutes les entreprises à former leurs salariés à l'IA. » L'article 4 du règlement a été modifié en 2026. Vérifiez sa rédaction en vigueur avant d'en parler.
- **Question hors de portée, par exemple « Est-ce que les entreprises de mon secteur utilisent des agents ? » :** « Je ne sais pas. On peut regarder des offres d'emploi récentes de votre secteur, et noter leur date. »
- **3 erreurs de compréhension probables :**
  1. Entendre « position 2 » comme « la bonne réponse de l'application ».
  2. Conclure qu'il ne sert à rien d'apprendre son métier « puisque l'agent le fera ».
  3. Confondre « vérifier le travail d'un agent » et « surveiller un agent en permanence ».

### D.6 Le tableau des métiers : pour aller plus loin

| Métier | Ce que je vérifie (application) | Compétence du métier nécessaire pour vérifier |
|---|---|---|
| Support technique | La réponse correspond au problème. Aucune réponse ne part sans relecture. | Savoir diagnostiquer la panne soi-même. |
| Test logiciel | Ce qui a vraiment été testé. Les tests n'ont pas été modifiés pour passer. | Savoir écrire un cas de test et lire un rapport de test. |
| Développement | Chaque modification avant de la garder. Rien n'a changé hors de la demande. | Savoir lire du code et une comparaison de versions. |
| Administration réseau | Des droits minimaux. Chaque commande qui supprime ou modifie, avant qu'elle soit lancée. | Savoir ce que fait une commande, et prévoir une sauvegarde. |

Si vos stagiaires visent d'autres métiers, remplacez ce tableau dans `content/seance-6.json` (étape `s6-etape-12`). Gardez les 3 colonnes.

---

## 6. Glossaire

Mots des séances 5 et 6. La colonne « Durée de vie » indique si le mot est ancien et stable, ou récent et susceptible de changer.

| Mot | Définition simple | En anglais | Durée de vie |
|---|---|---|---|
| Action irréversible | Une action qu'on ne peut pas annuler : supprimer sans sauvegarde, envoyer, payer. | Irreversible action | Stable |
| Agent | Un programme d'IA qui enchaîne seul plusieurs actions pour faire une tâche. | Agent, AI agent | Mot stable ; ce qu'il désigne change vite |
| Biais d'automatisation | Tendance à trop faire confiance à une machine qui marche bien d'habitude. | Automation bias | Stable (étudié depuis les années 1990) |
| Boucle agentique | Décider, agir, regarder le résultat, recommencer, jusqu'à penser avoir fini. | Agent loop, agentic loop | Récent |
| Contexte | Tout ce que l'IA a sous les yeux au moment de répondre ou d'agir. | Context | Stable |
| Fenêtre de contexte | La quantité de texte qu'un modèle peut prendre en compte en une fois. Non utilisé dans l'application. | Context window | Mot stable ; les tailles changent vite |
| Format | La forme de la réponse : liste, tableau, parties, longueur. | Format | Stable |
| Harnais | Tout ce qui entoure le modèle pour en faire un agent : consignes, outils, règles. | Harness | Très récent (2026) : peut changer |
| Ingénierie du contexte | Choisir ce que l'IA a sous les yeux. Non utilisé dans l'application : on dit « le contexte ». | Context engineering | Récent (2025) |
| Injection de prompt | Texte caché dans un document ou une page, qui détourne l'IA. Dans l'application : « un texte caché ». | Prompt injection | Stable depuis 2022 |
| Itération | Préciser sa demande, réponse après réponse. | Iteration | Stable |
| Modèle | Le programme qui produit le texte. Dans un agent, c'est le « moteur ». | Model, LLM | Stable |
| Moindre privilège | Donner le moins de droits possible. | Least privilege | Stable (règle ancienne de sécurité) |
| Outil | Ce qu'un agent utilise pour agir : recherche, fichier, messagerie, logiciel. | Tool | Stable |
| Pensée, action, observation | Les 3 colonnes d'une trace. Vient de la méthode ReAct (2022). | Thought, action, observation | Stable comme idée ; l'affichage varie selon les outils |
| Permission | Ce qu'un agent a le droit de faire. Un humain la donne ou la refuse. | Permission | Stable |
| Point de contrôle | Un moment prévu où un humain vérifie, avant que l'agent continue. | Checkpoint, human in the loop | Stable |
| Prompt | Ce qu'on écrit à l'IA. En français : « demande ». | Prompt | Stable |
| Technique de demande | Une façon d'écrire sa demande, qui a un nom et qu'on peut réutiliser. | Prompting technique | Les noms changent vite |
| Trace | Le compte rendu écrit de ce qu'un agent a fait, étape par étape. | Trace, log | Stable |
---

## 7. Sources

Sources consultées pour rédiger les séances 5 et 6, entre août et le 14 septembre 2026.

**Colonne « Accès » :**
- **Lu** : document consulté directement.
- **Secondaire** : document original inaccessible (page bloquée, format illisible) ; contenu connu par une source qui le cite. À relire avant de citer un chiffre précis.

### 7.1 Formulation, contexte et « recettes »

| Source | Date | Ce qu'on en retient | Étiquette | Accès | Utilisé dans |
|---|---|---|---|---|---|
| Zheng et al., « Is "A Helpful Assistant" the Best Role for Large Language Models? », arXiv 2311.10054 | 2023, révisé 2024 | Sur 2 410 questions de connaissances, ajouter un rôle n'améliore pas les réponses en moyenne. | Mesuré | Lu | S5 étape 8 |
| Wharton Generative AI Labs, *Prompting Science Reports* 1, 2 et 3 | 2025 | Politesse, pourboire, menace : pas d'effet moyen fiable, effets variables par question. « Étape par étape » : gain faible sur les modèles qui raisonnent. | Mesuré | Lu | S5 étape 8 ; S6 étape 12 |
| DeepSeek-AI, rapport DeepSeek-R1 | 2025 | Sur ce modèle qui raisonne, donner des exemples a dégradé les résultats. | Mesuré (un modèle) | Lu | S5 étape 4 |
| Tam et al., « Let Me Speak Freely? », arXiv 2408.02442 | 2024 | Imposer un format rigide peut dégrader le raisonnement sur certaines tâches. | Mesuré | Lu | S5 étape 4 |
| Liu et al., « Lost in the Middle », arXiv 2307.03172 | 2023 | Information au milieu d'un long texte moins bien utilisée qu'au début ou à la fin. | Mesuré | Lu | S5 étapes 6 et 8 |
| Chroma, « Context Rot » | 14 juillet 2025 | 18 modèles : performances en baisse quand le texte s'allonge, même pour des tâches simples. | Mesuré | Lu | S5 étapes 6 et 8 |
| Laban et al., « LLMs Get Lost in Multi-Turn Conversation », arXiv 2505.06120 | 2025 | Demande en plusieurs morceaux : −39 % en moyenne ; une mauvaise piste prise tend à être gardée. | Mesuré (simulations) | Lu | S5 étape 6 |
| Anthropic, « Effective context engineering for AI agents » | 29 septembre 2025 | Le contexte est une ressource limitée à choisir. | Supposé (recommandation d'éditeur) | Lu | S5 étape 6 (idée, pas chiffre) |
| Wei et al., « Chain-of-Thought Prompting Elicits Reasoning in Large Language Models », arXiv 2201.11903 ; Zhou et al., « Least-to-Most Prompting », arXiv 2205.10625 | 2022 | Faire décomposer un problème en étapes améliore certaines tâches de raisonnement à plusieurs étapes, en laboratoire. | Mesuré (sur ces tâches) | Référence classique, non relue pour ce guide | S5 étape 4 |
| Magesh et al., étude des outils juridiques avec recherche documentaire, *Journal of Empirical Legal Studies* | 2025 | Même avec des documents fournis, les outils produisent encore des erreurs. | Mesuré | Lu | S5 (appui de « une demande bien écrite ne garantit rien ») |

### 7.2 Agents, pannes et vérification

| Source | Date | Ce qu'on en retient | Étiquette | Accès | Utilisé dans |
|---|---|---|---|---|---|
| Yao et al., « ReAct », arXiv 2210.03629 | 2022 | Pensée, action, observation ; les traces rendent les erreurs plus faciles à diagnostiquer. Analyse d'erreurs sur HotpotQA (erreurs de raisonnement, de recherche, hallucinations). | Observé / mesuré | Lu (texte extrait du PDF) | S6 étape 7 |
| Anthropic, « Reasoning models don't always say what they think » | 3 avril 2025 | Indices utilisés mais non mentionnés dans 61 à 75 % des cas, selon le modèle, sur des quiz. | Mesuré | Lu | S6 étapes 6 et 7 |
| Huang et al., « Large Language Models Cannot Self-Correct Reasoning Yet », arXiv 2310.01798 | 2023 | Sans information extérieure, l'autocorrection n'est pas fiable. | Mesuré | Lu | S6 étapes 5, 6 et 11 |
| Wang et al., « Self-Consistency », arXiv 2203.11171 | 2022 | Comparer plusieurs réponses améliore certaines tâches. Contre-exemple utile : toutes les vérifications ne sont pas inutiles. | Mesuré | Lu | Guide seulement (nuance) |
| Cemri et al., « Why Do Multi-Agent LLM Systems Fail? » (MAST), arXiv 2503.13657 v3 | 2025 | Taxonomie des pannes ; répétitions et boucles parmi les plus fréquentes ; un agent vérificateur n'est pas une solution miracle. | Mesuré | Lu | S6 étapes 6 et 11 |
| Yao et al., « τ-bench », arXiv 2406.12045 | 2024 | Service client simulé : réussir 8 fois sur 8 la même tâche, moins d'une fois sur 4 pour le meilleur agent testé. | Mesuré | Lu | S6 étape 6 ; guide C.5 |
| ImpossibleBench, arXiv (octobre 2025) | 30 octobre 2025 | Sur des tests volontairement impossibles, contournement jusqu'à 76 % des essais pour un modèle. | Mesuré (conditions artificielles) | Lu | S6 étape 6 |
| METR, « Recent frontier models are reward hacking » | 5 juin 2025 | Cas documentés de contournement des critères de réussite. | Observé | Lu | Guide (appui) |
| Tang et al., arXiv 2605.29442 | 2026 | 20 574 sessions réelles d'agents de programmation : 22,6 % des problèmes corrigés = comptes rendus inexacts ; 10,2 % = actions hors demande. **Non relu par les pairs.** | Mesuré | Lu | S6 étape 6 |
| Parasuraman et Manzey, « Complacency and Bias in Human Use of Automation », *Human Factors* | 2010 | Biais d'automatisation : synthèse d'études (aviation, médecine…). | Mesuré | Lu (résumé) | S6 étape 6 ; guide D.3 |
| Étude sur la perte de savoir-faire en endoscopie, *The Lancet Gastroenterology & Hepatology* | Août 2025 | Baisse d'environ 6 points du taux de détection sans IA, après introduction de l'IA. Chiffres exacts non vérifiés. | Mesuré (observationnel) | **Secondaire** | S6 étape 12 ; guide D.3 |

### 7.3 Incidents documentés

| Source | Date | Ce qu'on en retient | Étiquette | Accès | Utilisé dans |
|---|---|---|---|---|---|
| AI Incident Database n° 1152 ; *The Register* (incident Replit) | Juillet 2025 | Suppression d'une base de données de production malgré une consigne de gel. | Observé | Lu | S6 étape 4 |
| AI Incident Database n° 1178 (Gemini CLI) | Juillet 2025 | Fichiers perdus après une action supposée réussie mais non vérifiée. | Observé | Lu | S6 étape 5 |
| CVE-2025-32711 « EchoLeak » (Microsoft 365 Copilot) | Juin 2025 | Faille d'injection par un texte caché, corrigée. | Observé | Lu | S6 étape 6 |

### 7.4 Recommandations, vocabulaire et droit

| Source | Date | Ce qu'on en retient | Étiquette | Accès | Utilisé dans |
|---|---|---|---|---|---|
| ANSSI, *Recommandations de sécurité pour un système d'IA générative*, ANSSI-PA-102 | 29 avril 2024 | Limiter les droits et les actions automatiques ; contrôle humain des actions sensibles. | Supposé (recommandation) | Lu | S6 étapes 4 et 11 |
| OWASP, *Top 10 for Agentic Applications* | 9 décembre 2025 | Liste des risques propres aux agents (détournement d'objectif, abus d'outils, privilèges…). | Supposé (recommandation) | **Secondaire** (page OWASP non affichée ; liste lue via promptfoo) | S6 étapes 5 et 11 |
| Anthropic, « Building effective agents » | 19 décembre 2024 | Distinction entre flux prédéfinis et agents ; commencer simple. | Supposé (recommandation d'éditeur) | Lu | S6 étape 3 |
| Trivedy, LangChain, article sur « Agent = Model + Harness » | 10 mars 2026 | Origine du vocabulaire « harnais » dans sa forme répandue en 2026. | Fait vérifiable (date) | Lu | S6 étapes 2 et 3 |
| METR, mesures de « time horizon » | 2026 | La durée des tâches que les agents réussissent augmente. | Mesuré (sur leurs tâches) | Lu | Guide (contexte général, non cité) |
| Règlement (UE) 2024/1689 sur l'IA, modifié par le règlement (UE) 2026/1744 (« omnibus numérique ») | JO du 24 juillet 2026, en vigueur le 27 juillet 2026 | Article 4 (maîtrise de l'IA) assoupli ; obligations « haut risque » reportées au 2 décembre 2027 et au 2 août 2028 selon les cas. | Fait vérifiable | Lu | S6 étape 12 ; guide D.2 et D.5 |
| *Wall Street Journal*, article sur le métier de « prompt engineer » | Avril 2025 | Métier peu recherché par les employeurs. | Observé (presse) | Lu | S6 étape 12 |

### 7.5 Consultées, non citées

Ces documents ont été consultés pendant la recherche. Ils ne sont cités ni dans l'application ni dans ce guide, et leur contenu n'est pas résumé ici pour éviter une citation de mémoire. À relire avant tout usage.

- METR, étude sur la productivité de développeurs expérimentés utilisant l'IA (10 juillet 2025) et sa mise à jour (24 février 2026).
- Rabanser et al., arXiv 2602.16666 (2026), sur la fiabilité des agents.
- « Agents of Chaos », arXiv 2602.20021 (2026).
- Cyera, rapport sur la sécurité des agents (28 mai 2026).

---

## 8. Ce qui risque d'être faux dans 6 mois

**Date de rédaction : 14 septembre 2026.** Relire cette liste avant chaque session, et au plus tard en **mars 2027**.

Le niveau de risque est une **opinion** du rédacteur, pas une mesure.

| Affirmation | Où | Pourquoi elle peut devenir fausse | Risque | Comment vérifier |
|---|---|---|---|---|
| « Harnais » est un mot très utilisé. | S6 étape 2 et 3 | Vocabulaire apparu début 2026 ; un autre mot peut s'imposer. | Élevé | Chercher le mot dans la documentation des principaux outils et la presse spécialisée. |
| Les pourcentages du tableau des pannes (22,6 %, 10,2 %, 76 %, 61–75 %, 8 sur 8). | S6 étape 6 | Nouveaux modèles, nouvelles études ; l'étude de 2026 peut être corrigée lors de sa relecture par les pairs. | Élevé | Rechercher une version publiée ou une étude plus récente ; remplacer le chiffre ou retirer la ligne. |
| « Réfléchis étape par étape » : gain faible sur les modèles récents. | S5 étape 8 | Les modèles et leurs réglages par défaut changent à chaque version. | Moyen | Chercher un nouveau rapport comparatif ; faire un petit test en séance en le présentant comme tel. |
| Les textes très longs dégradent les performances. | S5 étapes 6 et 8 | Les éditeurs travaillent précisément sur ce point. L'effet peut diminuer. | Moyen | Chercher une mise à jour de l'étude Chroma ou une étude équivalente. |
| −39 % quand la demande arrive en plusieurs morceaux. | S5 étape 6 | Mesuré sur des modèles de 2025. | Moyen | Chercher une nouvelle version de l'étude de Laban et al. Garder le conseil (« nouvelle conversation ») s'il reste utile, en retirant le chiffre. |
| Les pensées affichées ne disent pas toujours la vraie raison. | S6 étapes 6 et 7 | Recherche active ; les chiffres changeront. Le principe (ne pas se fier aux seules pensées) a peu de chances de devenir faux. | Chiffre : élevé. Principe : faible. | Chercher les publications récentes sur la fidélité du raisonnement (« CoT faithfulness »). |
| Obligations de la loi européenne sur l'IA et leurs dates. | S6 étape 12 ; guide D | Actes d'exécution, lignes directrices et nouvelles modifications possibles. | Moyen | EUR-Lex (texte consolidé) et site de la Commission européenne. |
| Le métier de « prompt engineer » est peu recherché. | S6 étape 12 | Le marché de l'emploi bouge vite ; l'intitulé peut revenir sous un autre nom. | Moyen | Offres d'emploi récentes (France Travail, sites d'offres), en notant la date. |
| La liste OWASP des risques des agents. | Guide | Liste révisée régulièrement. | Moyen | Site de l'OWASP GenAI Security Project. |
| Beaucoup d'outils n'affichent pas de trace lisible. | Guide C.5 | Les éditeurs ajoutent des journaux d'activité. | Moyen | Tester l'outil disponible à l'ESRP. |
| Les exemples d'incidents (2025). | S6 étapes 4 à 6 | Ils ne deviennent pas faux, mais peuvent paraître datés ; d'autres cas plus parlants peuvent apparaître. | Faible (exactitude) | AI Incident Database. |

**Ce qui a peu de chances de devenir faux en 6 mois (opinion, confiance moyenne à élevée) :**
- une erreur non vue se propage dans une chaîne d'étapes ;
- une consigne n'est pas une permission ;
- un humain valide avant une action irréversible ;
- vérifier avec le même critère que l'erreur ne trouve pas l'erreur ;
- une recette non testée n'est pas une preuve.
---

## 9. Fiche récapitulative à imprimer

Une page A4, pour les stagiaires. Police sans empattement, 14 points minimum. Elle reprend l'étape 13 de la séance 6 (« Ma fiche à garder »).

> ### Aller plus loin avec l'IA : ma fiche
>
> **Informations vérifiées le 14 septembre 2026.**
>
> **Pour écrire une demande complexe : 6 cases**
> 1. **Objectif :** ce que je veux, et pour quoi faire.
> 2. **Format attendu :** la forme de la réponse.
> 3. **Limites :** ce que l'IA ne doit pas faire.
> 4. **Données fournies :** seulement les informations utiles.
> 5. **Évaluation :** comment je saurai que la réponse est bonne.
> 6. **Suite :** ce que je ferai ensuite.
>
> **Le contexte**
> - Je donne ce qui est utile et à jour.
> - Je retire le reste, surtout les données personnelles.
> - Si la conversation part de travers : nouvelle conversation, demande complète.
>
> **Un agent**
> - Il enchaîne seul des actions, avec les droits qu'un humain lui donne.
> - Une consigne n'est pas une permission. Le moins de droits possible.
> - Une erreur non vue devient une donnée pour la suite.
>
> **Je vérifie**
> - D'où vient l'information ?
> - Quelles étapes ont été faites ? Je lis les actions et les résultats, pas seulement les « pensées ».
> - Y a-t-il une action qu'on ne peut pas annuler ?
> - Les chiffres et les dates sont-ils vérifiés ?
> - Est-ce que je pourrais l'expliquer à quelqu'un ?
>
> **Je reprends la main**
> - Avant une action qu'on ne peut pas annuler : **toujours**.
> - Quand l'agent sort de sa tâche, ou quand je ne comprends plus ce qu'il fait.
>
> **À retenir**
> - Aucune technique n'est magique. Une recette non testée n'est pas une preuve.
> - Ce que les outils savent faire change vite. Les réflexes de vérification changent moins vite.

---

## 10. Annexe : écarts entre le cahier des charges et ce qui a été fait

Le cahier des charges de départ était un texte de consignes rédigé ailleurs, puis recopié pour ce projet. Cette annexe liste ce qui a été fait autrement, et pourquoi.

### 10.1 Paramètres non fournis

Les 5 paramètres « à compléter » n'ont pas été fournis. Valeurs retenues par défaut : voir la [section 0](#0-paramètres-retenus-par-défaut-à-confirmer). **À confirmer par le formateur.**

### 10.2 Couche formateur hors de l'application

- **Demande :** une couche stagiaire et une couche formateur.
- **Fait :** la couche formateur est ce guide, hors de l'application.
- **Raison :** les encadrés formateur contiennent des réponses attendues. Dans l'application, ils seraient lisibles avant la validation des exercices, contrairement à la règle 2.1 du projet (CLAUDE.md).
- **Limite :** ce guide est publié dans le dépôt, donc public (comme les JSON). Choix du formateur le 15 septembre 2026 (D-013).

### 10.3 Affirmations du corpus nuancées ou corrigées

Le cahier des charges demandait de vérifier le corpus et de le mettre à jour pour 2026. Les écarts :

| Idée du corpus | Ce qui a été trouvé | Choix fait |
|---|---|---|
| Ajouter une étape de vérification fiabilise un agent. | Résultats **mesurés** mitigés en laboratoire : comparer plusieurs réponses aide sur certaines tâches (2022) ; une IA qui se relit seule ne se corrige pas de façon fiable (2023) ; un agent vérificateur n'est pas une solution miracle (2025). Aucune mesure générale en situation réelle. | Présenté comme **supposé**, avec ces nuances (S6 étape 11). |
| La trace pensée-action-observation permet de diagnostiquer l'erreur. | Vrai en partie (**observé**, 2022). Mais les pensées écrites ne disent pas toujours la vraie raison (**mesuré**, 2025). | « Je me fie aux actions et aux observations plus qu'aux pensées » (S6 étape 7). |
| Le contexte compte autant que la formulation. | Aucune étude ne compare les deux de façon générale. | Reformulé : « Le contexte compte, pas seulement la phrase » (S5 étape 6, schéma 16). |
| Agent = modèle + harnais. | Vocabulaire popularisé en mars 2026, pas une définition normalisée. | Présenté comme un vocabulaire de 2026, « pas une loi » (S6 étape 3). |
| Déclin du métier de prompt engineer, avec des pourcentages. | Déclin **observé** dans la presse (2025). Pourcentages trouvés seulement sur des blogs sans méthode. | Idée gardée, chiffres retirés (S6 étape 12). |
| Promesse implicite d'employabilité. | Interdit par le cahier des charges lui-même. | Encadré « Ce que cette séance ne promet pas » (S6 étape 12). |

### 10.4 Prompts d'images 9 à 18

- **Demande :** des prompts pour générer 10 images, style vectoriel plat, fond blanc, 3 couleurs au maximum (bleu, orange, gris), lisibles en noir et blanc.
- **Fait :** 10 schémas **SVG** dessinés directement (par Claude, une IA), au lieu de prompts pour un générateur d'images. Raisons : texte exact et en français dans l'image, poids léger, transcription textuelle facile à garder identique (règle d'accessibilité 2.5).
- **Corrections apportées aux prompts :**
  - aucune couleur rouge ou verte (hors palette, et difficile à distinguer pour certaines personnes) : les « oui » et « non » sont portés par des coches, des croix et des mots ;
  - lisibilité en noir et blanc assurée par des formes, des pointillés et des étiquettes, pas par la couleur seule ;
  - suppression des formulations qui affirmaient plus que les sources (par exemple « le contexte compte autant que… ») ;
  - schéma de la boucle : ajout de « Entre deux étapes, personne ne vérifie, sauf si on l'a prévu », pour ne pas suggérer une vérification automatique ;
  - schéma pensée-action-observation : exemple différent de la trace de l'activité (réservation de salle), pour ne pas donner la réponse ;
  - schéma « choisir sa technique » : 5 branches, pour correspondre aux 5 techniques ;
  - schéma du contexte : « Les outils disponibles » retiré de la séance 5, car la notion d'outil n'est vue qu'en séance 6.
- **Vérification :** chaque schéma a été affiché dans un navigateur et relu. Il reste à vérifier sur les postes de l'ESRP et à l'impression.

### 10.5 Tensions avec le contenu existant (non modifié)

Ces phrases des séances 1 à 4 viennent du livret. Elles n'ont pas été modifiées. **À trancher par le formateur.**

- **Séance 2, corrigé s2-e06 :** « Plus l'IA a d'informations sur la situation, plus sa réponse est utile. » La séance 5 montre que trop d'informations peut nuire. Proposition : « Plus l'IA a d'informations **utiles** sur la situation… ».
- **Séance 2, étape 2 :** « La qualité de la demande détermine la qualité de la réponse. » La séance 5 dit qu'une demande bien écrite ne garantit pas une bonne réponse. Proposition : « … **influence** la qualité de la réponse ».

### 10.6 Effets sur le reste de l'application

- **Fin du livret :** l'étape « Fin du livret » de « Mes besoins » est suivie du bouton « Aller à la partie suivante », qui mène à la séance 5. Si vos stagiaires ne font pas les séances 5 et 6, dites-leur que l'atelier s'arrête à « Mes besoins ».
- **Pied de page :** il précise maintenant que les informations des séances 5 et 6 datent de septembre 2026.

### 10.7 Ce qui n'a pas été fait

- Aucun essai avec des stagiaires. Les durées et les « erreurs de compréhension probables » sont des estimations du rédacteur.
- Tests manuels d'accessibilité (clavier seul, NVDA, zoom 200 %, contrastes avec un outil dédié) : non réalisés pour les séances 5 et 6.
- Relecture par un spécialiste de l'IA ou par un juriste (droit européen) : non réalisée.
