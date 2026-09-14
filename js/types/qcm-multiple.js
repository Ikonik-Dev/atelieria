/*
 * qcm-multiple.js — Type d'exercice "qcm_multiple" : plusieurs bonnes réponses.
 *
 * La réponse est juste seulement si le stagiaire a coché TOUTES les bonnes
 * options et AUCUNE mauvaise. La correction détaille chaque option.
 * Champ facultatif : "justification" (case « Pourquoi ? », voir commun-qcm.js).
 *
 * Comme pour tous les types : pas de délai, pas de verrouillage,
 * pas de sauvegarde ici. Le moteur s'en occupe.
 */

import { verifierTexteObligatoire } from '../outils.js';
import {
  verifierQuestionEtOptions, verifierJustification, construireQcm, lireChoixEtJustification,
  separerReponse, restaurerQcm, ligneJustification
} from './commun-qcm.js';

export default {
  type: 'qcm_multiple',

  verifierStructure(exercice) {
    const erreurs = [];
    const identifiants = verifierQuestionEtOptions(exercice, erreurs);

    const reponses = exercice.reponsesCorrectes;
    if (reponses === undefined) {
      erreurs.push({ champ: 'reponsesCorrectes', code: 'champManquant' });
    } else if (!Array.isArray(reponses)) {
      erreurs.push({ champ: 'reponsesCorrectes', code: 'typeListe' });
    } else if (reponses.length === 0) {
      erreurs.push({ champ: 'reponsesCorrectes', code: 'listeVide' });
    } else {
      const dejaVues = new Set();
      reponses.forEach((reponse, index) => {
        const champ = `reponsesCorrectes[${index + 1}]`;
        if (typeof reponse !== 'string') {
          erreurs.push({ champ, code: 'typeTexte' });
          return;
        }
        if (dejaVues.has(reponse)) erreurs.push({ champ, code: 'reponseEnDouble', valeur: reponse });
        dejaVues.add(reponse);
        if (identifiants.size > 0 && !identifiants.has(reponse)) {
          erreurs.push({ champ, code: 'reponseInexistante', valeur: reponse });
        }
      });
    }
    verifierTexteObligatoire(exercice, 'explicationCorrection', erreurs);
    verifierJustification(exercice, erreurs);
    return erreurs;
  },

  // Construit la question et les cases à cocher, SANS la correction.
  afficher(exercice, conteneur, textes) {
    construireQcm(exercice, conteneur, 'checkbox', textes);
  },

  // Renvoie la liste des options cochées (ou { choix, justification }), ou null si aucune case n'est cochée.
  lireReponse(conteneur) {
    return lireChoixEtJustification(conteneur, true);
  },

  restaurerReponse(conteneur, reponse) {
    restaurerQcm(conteneur, reponse);
  },

  // Juste seulement si les deux listes contiennent exactement les mêmes options.
  estCorrecte(exercice, reponse) {
    const { choix } = separerReponse(reponse);
    const attendues = new Set(exercice.reponsesCorrectes);
    const donnees = new Set(Array.isArray(choix) ? choix : []);
    return attendues.size === donnees.size && [...attendues].every((id) => donnees.has(id));
  },

  // Une ligne par option, dans l'ordre du JSON, puis l'explication du stagiaire.
  decrireCorrection(exercice, reponse, textes) {
    const { choix } = separerReponse(reponse);
    const attendues = new Set(exercice.reponsesCorrectes);
    const donnees = new Set(Array.isArray(choix) ? choix : []);
    const lignes = exercice.options.map((option) => {
      const bonne = attendues.has(option.id);
      const cochee = donnees.has(option.id);
      if (bonne && cochee) return { etat: 'juste', libelle: textes.cocheeJuste, texte: option.texte };
      if (bonne && !cochee) return { etat: 'faux', libelle: textes.nonCocheeJuste, texte: option.texte };
      if (!bonne && cochee) return { etat: 'faux', libelle: textes.cocheeFausse, texte: option.texte };
      return { etat: 'neutre', libelle: textes.nonCocheeFausse, texte: option.texte };
    });
    return [...lignes, ...ligneJustification(reponse, textes)];
  }
};
