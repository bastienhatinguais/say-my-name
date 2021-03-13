export default class Question {
  constructor(question, reponse, score, indice, propositions) {
    this.question = question;
    this.reponse = reponse;
    this.score = score;
    this.indice = indice;
    this.propositions = propositions || [];
  }
}
