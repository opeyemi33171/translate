export class Word {
    english: string;
    french: string;

    constructor(english: string, french: string){
        this.english = english;
        this.french = french;
    }
}

module.exports = {Word};