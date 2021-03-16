import Question from "./question";
import Citation from "./citation";
import { Timer } from 'easytimer.js';


export default class GameManager {
  constructor() {
    this.score = 0;
    //tableau d'objet citation
    this.citations = [];
    //question affichée
    this.questionActuelle = new Question();
    //citation traitée
    this.citationActuelle = new Citation();
    this.enJeu = false;
    this.timer = new Timer();
  }

  /** Commence la partie
   * @param int nombre de citations pour la partie
   * @return
   */
  async commencer(nbrCitation = 2) {
    //récupérer les citations dans la base de donnée

    let ok = this.getCitation().then((v) => {
      this.enJeu = true;

      if (this.citations.length > 0) {
        this.citationActuelle = this.citations[0];
        this.questionActuelle = this.citationActuelle.questions[0];
        console.log("commencer start timer")
        this.timer.start({countdown: true, startValues: {seconds: 15}});
      } else {
        this.quitter();
      }
    });
    return ok;
  }

  /** Arrête la partie
   * @param
   * @return
   */
  quitter() {
    this.questionActuelle = null;
    this.citationActuelle = null;
    this.citations = [];
    this.score = 0;
    this.enJeu = false;
    this.timer.stop();
    console.log("quitter")
  }

  /** Ajoute une citation
   * @param Citation
   * @return
   */
  ajouterCitation(citation) {
    this.citations.push(citation);
  }

  questionSuivante() {
    let question = this.citationActuelle.questionSuivante();
    if (question === false) {
      this.enJeu = false;
    } else {
      this.questionActuelle = question;
    }
  }

  async getCitation() {
    const url =
      "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/say_my_name.php";
    let fetchOptions = { method: "GET" };
    let res = await fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        let questions = [...dataJSON];
        let citation = questions.shift();

        questions = questions.map((question) => {
          return new Question(
            question.question,
            parseInt(question.reponse, 10),
            parseInt(question.difficulte, 10),
            question.indice,
            [
              question.proposition_1,
              question.proposition_2,
              question.proposition_3,
              question.proposition_4
            ]
          );
        });

        this.ajouterCitation(new Citation(questions, citation.citation));
      });
    return "res";
  }
}
