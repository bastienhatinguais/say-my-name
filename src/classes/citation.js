export default class Citation {
  constructor(questions, citation) {
    //tableau d'objet question
    this.questions = questions;
    this.citation = citation;
    this.indexQuestionActuelle = 0;
  }

  /**
   * change la question actuelle
   * @param
   * @return la prochaine question ou false si il n'y a plus de questions
   */
  questionSuivante() {
    this.indexQuestionActuelle++;
    if (this.indexQuestionActuelle >= this.questions.length) return false;
    return this.questions[this.indexQuestionActuelle];
  }
}
