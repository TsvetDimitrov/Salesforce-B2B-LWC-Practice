import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {

    selected = {}; // storing answers.

    myQuestions = [
        {   
            id: "Question1",
            question: "Which of the following is not a template loop?",
            answers: {
                a: "for:each",
                b: "iterator",
                c: "map loop"
            },
            correctAnswer: "c"
        },
        {   
            id: "Question2",
            question: "Which file is invalid in LWC?",
            answers: {
                a: ".svg",
                b: ".apex",
                c: ".css"
            },
            correctAnswer: "b"
        },
        {   
            id: "Question3",
            question: "Which of the following is not a directive?",
            answers: {
                a: "for:each",
                b: "if:true",
                c: "@track"
            },
            correctAnswer: "c"
        }
    ];

    get allNotSelected () {
        return !(Object.keys(this.selected).length == this.myQuestions.length)
    }

    changeHandler (event) {
        console.log("name", event.target.name);
        console.log("value", event.target.value);

        const {name, value} = event.target;
        this.selected = {...this.selected, [name]: value}
    }

    submitHandler (e) {

    }

    resetHandler () {
        this.selected = {};
        this.correctAnswers = 0;
        this.isSubmitted = false;
    }
}