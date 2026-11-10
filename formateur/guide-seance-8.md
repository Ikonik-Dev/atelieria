# Guide du formateur — Séance 8 « Esprit critique et usages métier »

- **Rédigé le :** 10 novembre 2026.
- **Durée :** 3 h 20 avec une pause (prévu pour 13 h 20 – 17 h 00).
- **Prérequis :** séances 1 à 7 terminées.
- **Format :** autonomie et entraide. Le formateur circule et intervient seulement en cas de blocage.

> ⚠️ Ce guide est public, comme les fichiers JSON qui contiennent déjà les corrections (CLAUDE.md, D-002).

---

## 1. Ce que la séance ajoute

Les séances 3 et 4 ont posé les réflexes : signaux de vigilance, IA ou moteur de recherche, les « 3 jamais ». La séance 8 les applique à des **tâches du métier visé** et ajoute deux idées :

1. **Le niveau de vérification dépend de l'enjeu** : je relis, je vérifie à la source, je fais valider. Deux questions pour choisir : « Si c'est faux, que se passe-t-il ? » et « Puis-je revenir en arrière ? ».
2. **La personne qui utilise la réponse en est responsable.**

## 2. Déroulé conseillé

| Heure | Étape | Mode |
|---|---|---|
| 13 h 20 | 1. Avant de commencer (les 4 réflexes « je bloque ») | Seul |
| 13 h 30 | 2. Combien je vérifie ? 7 situations | Seul |
| 13 h 55 | 3 à 6. Les 4 cas métier | Seul ou à deux |
| 15 h 10 | Pause | |
| 15 h 25 | 7. À deux : l'un demande, l'autre vérifie | À deux, avec l'outil d'IA |
| 16 h 15 | 8. Qui est responsable ? | Seul |
| 16 h 30 | 9. L'IA se relit elle-même (au choix) | À deux |
| 16 h 45 | 10. À garder, puis « Enregistrer mon travail dans un fichier » | Seul |

**Lancement conseillé (2 minutes) :** dire que la séance se fait en autonomie, montrer l'encadré « Je bloque ? » de l'étape 1, et demander de former les binômes **avant** l'étape 7.

## 3. Où les stagiaires risquent de bloquer (supposé, non observé)

| Endroit | Difficulté probable | Relance possible, sans donner la réponse |
|---|---|---|
| Étape 2, situations 5 et 7 | Hésitation entre niveau 1 et 2. | « Allez-vous réutiliser cette information ailleurs ? Pour qui ? » |
| Cas 1, phrase 4 | « Supprimer le profil » paraît une bonne solution technique. | « Qui va faire la manipulation ? Que perd-on si ça tourne mal ? » |
| Cas 2 (réseau) | Calcul en binaire pour les non-réseau. | Renvoyer à l'encadré « Aide pour le calcul » : 256 ÷ 4 = 64, et compter de 64 en 64. |
| Cas 2, phrase 7 | La passerelle en dernière adresse paraît plausible. | « À quoi sert la dernière adresse d'un sous-réseau ? » |
| Cas 3, phrase 4 | Le nom de paquet a l'air sérieux. | « Comment prouver qu'un paquet existe ? Où regarder ? » |
| Cas 4, e18 | Ne pas savoir ce qu'est un « cas de test ». | Renvoyer à l'encadré « Un mot de la séance ». |
| Étape 7 | Binôme qui ne trouve aucune erreur. | C'est un résultat valable s'ils savent dire **ce qu'ils ont vérifié et où** (e21, e22). |

## 4. Plan B

- **L'outil d'IA ne marche pas à l'étape 7 :** l'étape le prévoit (essayer l'autre outil, puis passer à l'étape 8). Variante orale : la personne B reprend un des 4 cas et explique à A comment elle vérifierait chaque phrase.
- **Un stagiaire très en avance :** étape 9 au choix, puis le bilan des séances 5 et 6 s'il ne l'a pas fait.
- **Un stagiaire très en retard :** l'aider à faire au moins les cas 1 et 4 (les plus accessibles), puis l'étape 7. Les cas 2 et 3 peuvent attendre.

## 5. Limites connues

- Les réponses d'IA des 4 cas sont **construites** : les erreurs ont été placées volontairement. Elles imitent des erreurs réelles (cause inventée, calcul faux d'une unité, paquet inexistant, « j'ai testé »).
- Le nom de paquet `verif-mail-express` est **inventé pour l'exercice**. Il n'a pas été vérifié sur npmjs.com : si un jour il existe, changer le nom dans `content/seance-8.json` (étape 5 : le tableau, le rappel et l'exercice `s8-e14`).
- Le numéro « 06 12 34 56 78 » et le nom « Sonia Benali » sont fictifs.
- Activité **non essayée avec des stagiaires** ; durées estimées.
