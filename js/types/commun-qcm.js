/*
 * commun-qcm.js — Morceaux partagés par les types "qcm_unique" et "qcm_multiple".
 *
 * Ce fichier n'est pas un type d'exercice : il évite seulement d'écrire
 * deux fois le même code.
 *
 * Case « Pourquoi ? » (champ facultatif "justification" dans le JSON) :
 * sous les choix, une zone de texte permet d'expliquer sa réponse.
 * La réponse enregistrée devient alors { choix, justification }.
 */

import {
  creer, ajouterTexteRiche, identifiantUnique, verifierTexteObligatoire, estObjet
} from '../outils.js';

/** Vérifie la question et la liste des options { id, texte }. */
export function verifierQuestionEtOptions(exercice, erreurs) {
  verifierTexteObligatoire(exercice, 'question', erreurs);

  const options = exercice.options;
  if (options === undefined) {
    erreurs.push({ champ: 'options', code: 'champManquant' });
    return new Set();
  }
  if (!Array.isArray(options)) {
    erreurs.push({ champ: 'options', code: 'typeListe' });
    return new Set();
  }
  if (options.length < 2) erreurs.push({ champ: 'options', code: 'optionsInsuffisantes' });

  const identifiants = new Set();
  options.forEach((option, index) => {
    const prefixe = `options[${index + 1}].`;
    if (!estObjet(option)) {
      erreurs.push({ champ: `options[${index + 1}]`, code: 'typeObjet' });
      return;
    }
    verifierTexteObligatoire(option, 'id', erreurs, prefixe);
    verifierTexteObligatoire(option, 'texte', erreurs, prefixe);
    if (typeof option.id === 'string') {
      if (identifiants.has(option.id)) erreurs.push({ champ: `${prefixe}id`, code: 'idOptionEnDouble', valeur: option.id });
      identifiants.add(option.id);
    }
  });
  return identifiants;
}

/** Vérifie le champ facultatif "justification" : { "libelle": "...", "obligatoire": true|false }. */
export function verifierJustification(exercice, erreurs) {
  const justification = exercice.justification;
  if (justification === undefined) return;
  if (!estObjet(justification)) {
    erreurs.push({ champ: 'justification', code: 'typeObjet' });
    return;
  }
  verifierTexteObligatoire(justification, 'libelle', erreurs, 'justification.');
  if (justification.obligatoire !== undefined && typeof justification.obligatoire !== 'boolean') {
    erreurs.push({ champ: 'justification.obligatoire', code: 'typeBooleen' });
  }
}

/**
 * Construit le formulaire accessible d'un QCM :
 * <fieldset> + <legend> pour la question, un <input> + <label> par option,
 * puis, si le JSON le demande, la case « Pourquoi ? ».
 * typeChamp vaut 'radio' (une seule réponse) ou 'checkbox' (plusieurs).
 * La correction n'est JAMAIS construite ici.
 */
export function construireQcm(exercice, conteneur, typeChamp, textes) {
  const idConsigne = identifiantUnique('consigne');
  const groupe = creer('fieldset', { classe: 'qcm', 'aria-describedby': idConsigne });
  const legende = ajouterTexteRiche(creer('legend', { classe: 'question' }), exercice.question);
  groupe.append(legende, creer('p', { classe: 'consigne', id: idConsigne, texte: textes.consigne }));

  const nomGroupe = identifiantUnique(`reponse-${exercice.id}`);
  for (const option of exercice.options) {
    const idChamp = identifiantUnique(`option-${exercice.id}`);
    const champ = creer('input', { type: typeChamp, id: idChamp, name: nomGroupe, value: option.id });
    const libelle = ajouterTexteRiche(creer('label', { for: idChamp }), option.texte);
    groupe.append(creer('div', { classe: 'option' }, [champ, libelle]));
  }
  conteneur.append(groupe);

  if (exercice.justification) {
    const obligatoire = exercice.justification.obligatoire === true;
    const idZone = identifiantUnique(`justification-${exercice.id}`);
    const idConsigneZone = identifiantUnique('consigne');
    conteneur.append(creer('div', { classe: 'justification' }, [
      ajouterTexteRiche(creer('label', { for: idZone, classe: 'libelle-justification' }), exercice.justification.libelle),
      creer('p', {
        classe: 'consigne',
        id: idConsigneZone,
        texte: obligatoire ? textes.consigneJustificationObligatoire : textes.consigneJustificationFacultative
      }),
      creer('textarea', {
        id: idZone,
        classe: 'champ-justification',
        rows: '3',
        'aria-describedby': idConsigneZone,
        'aria-required': obligatoire ? 'true' : null,
        // Lu par lireChoixEtJustification : le contrat des types ne donne pas l'exercice à lireReponse.
        'data-obligatoire': obligatoire ? 'true' : 'false'
      })
    ]));
  }
}

/** Renvoie les valeurs des cases cochées. */
export function valeursCochees(conteneur) {
  return [...conteneur.querySelectorAll('input:checked')].map((champ) => champ.value);
}

/**
 * Lit la réponse d'un QCM.
 * Sans case « Pourquoi ? » : l'id choisi (ou la liste des id cochés).
 * Avec case « Pourquoi ? » : { choix, justification }.
 * Renvoie null si aucun choix n'est fait, ou si l'explication obligatoire est vide.
 */
export function lireChoixEtJustification(conteneur, multiple) {
  const cochees = valeursCochees(conteneur);
  const choix = multiple ? (cochees.length > 0 ? cochees : null) : (cochees[0] ?? null);
  if (choix === null) return null;

  const zone = conteneur.querySelector('textarea.champ-justification');
  if (!zone) return choix;
  const justification = zone.value.trim();
  if (zone.dataset.obligatoire === 'true' && justification === '') return null;
  return { choix, justification };
}

/** Sépare une réponse enregistrée en { choix, justification }, quelle que soit sa forme. */
export function separerReponse(reponse) {
  if (typeof reponse === 'object' && reponse !== null && !Array.isArray(reponse)) {
    return { choix: reponse.choix, justification: typeof reponse.justification === 'string' ? reponse.justification : '' };
  }
  return { choix: reponse, justification: '' };
}

/** Remet à l'écran une réponse enregistrée : cases cochées et explication. */
export function restaurerQcm(conteneur, reponse) {
  const { choix, justification } = separerReponse(reponse);
  const valeurs = Array.isArray(choix) ? choix : [choix];
  for (const champ of conteneur.querySelectorAll('input')) {
    champ.checked = valeurs.includes(champ.value);
  }
  const zone = conteneur.querySelector('textarea.champ-justification');
  if (zone) zone.value = justification;
}

/** Ligne de correction qui rappelle l'explication écrite par le stagiaire (si elle existe). */
export function ligneJustification(reponse, textes) {
  const { justification } = separerReponse(reponse);
  return justification ? [{ etat: 'neutre', libelle: textes.votreJustification, texte: justification }] : [];
}

/** Retrouve le texte d'une option à partir de son id. */
export function texteOption(exercice, idOption) {
  return exercice.options.find((option) => option.id === idOption)?.texte ?? idOption;
}
