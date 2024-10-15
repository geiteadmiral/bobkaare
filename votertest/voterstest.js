testEl = document.getElementById("test");

let questions = ["1", "2", "3", "4", "5", "6"];
let value1 = ["a", "a", "b", "b", "c", "c"];
let value2 = ["b", "b", "c", "c", "a", "a"];
let value3 = ["c", "c", "a", "a", "b", "b"];
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
    <div>
        <p>
            ${questions[currentQuestionIndex]}
        </p>
        <button id="btn1" onclick="answerQuestion('${value1[currentQuestionIndex]}', this)">1</button>
        <button id="btn2" onclick="answerQuestion('${value2[currentQuestionIndex]}', this)">2</button>
        <button id="btn3" onclick="answerQuestion('${value3[currentQuestionIndex]}', this)">3</button>
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
