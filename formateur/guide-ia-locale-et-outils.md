# Guide du formateur — IA locale et outils : installation et limites

- **Rédigé le :** 20 septembre 2026. **Informations vérifiées à cette date**, sur les sites des éditeurs.
- **Pour qui :** le formateur. Ce document n'est pas affiché dans l'application.
- **Statut :** procédure d'installation et de cadrage. La séance elle-même reste à écrire.

> ⚠️ Les outils d'IA changent vite. Refaites les vérifications de la section 2 **avant chaque atelier**. Une procédure d'installation périmée bloque une séance entière.

---

## 1. Les trois outils, et ce qu'ils coûtent vraiment

| Outil | Code source | Prix | Installation | Verdict pour l'ESRP |
|---|---|---|---|---|
| **Ollama** | **Libre** (licence MIT) | Gratuit | Oui, avec droits administrateur | Le seul qui coche toutes les cases « open source » |
| **LM Studio** | **Propriétaire, code fermé** | Gratuit, **y compris au travail** depuis juillet 2025 | Oui, avec droits administrateur | Gratuit ≠ libre. À trancher selon votre contrainte |
| **Claude Desktop (Cowork)** | Propriétaire | **Payant** : offres Pro, Max, Team ou Enterprise | Oui, avec droits administrateur | Poste formateur seulement. **Non pris en charge par le centre** |

**Le point à ne pas confondre.** « Gratuit » et « open source » ne veulent pas dire la même chose. Les conditions d'utilisation de LM Studio décrivent son code comme un secret commercial, et interdisent de le modifier ou de le redistribuer. Seul son outil en ligne de commande (`lms`) est sous licence libre. Si votre contrainte est réellement « logiciels libres », **Ollama est le choix cohérent** ; LM Studio est un choix de confort, à assumer comme tel.

**Le piège suivant : les modèles.** L'outil et le modèle ont deux licences différentes. Un logiciel libre peut faire tourner un modèle dont la licence est restrictive.

| Modèle | Licence | Ce que cela implique |
|---|---|---|
| Mistral (modèles ouverts), Qwen | Apache 2.0 | Usage professionnel libre, avec attribution |
| Llama (Meta) | Licence communautaire Meta | Usage commercial autorisé sous un seuil de 700 millions d'utilisateurs mensuels ; interdiction d'entraîner un modèle concurrent |
| Gemma (Google) | Conditions Gemma | Usage commercial autorisé, mais conditions révocables par Google |

Pour un atelier de formation, aucune de ces licences ne pose problème. L'intérêt pédagogique est ailleurs : **montrer qu'on vérifie une licence avant d'utiliser un outil au travail**. C'est exactement le réflexe de la séance 4 sur les chartes d'entreprise.

---

## 2. À vérifier avant d'installer

1. **La RAM du poste.** C'est le facteur décisif. Minimum 8 Go pour un petit modèle, 16 Go pour être à l'aise.
2. **L'espace disque.** Comptez 4 à 6 Go **par modèle** téléchargé. Trois modèles remplissent vite un petit disque.
3. **La carte graphique.** Facultative. Sans elle, cela fonctionne, mais lentement : la réponse s'écrit mot à mot, parfois péniblement.
4. **Le réseau du centre.** Le premier téléchargement d'un modèle passe par Internet et pèse plusieurs gigaoctets. Un proxy ou un antivirus d'entreprise peut le bloquer. **Testez depuis le réseau de l'ESRP, pas depuis chez vous.**
5. **L'accord du service informatique.** Avoir le code administrateur n'est pas la même chose qu'être autorisé. Demandez un accord écrit : cela vous protège.
6. **La réinitialisation des postes.** Si les postes s'effacent à la déconnexion, les modèles téléchargés disparaissent aussi. Prévoyez un poste dédié.

### 2.1 Relever la configuration d'un poste sous Windows 11

**Ce que Windows affiche, et où :**

| Information | Où la trouver |
|---|---|
| Processeur, RAM installée | `Win + Pause`, ou Paramètres → Système → Informations système |
| Carte graphique et **mémoire vidéo dédiée** | Gestionnaire des tâches (`Ctrl + Maj + Échap`) → Performances → GPU |
| Les mêmes, en détail | `Win + R`, puis `dxdiag` → onglet Affichage |
| Récapitulatif complet | `Win + R`, puis `msinfo32` |
| Espace disque libre | Explorateur de fichiers → Ce PC |

**Ce que Windows n'affiche pas : la puissance allouée à la carte graphique (TGP).** Or la RTX 3050 Ti portable existe en versions de 35 à 95 watts. À mémoire vidéo identique, cela change beaucoup la vitesse. **Relevé sur nos postes le 21 septembre 2026 : 35 W par défaut, 39,8 W en fonctionnement, 50 W au maximum.** C'est le bas de la fourchette : voir la section 3.1. Deux moyens de la connaître :

1. **Panneau de configuration NVIDIA** → menu **Aide** → **Informations système** → ligne « **Puissance graphique maximale** ». C'est le plus simple. **Limite :** cette valeur est la puissance de base ; la fonction Dynamic Boost peut ajouter environ 15 watts en pointe. La ligne peut aussi manquer si le pilote est ancien : mettez-le à jour.
2. **`nvidia-smi -q -d POWER`** dans PowerShell. L'outil est installé avec le pilote NVIDIA : rien à installer. Repérez `Default Power Limit` et `Max Power Limit`. **Limite :** sur certains portables, ces champs affichent « N/A » ou « not supported ». Dans ce cas, seule la fiche technique du constructeur, pour la référence exacte du modèle, donne la réponse.

**Inventaire de plusieurs postes.** Ce script PowerShell relève l'essentiel sur un poste. Aucun droit administrateur n'est nécessaire. Lancez-le sur chaque machine, ou déposez-le sur un partage et faites-le exécuter poste par poste.

```powershell
# Inventaire pour l'IA locale — à lancer dans PowerShell
$cpu = Get-CimInstance Win32_Processor | Select-Object -First 1
$ramGo = [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 1)
$gpu = Get-CimInstance Win32_VideoController | Where-Object { $_.Name -notmatch 'Intel|Basic' } | Select-Object -First 1
# La mémoire vidéo réelle se lit dans le registre : la valeur WMI est fausse au-dessus de 4 Go
$vram = Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\*' -Name 'HardwareInformation.qwMemorySize' -ErrorAction SilentlyContinue |
        ForEach-Object { [math]::Round($_.'HardwareInformation.qwMemorySize' / 1GB, 1) } | Sort-Object -Descending | Select-Object -First 1
$disqueGo = [math]::Round((Get-PSDrive C).Free / 1GB, 1)

"Poste          : $env:COMPUTERNAME"
"Processeur     : $($cpu.Name) — $($cpu.NumberOfCores) coeurs, $($cpu.NumberOfLogicalProcessors) threads"
"RAM            : $ramGo Go"
"Carte graphique: $($gpu.Name) — pilote $($gpu.DriverVersion)"
"Memoire video  : $vram Go"
"Disque C libre : $disqueGo Go"
"--- Puissance de la carte graphique (vide si non pris en charge) ---"
if (Get-Command nvidia-smi -ErrorAction SilentlyContinue) {
  nvidia-smi -q -d POWER | Select-String 'Power Limit'
} else { "nvidia-smi introuvable : pilote NVIDIA absent ou trop ancien" }
```

**Comment lire le résultat :**

- **Mémoire vidéo inférieure à 4 Go** : s'en tenir aux modèles de 1 à 3 milliards de paramètres.
- **Mémoire vidéo de 4 Go** : voir la section 3. Modèles de 3 à 4 milliards.
- **Disque libre inférieur à 20 Go** : n'installez qu'un seul modèle, et surveillez l'espace.
- **Puissance basse (35 à 45 W)** : les temps de réponse seront sensiblement plus longs que sur une machine identique en 80 ou 95 W. Mesurez avant d'annoncer quoi que ce soit aux stagiaires (section 3.5).
- **Postes hétérogènes** : c'est le cas courant. Prévoyez le modèle le plus petit qui convienne au **poste le plus faible**, pour que toute la salle ait la même expérience.

---

## 3. Quel modèle installer sur nos postes

**Configuration de référence :** Intel Core i7-11370H (4 cœurs, 8 threads), 16 Go de RAM, NVIDIA GeForce RTX 3050 Ti portable.

### 3.1 Le chiffre qui décide de tout : 4 Go de mémoire vidéo

La RTX 3050 Ti portable dispose de **4 Go de mémoire vidéo (VRAM)**, lue à environ **190 Go/s** (bus de 128 bits, mémoire à 12 Gbps ; environ 176 Go/s sur les versions à 11 Gbps). C'est cette mémoire, et non la puissance du processeur, qui détermine ce qui tourne confortablement.

Trois mémoires interviennent, à ne pas confondre :

| Mémoire | Quantité | Rôle | Vitesse |
|---|---|---|---|
| **VRAM** (carte graphique) | 4 Go, dont environ 3,3 à 3,7 Go réellement libres | Là où le modèle doit tenir pour être rapide | La plus rapide : environ **190 Go/s** |
| **RAM** (système) | 16 Go, dont 4 à 6 Go pris par Windows | Sert de repli quand le modèle ne tient pas en VRAM | Environ **4 fois plus lente** : DDR4-3200 en double canal, soit environ 50 Go/s |
| **Disque** | Variable | Stocke les modèles téléchargés | Très lente : à éviter pendant la génération |

**Pourquoi la vitesse dépend de la mémoire, et pas du processeur.** Pour écrire chaque mot, le programme relit l'ensemble des paramètres du modèle. Le facteur limitant est donc la vitesse à laquelle la mémoire est lue, pas le nombre de calculs. Un modèle qui tient entièrement en VRAM est lu vite. Dès qu'une partie déborde en RAM, la vitesse s'effondre, quelle que soit la qualité du processeur.

### 3.1 bis Nos postes : une carte limitée à 35 watts

**Relevé le 21 septembre 2026** avec `nvidia-smi -q -d POWER`, pilote 573.71 :

| Valeur | Relevé | Ce que cela dit |
|---|---|---|
| Puissance par défaut | 35,00 W | Configuration la plus basse de la gamme 3050 Ti |
| Puissance au moment du relevé | 39,76 W | Dynamic Boost fonctionne : la carte dépasse sa valeur de base |
| Puissance maximale | 50,00 W | Le plafond absolu de ces machines |
| Consommation à vide | 9,73 W | Carte au repos, valeur normale |

**Ce que cela change, concrètement.** Il faut distinguer deux moments dans une réponse d'IA :

- **La lecture de votre demande** (« prompt processing ») : c'est du calcul intensif. C'est là que les 35 W se font sentir. Plus votre texte fourni est long, plus cette phase s'allonge.
- **L'écriture de la réponse** : c'est de la lecture de mémoire. La bande passante ne dépend presque pas de la puissance électrique, donc cette phase souffre moins.

**Conséquences pratiques sur nos machines :**

1. **Garder les textes fournis courts.** Un modèle de 3 milliards avec 2 pages de contexte restera agréable ; avec 30 pages, l'attente initiale devient longue. C'est une raison technique de plus d'appliquer la règle de la séance 5 : on donne les pièces utiles, pas tout le classeur.
2. **Rester en dessous de 4 Go.** Sur une carte à 35 W, un modèle de 7 milliards qui déborde en RAM est nettement plus pénalisé que sur une machine à 90 W.
3. **Brancher le secteur.** Sur batterie, Windows et le constructeur réduisent encore la puissance. Une démonstration préparée sur secteur peut devenir laborieuse sur batterie.
4. **Régler l'alimentation.** Dans Paramètres → Système → Alimentation, choisir le mode le plus performant pendant l'atelier.
5. **Prévoir la chauffe.** Sur un châssis fin, une génération longue fait monter le ventilateur. En salle, c'est audible : prévenez le groupe plutôt que de laisser croire à une panne.

### 3.2 Calculer si un modèle tient

Les modèles sont distribués en versions **quantifiées** : les paramètres sont stockés avec moins de précision, pour occuper moins de place. La version courante s'appelle **Q4**.

**Règle de calcul (approximation, suffisante pour décider) :** en Q4, un modèle occupe environ **0,6 Go par milliard de paramètres**. Il faut ajouter la place du contexte, c'est-à-dire de la conversation en cours : comptez quelques centaines de mégaoctets de plus.

| Taille du modèle | Poids du fichier en Q4 | Tient dans 4 Go de VRAM ? | Comportement attendu sur ces postes |
|---|---|---|---|
| 1 à 2 milliards | 0,7 à 1,3 Go | Oui, largement | Très rapide. Qualité faible sur les tâches complexes |
| **3 à 4 milliards** | **1,8 à 2,5 Go** | **Oui, avec de la marge pour le contexte** | **Le bon choix par défaut : fluide et utilisable** |
| 7 à 8 milliards | 4,1 à 4,9 Go | Non : débordement en RAM | Fonctionne, mais nettement plus lent. Acceptable pour une tâche ponctuelle |
| 13 à 14 milliards | 7,5 à 8,5 Go | Non, largement au-dessus | Pénible : une grande partie du modèle est en RAM |
| 30 milliards et plus | 18 Go et plus | Non | Ne pas essayer : la machine devient inutilisable |

**Le contexte coûte aussi de la mémoire.** Plus la conversation est longue, plus la place occupée augmente. Sur 4 Go, gardez un contexte modeste. C'est réglable dans Ollama comme dans LM Studio : vérifiez la valeur par défaut de la version installée, elle change d'une version à l'autre.

**Quantification : où est la limite.** Passer de Q8 à Q4 fait perdre peu de qualité, pour deux fois moins de place. Descendre à Q2 ou Q3 dégrade nettement les réponses. D'où la règle : **mieux vaut un petit modèle en Q4 qu'un gros modèle en Q2.**

### 3.3 Ce qu'un modèle plus gros apporte, et ce qu'il n'apporte pas

C'est le point que vos stagiaires doivent comprendre. Un modèle plus gros améliore surtout **les connaissances mémorisées** et **le raisonnement sur des problèmes complexes**.

Or, sur ces deux points :

- **Les connaissances mémorisées ne sont pas l'usage à encourager.** La séance 3 l'enseigne déjà : pour un fait vérifiable et actuel, on utilise un moteur de recherche et une source fiable, pas la mémoire d'une IA. Installer un modèle plus gros pour « avoir de meilleures réponses factuelles », c'est renforcer exactement le mauvais usage.
- **Les tâches vraiment utiles ne dépendent presque pas de la taille.** Reformuler, résumer un texte fourni, changer un ton, extraire des informations d'un document, rédiger un brouillon : dans tous ces cas, **l'information est dans la demande, pas dans le modèle**. Un modèle de 3 milliards de paramètres s'en sort bien.

À l'inverse, un modèle trop gros dégrade concrètement le travail :

1. **Il casse l'itération.** La séance 2 repose sur des allers-retours. Si chaque réponse prend deux minutes, le stagiaire n'itère plus : il accepte la première réponse. **La lenteur coûte plus de qualité que la taille n'en apporte.**
2. **Il rend le poste pénible.** Mémoire saturée, ventilateur à fond, et sur un portable de 35 watts, la machine ralentit en chauffant.
3. **Il masque la vraie compétence.** Un stagiaire qui attribue un mauvais résultat à « un modèle trop petit » ne cherche plus ce qui manque dans sa demande.

**La phrase à faire retenir :** sur une même machine, **une meilleure demande sur un petit modèle bat presque toujours une demande vague sur un gros modèle**.

### 3.4 Choisir selon la tâche, pas selon la taille

| Tâche | Choix adapté | Pourquoi |
|---|---|---|
| Reformuler, résumer, changer le ton d'un texte **que je fournis** | Modèle de 3 à 4 milliards, en VRAM | Tout ce qu'il faut est dans la demande. Rapide, donc on itère |
| Extraire des informations d'un document, remplir un tableau | Modèle de 3 à 4 milliards, avec un exemple de format | La technique « je donne un exemple » (séance 5) compte plus que la taille |
| Traduire, corriger l'orthographe | Modèle de 3 à 4 milliards | Tâche bien maîtrisée par les petits modèles |
| Écrire ou expliquer du code | Modèle de 7 milliards spécialisé code, en acceptant la lenteur | Ici, la taille aide réellement. À réserver au profil « code » |
| Question de connaissances, actualité, chiffres | **Aucun modèle local** | Usage à déconseiller : moteur de recherche et source fiable (séance 3) |
| Données confidentielles à traiter | Modèle local, quelle que soit sa taille | C'est le seul vrai avantage du local : rien ne part sur Internet |

**Exemples de modèles, au 20 septembre 2026.** Les noms changent très vite : vérifiez sur **ollama.com/library** avant chaque atelier.

| Famille | Taille à privilégier ici | Licence | Remarque |
|---|---|---|---|
| Qwen | 3 à 4 milliards | Apache 2.0 | Cohérent avec une contrainte « logiciel libre » |
| Mistral | 7 milliards | Apache 2.0 | Débordera un peu : à tester avant de choisir |
| Llama (Meta) | 3 milliards | Licence communautaire Meta | Licence à lire avant un usage professionnel |
| Gemma (Google) | 2 à 4 milliards | Conditions Gemma | Conditions révocables par Google |
| Phi (Microsoft) | environ 4 milliards | MIT | Petit modèle orienté raisonnement |

### 3.5 Mesurer au lieu de croire

Ne reprenez pas mes estimations : **mesurez sur vos postes**. C'est rapide, et c'est la démarche enseignée aux stagiaires.

1. Lancer un modèle en mode détaillé : `ollama run <nom du modèle> --verbose`
2. Poser **toujours la même demande**, par exemple « Résume ce texte en 5 lignes », avec le même texte.
3. Relever la vitesse affichée à la fin de la réponse, en jetons par seconde (« eval rate »).
4. Vérifier au passage, dans le Gestionnaire des tâches (onglet Performances, puis GPU), si la mémoire vidéo est saturée.
5. Noter le résultat, un tableau par poste :

| Modèle | Poids du fichier | Vitesse mesurée | Qualité sur ma tâche (1 à 3) | Verdict |
|---|---|---|---|---|
| | | | | |

**Repère d'interprétation :** une vitesse confortable, c'est un texte qui s'écrit plus vite qu'on ne le lit. En dessous, l'outil décourage l'itération : c'est un critère de rejet, même si la qualité semble meilleure.

**Avertissement honnête :** ces vitesses dépendent du modèle, de la longueur du contexte, du profil d'alimentation du portable et de ce que fait Windows au même moment. Un même poste donne des résultats différents sur secteur et sur batterie. Raison de plus pour mesurer, et pour ne jamais annoncer une vitesse aux stagiaires sans l'avoir constatée.

### 3.6 La démonstration à faire en séance

Elle prend 15 minutes, et démonte l'idée fausse mieux qu'un discours.

1. Installer deux modèles : un de 3 à 4 milliards, un de 7 à 8 milliards.
2. Poser au **gros** modèle une demande vague : « Fais un compte rendu de cette réunion. »
3. Poser au **petit** modèle une demande travaillée : objectif, format attendu, limites, et le texte fourni.
4. Comparer les deux réponses, et le temps d'attente.
5. Faire formuler la conclusion par le groupe, sans la donner : ce qui a changé, ce n'est pas la machine.

**Ce qu'il ne faut pas affirmer :** « Le petit modèle est meilleur. » Il ne l'est pas dans l'absolu. Il est **mieux adapté à cette machine et à cette tâche**. Sur une question de connaissances, le gros modèle gagnera souvent — et c'est justement l'usage à éviter en local.

---

### 3.7 Le banc d'essai en binômes (2 heures, sans formateur dans la salle)

Activité au choix, dans l'application : **séance 7, dernière étape**. Deux modèles locaux passent 4 manches de mesure. Les stagiaires écrivent sur une fiche papier, puis recopient dans l'application.

**Déroulé des 3 heures**

| Temps | Qui | Quoi |
|---|---|---|
| 0:00 – 0:25 | Vous | Consignes, binômes, affiche au mur, **et test d'une mesure sur chaque poste** |
| 0:25 – 2:25 | Le groupe seul | Les 4 manches, puis la préparation de la restitution |
| 2:25 – 3:00 | Vous | Mise en commun, tableau collectif, décision « quel modèle pour quelle tâche » |

**Préparation la veille — obligatoire.** Sans elle, l'activité n'a pas lieu.

1. Installer **deux modèles** sur **chaque** poste : un de 3 à 4 milliards, un de 7 à 8 milliards. Les lancer une fois, pour que le téléchargement soit fait.
2. Vérifier l'espace disque restant : au moins 10 Go.
3. Brancher les postes sur secteur et régler Windows en mode performances (section 3.1 bis).
4. Imprimer : la **fiche de mesure** (une par binôme), les **2 textes** (un par binôme), l'**affiche des règles** (`formateur/atelier-banc-essai/banc-essai-affiche-regles.docx`).
5. Écrire au tableau le chemin exact : **menu → Séance 7 → Plan de la séance → dernière étape**. Le bouton « Continuer » n'y mène pas : il ignore les exercices au choix.

**Les 25 minutes avant de partir.** Le test poste par poste n'est pas une formalité : un binôme dont l'outil ne démarre pas travaillera 2 heures sans mesurer. Faites lancer une réponse courte sur chaque machine, devant vous.

**Les constats attendus, manche par manche**

| Manche | Ce que les binômes devraient constater | Ce qu'il ne faut pas affirmer |
|---|---|---|
| 1. Vitesse | Le petit modèle est confortable ; le gros fait attendre | « Le petit modèle est meilleur » : il est mieux adapté à cette machine |
| 2. Texte fourni ou connaissances | Sur le texte fourni, les deux s'en sortent ; sur la connaissance, il faut une source | « L'IA locale ne sait rien » : elle sait, mais on ne peut pas s'y fier sans vérifier |
| 3. Demande contre taille | La demande travaillée sur le petit modèle bat la demande vague sur le gros | Que ce sera vrai pour toutes les tâches |
| 4. Texte long | L'attente avant la réponse s'allonge nettement | Un chiffre général : cela dépend du texte et de la machine |

**Gérer le groupe inégal.** Ceux qui ont fini la séance 7 commencent le banc d'essai et deviennent référents du protocole. Les autres finissent la séance 7 (45 min), puis rejoignent à la manche 2 : les manches sont indépendantes.

**Au retour : la mise en commun (35 minutes).** Chaque binôme donne ses 3 phrases, chacune avec un chiffre. Reportez les vitesses relevées dans un tableau collectif au tableau blanc. Terminez par une décision commune : quel modèle garder par défaut, et pour quelle tâche. Ramassez les fiches : les incidents notés vous disent quels postes revoir.

**Ce que vous observez** : qui mesure avant d'écrire ; qui vérifie la question de connaissances avec une source ; qui attribue un mauvais résultat au modèle plutôt qu'à sa demande ; qui ose écrire « nous n'avons pas réussi ».

**Plan B, si rien ne fonctionne le jour J.** Les manches deviennent une analyse sur papier : distribuez vos propres captures d'écran (une réponse du petit modèle, une du gros, avec les vitesses affichées) et faites remplir la même fiche. Les exercices de l'application restent utilisables : ils demandent des constats, pas un accès à l'outil.

**Limites de cette activité, à dire au groupe** : elle mesure **ces deux modèles, sur ces machines, ce jour-là**. Elle ne dit rien des outils en ligne, ni d'une autre machine. Et une mesure unique n'est pas une preuve : c'est un ordre de grandeur.

---

## 4. Procédure — Ollama (recommandé)

**Durée :** 15 à 30 minutes selon le débit réseau.

1. Aller sur **ollama.com**, rubrique Download, choisir Windows. L'installateur fonctionne sur Windows 10 et 11 en 64 bits.
2. Lancer l'installateur et saisir le code administrateur.
3. Ouvrir **PowerShell** ou le **terminal Windows**.
4. Vérifier l'installation : `ollama --version`
5. Télécharger et lancer un modèle, par exemple : `ollama run mistral`
   - Le premier lancement télécharge le modèle. Les suivants sont immédiats.
   - Les noms de modèles changent souvent : la liste à jour est sur **ollama.com/library**. Choisissez un modèle en Apache 2.0 si vous voulez rester cohérent avec la contrainte « libre ».
6. Écrire une question, appuyer sur Entrée. Pour sortir : `/bye`
7. Commandes utiles :
   - `ollama list` : les modèles installés.
   - `ollama rm <nom>` : supprimer un modèle et libérer le disque.

**Bon à savoir :**
- Ollama écoute uniquement sur votre machine, à l'adresse `127.0.0.1:11434`. Rien n'est exposé au réseau par défaut.
- Les modèles et l'historique sont dans le dossier personnel de l'utilisateur Windows.
- Une fois le modèle téléchargé, **Internet n'est plus nécessaire** : c'est la démonstration la plus parlante pour les stagiaires.

**Interface graphique.** Ollama s'utilise surtout en ligne de commande, ce qui est un obstacle réel pour un public débutant. Deux options : projeter votre écran pendant la démonstration, ou installer une interface web libre par-dessus. Cette seconde option demande une installation supplémentaire, souvent avec Docker : **à ne pas improviser le jour J**.

---

## 5. Procédure — LM Studio (si vous acceptez un logiciel propriétaire)

Son avantage est net pour un public non technique : tout se fait à la souris, sans ligne de commande.

1. Aller sur **lmstudio.ai**, télécharger la version Windows.
2. Installer avec le code administrateur.
3. Dans l'application, onglet de recherche : chercher un modèle, par exemple « Mistral » ou « Qwen ».
4. Choisir une version adaptée à la RAM du poste. L'application indique si le modèle tient en mémoire : **lisez cet avertissement avant de télécharger**.
5. Charger le modèle, puis écrire dans la fenêtre de discussion.

**À dire aux stagiaires, sans le cacher :** cet outil est gratuit mais n'est pas libre. Son code n'est pas consultable. C'est un choix de confort, différent d'un choix de transparence.

---

## 6. Procédure — Claude Desktop et Cowork (poste formateur uniquement)

> ⚠️ **Avertissement à lire aux stagiaires, mot pour mot :**
> « Cet outil est **payant**. Il demande un abonnement personnel. Le centre ne le fournit pas, ne le prend pas en charge, et ne vous demande pas de le payer. Je vous le montre pour que vous sachiez ce que c'est, pas pour que vous l'achetiez. »

**Ce que c'est.** Cowork est l'agent de bureau d'Anthropic : il travaille dans les dossiers que vous lui désignez, et enchaîne des actions. C'est la version grand public de Claude Code, qui, lui, s'utilise dans un terminal. Les deux illustrent la séance 6 : un agent, une boucle, des permissions.

**Conditions vérifiées le 20 septembre 2026 :** réservé aux offres payantes (Pro, Max, Team, Enterprise). Disponible via l'application Claude Desktop sur macOS et Windows, et sur le web selon les offres.

1. Aller sur **claude.com/download**, télécharger l'application pour Windows.
2. Installer, puis se connecter avec un compte **payant**.
3. Dans Cowork, **désigner explicitement le dossier de travail**. L'agent n'accède qu'à celui-là.
4. Choisir le mode de permission. Trois modes existent : demander avant chaque action, décider seul avec des garde-fous, ou ne rien demander.
5. Pour la démonstration, **gardez le mode qui demande avant d'agir** : c'est précisément ce que la séance 6 enseigne.

**Règles de sécurité pour la démonstration :**
- Travaillez sur un **dossier de démonstration**, avec des fichiers fictifs. Jamais de données de stagiaires, jamais de dossiers du centre.
- Si vous utilisez un abonnement payé par l'ESRP, vérifiez d'abord avec lui ce qui a le droit d'y être traité.
- Montrez au moins une fois **la demande d'autorisation avant une suppression** : c'est le point de contrôle de la séance 6, rendu visible.

---

## 7. Ce qu'il faut dire, et ne pas dire, sur l'IA locale

- **Ce qu'il faut dire :**
  - Une fois le modèle téléchargé, la conversation ne part pas sur Internet. C'est la réponse concrète à la question « où vont mes données ? » de la séance 4.
  - Un modèle local est plus lent, et souvent moins performant qu'un outil en ligne.
  - Il ne connaît pas l'actualité et n'accède pas au web : il ne peut pas vérifier une information à votre place.
- **Ce qu'il ne faut surtout pas affirmer :**
  - « En local, c'est sécurisé. » Les conversations restent en clair sur le disque du poste. Sur un poste partagé, la personne suivante peut les lire.
  - « En local, l'IA ne se trompe pas. » Elle hallucine autant, parfois davantage.
  - « C'est gratuit. » Le logiciel est gratuit. L'électricité, le matériel et votre temps ne le sont pas.
- **Question hors de portée, par exemple « Quel modèle est le meilleur ? » :** « Je ne sais pas, et les classements changent tous les mois. On peut comparer deux modèles sur **votre** tâche, et regarder lequel vous sert le mieux. »
- **3 erreurs de compréhension probables :**
  1. Croire que « local » veut dire « privé » quel que soit le poste.
  2. Croire qu'un modèle local est une version bridée du même outil qu'en ligne. Ce sont des modèles différents.
  3. Conclure que l'IA locale est inutile parce qu'elle est plus lente : son intérêt est la maîtrise des données, pas la performance.

---

## 8. Séquence pédagogique possible (40 minutes)

Elle réutilise ce qui est déjà enseigné, sans rien apprendre de neuf sur le plan technique.

1. **Démonstration, 10 min.** Le formateur lance un modèle local, puis **coupe le Wi-Fi ou débranche le câble réseau**, et continue la conversation. C'est la preuve visuelle que rien ne part.
2. **Comparaison, 15 min.** Même question posée à l'IA en ligne et à l'IA locale. Les stagiaires remplissent la grille de la séance 3 : longueur, clarté, ce qui diffère, ce qui paraît douteux.
3. **La question des données, 10 min.** Reprendre les 3 « jamais » de la séance 4 : qu'est-ce qui change avec un modèle local ? Qu'est-ce qui ne change pas ? (Réponse attendue : le risque d'envoi disparaît, le risque de lecture sur un poste partagé demeure.)
4. **Licences, 5 min.** Montrer où se lit la licence d'un modèle, et pourquoi une entreprise la regarde.

**Critère de réussite :** le stagiaire sait dire une chose que l'IA locale apporte, et une chose qu'elle n'apporte pas.

---

## 9. Ce qui risque d'être faux dans 6 mois

**Date : 20 septembre 2026.** À relire au plus tard en mars 2027.

| Affirmation | Risque | Comment vérifier |
|---|---|---|
| LM Studio est gratuit au travail | Moyen : une politique de prix peut changer | Page des conditions sur lmstudio.ai |
| Cowork est réservé aux offres payantes | Moyen | Centre d'aide de Claude |
| Les noms de modèles cités (`mistral`, `qwen`) | Élevé : ils changent souvent | ollama.com/library |
| Les besoins en RAM indiqués | Faible pour l'ordre de grandeur, élevé pour le détail | Documentation de l'outil, et essai réel sur le poste |
| Les licences des modèles | Moyen : Meta et Google ont déjà modifié les leurs | Page du modèle sur son site officiel |
| Ollama est sous licence MIT | Faible | Dépôt du projet |
