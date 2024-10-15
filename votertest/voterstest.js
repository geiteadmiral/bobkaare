testEl = document.getElementById("test");

let questions = ["I would vote for a canditate I know would destory my country ", "Ouestion 2"];

let answer1 = ["Why the fuck would I do that?", "1"]
let answer2 = ["I haven't really decided what I want yet.", "2"]
let answer3 = ["Of course. I don't care about the quality of my nation", "3"]

let value1 = ["a", "a"];
let value2 = ["b", "b"];
let value3 = ["c", "c"];
let answers = new Array(questions.length).fill(null);

currentQuestionIndex = 0;

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    } else {
        alert("This is the first question");
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        alert(`This is the last question. Your answers were: ${answers.join(', ')}`);
    }
}

function renderQuestion() {
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
    </div>
    `;

    if (answers[currentQuestionIndex] === value1[currentQuestionIndex]) {
        document.getElementById("btn1").style.backgroundColor = "red";

    } else if (answers[currentQuestionIndex] === value2[currentQuestionIndex]) {
        document.getElementById("btn2").style.backgroundColor = "red";

    } else if (answers[currentQuestionIndex] === value3[currentQuestionIndex]) {
        document.getElementById("btn3").style.backgroundColor = "red";
    }
}

function answerQuestion(answer, button) {
    answers[currentQuestionIndex] = answer;

    const buttons = button.parentElement.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.style.backgroundColor = ""; 
    });

    button.style.backgroundColor = "red";
}

renderQuestion();
