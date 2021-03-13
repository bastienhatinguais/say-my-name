import Question from "./question";
import Citation from "./citation";

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
  }

  /** Commence la partie
   * @param int nombre de citations pour la partie
   * @return
   */
  async commencer(nbrCitation = 2) {
    //récupérer les citations dans la base de donnée

    //(local)
    /*
    let questions = [];
    questions.push(
      new Question(
        "Quel est le personnage qui a dit cette phrase ?",
        0,
        2,
        "Chauve - Chapeau",
        [
          "Walter White",
          "Jesse Pinkman",
          "Gustavo 'Gus' Fring",
          "Jane Margolis"
        ]
      )
    );

    questions.push(
      new Question("Quel est la série", 2, 2, "BB", [
        "Oui",
        "Non",
        "Breaking Bad",
        "je sais plus"
      ])
    );

    this.ajouterCitation(new Citation(questions, "Say my name"));
*/

    let ok = this.getCitation().then((v) => {
      console.log(v);
      this.enJeu = true;

      if (this.citations.length > 0) {
        this.citationActuelle = this.citations[0];
        this.questionActuelle = this.citationActuelle.questions[0];
        console.log(this.questions);
      } else {
        console.log("quittage");
        //this.quitter();
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
      console.log("Changement de enJeu");
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
