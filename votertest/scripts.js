//hent elementene
testEl = document.getElementById("test");
previousBtn = document.getElementById("previous");
nextBtn = document.getElementById("next");
startBtn = document.getElementById("quizbutton");

//spørsmålene
let questions = [
            "I would vote for a canditate I know would destory my country ",
            "I want a high quality life.",
            "We should tax the poor more."
        ];

//svaralternativene
let answer1 = [
            "Why the fuck would I do that?", 
            "I don't know. I don't think I care.",
            "Yes! Let those poor bastards pay! The less you have, the more you must give to make it fair."
        ];
let answer2 = [
            "I haven't really decided what I want yet.",
            "No. I want to suffer. I love suffering. We should all suffer MORE.",
            "It would be rude to punish the less fortunate in our society further."
        ];
let answer3 = [
            "Of course. I don't care about the quality of my nation. Let it burn.", 
            "A high-quality life sounds great!",
            "What even is taxes man? I DON'T CARE! LEAVE ME ALONE."
        ];

//verdien de ulike svaralternativene har (a, b, eller c, 1 på hver kolonne)
let value1 = ["a", "b", "c"];
let value2 = ["b", "c", "a"];
let value3 = ["c", "a", "b"];

let answers = []; //tom liste til å lagre svarene

currentQuestionIndex = 0; //sier hvilket spørsmål man er på

function previousQuestion() {
    currentQuestionIndex--; //
    renderQuestion();
}

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

    //vis spørsmålet som tilsvarer current question index
    testEl.innerHTML = `
    <div class="testquestion">
        <h2>
            ${questions[currentQuestionIndex]}
        </h2>
        <div class="testalternatives">
            <button class="alternative" id="btn1" onclick="answerQuestion('${value1[currentQuestionIndex]}', this)">${answer1[currentQuestionIndex]}</button>
            <button class="alternative" id="btn2" onclick="answerQuestion('${value2[currentQuestionIndex]}', this)">${answer2[currentQuestionIndex]}</button>
            <button class="alternative" id="btn3" onclick="answerQuestion('${value3[currentQuestionIndex]}', this)">${answer3[currentQuestionIndex]}</button>
        </div>
        <p>Question ${currentQuestionIndex + 1} of ${questions.length}</p>
    </div>
    `;

    //bytt farge på knappen om brukerens svar samsvarer med verdien på alternativet
    if (answers[currentQuestionIndex] === value1[currentQuestionIndex]) {
        document.getElementById("btn1").style.backgroundColor = "#c14953";

    } else if (answers[currentQuestionIndex] === value2[currentQuestionIndex]) {
        document.getElementById("btn2").style.backgroundColor = "#c14953";

    } else if (answers[currentQuestionIndex] === value3[currentQuestionIndex]) {
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

