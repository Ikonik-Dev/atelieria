/*
 * qcm-unique.js — Type d'exercice "qcm_unique" : une seule bonne réponse.
 *
 * Champs facultatifs propres à ce type :
 *   - "sansNote": true → pas de « Bonne réponse » ni « Ce n'est pas la bonne réponse ».
 *     La correction montre « le choix le plus naturel ». Utile quand plusieurs
 *     réponses peuvent se justifier (exemple : tri « IA ou moteur de recherche »).
 *   - "justification" → ajoute une case « Pourquoi ? » (voir commun-qcm.js).
 *
 * Rappel du contrat (voir CLAUDE.md, section 3.3, et README) :
 * un type d'exercice ne gère NI le délai, NI le verrouillage de la correction,
 * NI la sauvegarde. C'est le moteur (moteur-exercices.js) qui s'en occupe.
 */

import { verifierTexteObligatoire } from '../outils.js';
import {
  verifierQuestionEtOptions, verifierJustification, construireQcm, lireChoixEtJustification,
  separerReponse, restaurerQcm, ligneJustification, texteOption
} from './commun-qcm.js';

export default {
  // Valeur du champ "type" dans le JSON
  type: 'qcm_unique',

  // Vérifie que l'exercice est complet. Renvoie une liste d'erreurs (vide si tout va bien).
  verifierStructure(exercice) {
    const erreurs = [];
    const identifiants = verifierQuestionEtOptions(exercice, erreurs);
    verifierTexteObligatoire(exercice, 'reponseCorrecte', erreurs);
    if (typeof exercice.reponseCorrecte === 'string' && identifiants.size > 0 && !identifiants.has(exercice.reponseCorrecte)) {
      erreurs.push({ champ: 'reponseCorrecte', code: 'reponseInexistante', valeur: exercice.reponseCorrecte });
    }
    verifierTexteObligatoire(exercice, 'explicationCorrection', erreurs);
    if (exercice.sansNote !== undefined && typeof exercice.sansNote !== 'boolean') {
      erreurs.push({ champ: 'sansNote', code: 'typeBooleen' });
    }
    verifierJustification(exercice, erreurs);
    return erreurs;
  },

  // Construit la question et les boutons radio, SANS la correction.
  afficher(exercice, conteneur, textes) {
    construireQcm(exercice, conteneur, 'radio', textes);
  },

  // Renvoie l'id de l'option choisie (ou { choix, justification }), ou null si rien n'est choisi.
  lireReponse(conteneur) {
    return lireChoixEtJustification(conteneur, false);
  },

  // Remet à l'écran une réponse déjà enregistrée (après un rechargement de la page).
  restaurerReponse(conteneur, reponse) {
    restaurerQcm(conteneur, reponse);
  },

  // true si la réponse est correcte, false sinon, null si l'exercice est « sans note ».
  estCorrecte(exercice, reponse) {
    if (exercice.sansNote === true) return null;
    return separerReponse(reponse).choix === exercice.reponseCorrecte;
  },

  // Décrit le détail de la correction. Le moteur se charge de l'afficher.
  decrireCorrection(exercice, reponse, textes) {
    const { choix } = separerReponse(reponse);
    const bonne = texteOption(exercice, exercice.reponseCorrecte);

    if (exercice.sansNote === true) {
      return [
        { etat: 'neutre', libelle: textes.votreReponse, texte: texteOption(exercice, choix) },
        ...ligneJustification(reponse, textes),
        { etat: 'neutre', libelle: textes.choixConseille, texte: bonne }
      ];
    }

    const juste = choix === exercice.reponseCorrecte;
    const lignes = [
      { etat: juste ? 'juste' : 'faux', libelle: textes.votreReponse, texte: texteOption(exercice, choix) },
      ...ligneJustification(reponse, textes)
    ];
    if (!juste) lignes.push({ etat: 'juste', libelle: textes.bonneReponse, texte: bonne });
    return lignes;
  }
};
