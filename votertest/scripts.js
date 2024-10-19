//hent elementene


testEl = document.getElementById("test");
previousBtn = document.getElementById("previous");
nextBtn = document.getElementById("next");
startBtn = document.getElementById("quizbutton");

//objekt med spørsmålene 
const questionsObject = {
    question1: {
        content: "I would vote for a candidate I know know destroy my country.",
        answers: {
            answer1: "Why the fuck would I do that?",
            answer2: "I don't know. I don't think I care.",
            answer3: "Yes! Let those poor bastards pay! The less you have, the more you must give to make it fair."
        },
        values: {
            value1: "a",
            value2: "b",
            value3: "c"
        },
    },
    question2: {
        content: "I want a high quality life.",
        answers: {
            answer1: "I haven't really decided what I want yet.",
            answer2: "No. I want to suffer. I love suffering. We should all suffer MORE.",
            answer3: "A high-quality life sounds great!"
        },
        values: {
            value1: "b",
            value2: "c",
            value3: "a"
        }, 
    },
    question3: {
        content: "We should tax the poor more.",
        answers: {
            answer1: "Yes! Let those poor bastards pay! The less you have, the more you must give to make it fair.",
            answer2: "It would be rude to punish the less fortunate in our society.",
            answer3: "What even is taxes?I DON'T CARE! LEAVE ME ALONE!!"
        },
        values: {
            value1: "c",
            value2: "a",
            value3: "b"
        }
    }
};

let questions = Object.keys(questionsObject) //liste med nøklene i objektet til å telle antall spørsmål (question1, question2...)
let answers = []; //tom liste til å lagre svarene

currentQuestionIndex = 0; //sier hvilket spørsmål man er på

function nextQuestion() {
    //vis neste spørsmål om man ikke allerede er på siste
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        //bekreft at man vil fullføre testen
        if (confirm("Do you want to finish the test and see the results?") == true){
            //placeholder for det som skal skje
            alert(`Most of your answers had value ${countAnswer(answers)}. This will mean something eventually. All of your answers were ${answers}`);
        }
    }
}

function previousQuestion() {
    currentQuestionIndex--; 
    renderQuestion();
}


function renderQuestion() {
    //vis knappene til å bytte spørsmål avhengig av hvilket spørsmål man er på 
    if (currentQuestionIndex === 0){
        previousBtn.style.visibility = "hidden";
        nextBtn.style.visibility = "visible";
        nextBtn.innerText = "Next Question"
    } else if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerText = "Finish Quiz"
    } else {
        nextBtn.style.visibility = "visible";
        previousBtn.style.visibility ="visible";
        nextBtn.innerText = "Next Question"
    }

    let question = questionsObject[questions[currentQuestionIndex]]; //henter spørsmålet man er på

    //vis spørsmålet
    testEl.innerHTML = `
    <div class="testquestion">
        <h2>
            ${question.content}
        </h2>
        <div class="testalternatives">
            <button class="alternative" id="btn1" onclick="answerQuestion('${question.values.value1}', this)">${question.answers.answer1}</button>
            <button class="alternative" id="btn2" onclick="answerQuestion('${question.values.value2}', this)">${question.answers.answer2}</button>
            <button class="alternative" id="btn3" onclick="answerQuestion('${question.values.value3}', this)">${question.answers.answer3}</button>
        </div>
        <p>Question ${currentQuestionIndex + 1} of ${questions.length}</p>
    </div>
    `;

    //bytt farge på knappen om brukerens svar samsvarer med verdien på alternativet
    if (answers[currentQuestionIndex] === question.values.value1) {
        document.getElementById("btn1").style.backgroundColor = "#c14953";

    } else if (answers[currentQuestionIndex] === question.values.value2) {
        document.getElementById("btn2").style.backgroundColor = "#c14953";

    } else if (answers[currentQuestionIndex] === question.values.value3) {
        document.getElementById("btn3").style.backgroundColor = "#c14953";
    }

    startBtn.style.display = "none"; //skjul start-knappen
}

function answerQuestion(answer, button) {
    //verdien til svaralternativet man valgte blir lagt til i svarlista på plassen til spørsmålet
    answers[currentQuestionIndex] = answer;

    //velger alle knapper i samme element som knappen man trykket på
    const buttons = button.parentElement.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.style.backgroundColor = ""; //fjerner backgrunnsfargen på alle knappene
    });

    button.style.backgroundColor = "#c14953"; //legger til farge på knappen man trykket på
}

//funksjon for å telle antall ganger hvert svar blir gjentatt i lista
function countAnswer(array) {
    let count = {}; //tomt objekt til å lagre antallet av hvert svar
    let majorityAnswer = array[0], maxCount = 1; //svaret med flest starter med å være den første
    
    //går igjennom alle svarene i lista lista 
    for(let i = 0; i < array.length; i++)
    {
        let answer = array[i]; //henter svaret fra lista

        //om svaret ikke allerede er lagt til i objectet
        if(count[answer] == null) 
            count[answer] = 1;
        else
            count[answer]++; 

        //om antallet ganger svaret forekommer er større enn max antallet, blir dette det nye max antallet
        if(count[answer] > maxCount)
        {
            majorityAnswer = answer; 
            maxCount = count[answer];
        }
    }
    return majorityAnswer;

}

