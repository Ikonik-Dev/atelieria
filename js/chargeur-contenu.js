/*
 * chargeur-contenu.js — Chargement et contrôle des fichiers JSON du dossier content/.
 *
 * 1. Charge content/interface.json (textes de l'interface, liste des parties du livret).
 * 2. Charge chaque fichier de partie (séance).
 * 3. Vérifie chaque partie en détail. Si un fichier a un problème, la partie
 *    concernée est marquée « indisponible », avec la liste précise des erreurs
 *    (fichier, élément, champ). Les autres parties restent utilisables.
 * 4. Vérifie les liens entre fichiers : une étape qui « s'ouvre après » des
 *    exercices doit citer des exercices qui existent.
 *
 * Rappel : le format JSON n'accepte ni commentaires, ni virgule après
 * le dernier élément d'une liste.
 */

import { obtenirType, nomsDesTypes } from './types/registre.js';
import { verifierBlocs } from './blocs-lecon.js';
import {
  verifierTexteObligatoire, verifierListeDeTextes, estObjet, estTexteNonVide
} from './outils.js';

const DOSSIER_CONTENU = 'content/';
const VERSIONS_SEANCE = [1];
const DIFFICULTES = ['facile', 'moyen', 'difficile'];
const FORME_ID_EXERCICE = /^s\d+-e\d+$/;

/**
 * Charge un fichier JSON.
 * Renvoie { ok: true, donnees } ou { ok: false, code, detail }.
 */
export async function chargerJson(fichier) {
  let reponse;
  try {
    // "no-cache" : le navigateur vérifie toujours si le fichier a changé,
    // pour que les modifications du formateur apparaissent tout de suite.
    reponse = await fetch(DOSSIER_CONTENU + fichier, { cache: 'no-cache' });
  } catch (erreur) {
    return { ok: false, code: 'fichierIntrouvable', detail: String(erreur) };
  }
  if (!reponse.ok) return { ok: false, code: 'fichierIntrouvable', detail: String(reponse.status) };

  const texte = await reponse.text();
  try {
    return { ok: true, donnees: JSON.parse(texte) };
  } catch (erreur) {
    return { ok: false, code: 'jsonInvalide', detail: erreur.message };
  }
}

/** Vérifie les champs communs à tous les exercices, puis les champs propres à son type. */
function verifierExercice(exercice, idsUtilises, idsExercices, fichier) {
  const erreurs = [];
  const id = typeof exercice.id === 'string' ? exercice.id : '';

  verifierTexteObligatoire(exercice, 'id', erreurs);
  if (id) {
    if (!FORME_ID_EXERCICE.test(id)) erreurs.push({ champ: 'id', code: 'formatIdExercice', valeur: id });
    if (idsUtilises.has(id)) erreurs.push({ champ: 'id', code: 'idEnDouble', valeur: `${id} — ${idsUtilises.get(id)}` });
  }

  const type = obtenirType(exercice.type);
  if (exercice.type === undefined) {
    erreurs.push({ champ: 'type', code: 'champManquant' });
  } else if (!type) {
    erreurs.push({ champ: 'type', code: 'typeInconnu', valeur: String(exercice.type), valeurs: nomsDesTypes().join(', ') });
  }

  if (exercice.difficulte !== undefined && !DIFFICULTES.includes(exercice.difficulte)) {
    erreurs.push({ champ: 'difficulte', code: 'valeurNonAutorisee', valeur: String(exercice.difficulte), valeurs: DIFFICULTES.join(', ') });
  }
  const temps = exercice.tempsMinimumSecondes;
  if (temps !== undefined && !(Number.isInteger(temps) && temps >= 0)) {
    erreurs.push({ champ: 'tempsMinimumSecondes', code: 'typeEntierPositif' });
  }

  // Vérifications propres au type (question, options, réponses...)
  if (type) erreurs.push(...type.verifierStructure(exercice));

  if (id && !idsUtilises.has(id)) idsUtilises.set(id, fichier);
  if (id) idsExercices.add(id);
  return erreurs.map((erreur) => ({ ...erreur, id: id || '?' }));
}

/**
 * Vérifie un fichier de partie complet. Renvoie la liste des erreurs (vide si tout va bien).
 * Les étapes qui « s'ouvrent après » des exercices sont notées dans "references",
 * pour être contrôlées quand tous les fichiers sont chargés.
 */
function verifierSeance(seance, fichier, idsUtilises, idsExercices, references) {
  const erreurs = [];
  const ajouter = (liste, id) => liste.forEach((erreur) => erreurs.push({ fichier, id: erreur.id ?? id, ...erreur }));

  if (!estObjet(seance)) {
    ajouter([{ champ: '-', code: 'typeObjet' }], '-');
    return erreurs;
  }

  const generales = [];
  if (!VERSIONS_SEANCE.includes(seance.version)) {
    generales.push({ champ: 'version', code: 'versionInconnue', valeur: String(seance.version), valeurs: VERSIONS_SEANCE.join(', ') });
  }
  verifierTexteObligatoire(seance, 'id', generales);
  verifierTexteObligatoire(seance, 'titre', generales);
  verifierListeDeTextes(seance, 'objectifs', generales, { obligatoire: false });
  if (typeof seance.id === 'string') {
    if (idsUtilises.has(seance.id)) generales.push({ champ: 'id', code: 'idEnDouble', valeur: seance.id });
    else idsUtilises.set(seance.id, fichier);
  }
  ajouter(generales, seance.id ?? '-');

  if (!Array.isArray(seance.etapes)) {
    ajouter([{ champ: 'etapes', code: seance.etapes === undefined ? 'champManquant' : 'typeListe' }], seance.id ?? '-');
    return erreurs;
  }
  if (seance.etapes.length === 0) ajouter([{ champ: 'etapes', code: 'listeVide' }], seance.id ?? '-');

  seance.etapes.forEach((etape, indexEtape) => {
    const nomEtape = `etapes[${indexEtape + 1}]`;
    if (!estObjet(etape)) {
      ajouter([{ champ: nomEtape, code: 'typeObjet' }], seance.id ?? '-');
      return;
    }
    const idEtape = typeof etape.id === 'string' ? etape.id : nomEtape;
    const erreursEtape = [];
    verifierTexteObligatoire(etape, 'id', erreursEtape);
    verifierTexteObligatoire(etape, 'titre', erreursEtape);
    if (typeof etape.id === 'string') {
      if (idsUtilises.has(etape.id)) erreursEtape.push({ champ: 'id', code: 'idEnDouble', valeur: etape.id });
      else idsUtilises.set(etape.id, fichier);
    }
    // "auChoix" : exercices facultatifs (par exemple les parcours A, B, C)
    if (etape.auChoix !== undefined && typeof etape.auChoix !== 'boolean') {
      erreursEtape.push({ champ: 'auChoix', code: 'typeBooleen' });
    }
    // "ouvertureApres" : l'étape reste fermée tant que ces exercices ne sont pas validés
    if (etape.ouvertureApres !== undefined) {
      verifierListeDeTextes(etape, 'ouvertureApres', erreursEtape);
      if (Array.isArray(etape.ouvertureApres)) {
        const ids = etape.ouvertureApres
          .map((id, index) => ({ id, position: index + 1 }))
          .filter((element) => estTexteNonVide(element.id));
        references.push({ fichier, idEtape, ids });
      }
    }
    verifierBlocs(etape.blocs, erreursEtape, '');
    // "rappel" : document affiché en haut de chaque exercice de l'étape (voir D-018)
    if (etape.rappel !== undefined) {
      if (!estObjet(etape.rappel)) {
        erreursEtape.push({ champ: 'rappel', code: 'typeObjet' });
      } else {
        verifierTexteObligatoire(etape.rappel, 'titre', erreursEtape, 'rappel.');
        verifierBlocs(etape.rappel.blocs, erreursEtape, 'rappel.');
      }
    }
    ajouter(erreursEtape, idEtape);

    if (etape.exercices === undefined) return;
    if (!Array.isArray(etape.exercices)) {
      ajouter([{ champ: 'exercices', code: 'typeListe' }], idEtape);
      return;
    }
    etape.exercices.forEach((exercice, indexExercice) => {
      if (!estObjet(exercice)) {
        ajouter([{ champ: `exercices[${indexExercice + 1}]`, code: 'typeObjet' }], idEtape);
        return;
      }
      ajouter(verifierExercice(exercice, idsUtilises, idsExercices, fichier), idEtape);
    });
  });
  return erreurs;
}

/**
 * Lit la liste "seances" de interface.json.
 * Chaque élément est soit un nom de fichier ("seance-1.json"), soit un objet
 * { "fichier": "mes-besoins.json", "etiquette": "Mes besoins" } pour une partie
 * qui n'est pas numérotée comme une séance.
 * Renvoie null si la liste est mal écrite.
 */
function lireListeSeances(liste) {
  if (!Array.isArray(liste)) return null;
  const entrees = [];
  let numero = 0;
  for (const element of liste) {
    if (estTexteNonVide(element)) {
      numero += 1;
      entrees.push({ fichier: element, numero, etiquette: null });
    } else if (estObjet(element) && estTexteNonVide(element.fichier) && estTexteNonVide(element.etiquette)) {
      entrees.push({ fichier: element.fichier, numero: null, etiquette: element.etiquette });
    } else {
      return null;
    }
  }
  return entrees;
}

/**
 * Charge tout le contenu.
 * Renvoie :
 *   { ok: false, detail }  si content/interface.json est absent ou illisible
 *   { ok: true, textes, seances: [{ fichier, numero, etiquette, donnees, erreurs }] }
 */
export async function chargerContenu() {
  const interfaceJson = await chargerJson('interface.json');
  if (!interfaceJson.ok) return { ok: false, detail: `content/interface.json : ${interfaceJson.code} ${interfaceJson.detail}` };

  const textes = interfaceJson.donnees;
  const entrees = estObjet(textes) ? lireListeSeances(textes.seances) : null;
  if (!entrees) {
    return { ok: false, detail: 'content/interface.json : "seances"' };
  }

  const chargements = await Promise.all(entrees.map((entree) => chargerJson(entree.fichier)));

  // Les identifiants doivent être uniques dans tout le projet : on les suit d'un fichier à l'autre.
  const idsUtilises = new Map();
  const idsExercices = new Set();
  const references = [];
  const seances = chargements.map((resultat, index) => {
    const { numero, etiquette } = entrees[index];
    const fichier = `content/${entrees[index].fichier}`;
    if (!resultat.ok) {
      const modele = textes.erreurs[resultat.code];
      return { fichier, numero, etiquette, donnees: null, erreurs: [{ fichier, message: modele, detail: resultat.detail }] };
    }
    const erreurs = verifierSeance(resultat.donnees, fichier, idsUtilises, idsExercices, references);
    return { fichier, numero, etiquette, donnees: resultat.donnees, erreurs, titreBrut: resultat.donnees?.titre };
  });

  // Liens entre fichiers : chaque exercice cité dans "ouvertureApres" doit exister.
  for (const reference of references) {
    const seance = seances.find((element) => element.fichier === reference.fichier);
    for (const { id, position } of reference.ids) {
      if (!idsExercices.has(id)) {
        seance.erreurs.push({ fichier: reference.fichier, id: reference.idEtape, champ: `ouvertureApres[${position}]`, code: 'idExerciceInconnu', valeur: id });
      }
    }
  }

  // Une partie avec au moins une erreur n'est pas affichée (jamais d'écran à moitié faux).
  for (const seance of seances) {
    if (seance.erreurs.length > 0) seance.donnees = null;
  }

  return { ok: true, textes, seances };
}
