//hent elementene


testEl = document.getElementById("test");
previousBtn = document.getElementById("previous");
nextBtn = document.getElementById("next");
startBtn = document.getElementById("quizbutton");
navBtns = document.getElementById("navigateQuiz")

//objekt med spørsmålene 
const questionsObject = {
    question1: {
        content: "I would vote for a candidate I know would destroy my country.",
        answers: {
            answer1: "Why the hell would I do that?",
            answer2: "I don't know. I don't think I care.",
            answer3: "I believe that the destruction of my country is necessary for the development of society."
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
    },
    question4: {
        content: "More countries should have nuclear weapons.",
        answers: {
            answer1: "Yup. It would scare people away from using them, and if it doesn't, maybe it is time for the end anyway.",
            answer2: "It should probably stay as it is right now. I don't want to take a stance. It is too complicated.",
            answer3: "No. And the other countries must remove them too. My country should be the only one with it so we are at the top."
        },
        values: {
            value1: "c",
            value2: "b",
            value3: "a"
        }
    },
    question5: {
        content: "I question authority.",
        answers: {
            answer1: "I would never question authority. They can control every aspect of my live. I will submit.",
            answer2: "Authority don't have enough impact on my life for me to care.",
            answer3: "Questioning authority is vital for the function of democracy."
        },
        values: {
            value1: "c",
            value2: "b",
            value3: "a"
        }
    },
    question6: {
        content: "Climate change is a threat to humanity.",
        answers: {
            answer1: "Definitely. It is important that we take immidiate action to stop it.",
            answer2: "If it is a threat, let it come. Maybe we do indeed deserve destruction.",
            answer3: "I don't know. I read on Facebook or something that it is a hoax."
        },
        values: {
            value1: "a",
            value2: "c",
            value3: "b"
        }
    },
    question7: {
        content: "We should dismantle democracy.",
        answers: {
            answer1: "Yes. The average person is way too stupid to make decisions.",
            answer2: "What does 'democracy' mean? STOP USING BIG WORDS.",
            answer3: "No. While democracy is flawed, we must improve it, not dismantle it."
        },
        values: {
            value1: "c",
            value2: "b",
            value3: "a"
        }
    }
};

let questions = Object.keys(questionsObject) //liste med nøklene i objektet til å telle antall spørsmål (question1, question2...)
let answers = []; //tom liste til å lagre svarene

currentQuestionIndex = 0; //sier hvilket spørsmål man er på

function nextQuestion() {
    if (answers[currentQuestionIndex]){
        //vis neste spørsmål om man ikke allerede er på siste
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            //bekreft at man vil fullføre testen
            if (confirm("Do you want to finish the test and see the results?") == true){
                //placeholder for det som skal skje
                showResults()
            }
        }
    } else {
        alert("You must first answer the question.")
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
        nextBtn.innerText = "Next Question";
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

function showResults(){
    navBtns.style.display = "none";

    majorityAnswer = countAnswer(answers)

    let title;
    let description;
    let image;
    let imageCred;
    let imageAlt;

    if (majorityAnswer === "a") {
        title = "The Patriot";
        description = `
            You are <b>The Patriot</b>. You truly want what's best for your country. You don't have a lot of controversial opinions,
            and you care a lot about both yourself and the other people around you. Especially your countrymen. <br> <br>

            Bob Kaare is excactly the same. He also wants what's best for you and your countrymen. Therefore, you
            must <b>vote for Bob.</b>
        `;
        image = '../bilder/thepatriot.jpg'
        imageCred = 'Photo by M Venter: <a href="https://www.pexels.com/photo/photo-of-man-sitting-on-a-cave-1659437/">https://www.pexels.com/photo/photo-of-man-sitting-on-a-cave-1659437/</a>'
        imageAlt = 'A man sitting in cave. Looking at the view while at peace.'

    } else if (majorityAnswer === "b"){
        title = "The Apath";
        description = `You are <b>The Apath</b>. You don't seem to be that into politics. It might be compilicated for you, or simply too boring.
            You don't have that many opinions about how your country should be ran, and would rather be
            as little involved as possible. <br> <br>
            
            So does Bob Kaare. He doesn't really care that much about the details. You two would get along perfectly.
            What is a better leader than one that is as apathetic as yourself? Therefore, you must <b>vote for Bob.<b>`;
        image = '../bilder/theapath.jpg'
        imageCred = 'Photo by Tima Miroshnichenko: <a href="https://www.pexels.com/photo/monochrome-photo-of-dissociated-people-on-a-party-5805002/">https://www.pexels.com/photo/monochrome-photo-of-dissociated-people-on-a-party-5805002/<a/>'
        imageAlt = 'The people at a birtday party. They are sitting on a sofa while looking at their phones.'

    } else if (majorityAnswer === "c") {
        title = "The Destroyer";
        description = `You are <b>The Destroyer</b>. You have a lot of really <em>controversial</em> opinions. More often that not, you want the world to 
        burn. That is probably not the most popular view out there, but it is just as valid as everything else.
        <br> <br>
        
        Bob Kaare is the only politican out there that is willing to fight for what you want. Everyone else is just
        a bunch of pussies. Bob Kaare is so desparate for power that he will do <em>anything</em> for you. Therefore,
        you must <b>vote for Bob.</b>
        ` ;

        image = '../bilder/thedestroyer.jpg';
        imageCred = 'Photo by Jani Kantokoski: <a href="https://www.pexels.com/photo/house-on-fire-25490565/">https://www.pexels.com/photo/house-on-fire-25490565/</a>'
        imageAlt = 'A burning house'
    }
    
    
    test.innerHTML = `
        <div id="result">
            <h3>Your Results</h3>
            <div class="split">
                <div>
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
                <figure class="pic">
                    <img src=${image} />
                    <figcaption class="imagesource" >
                        ${imageCred}
                    </figcaption>
                </figure>
            </div>
        </div>
    `

}

