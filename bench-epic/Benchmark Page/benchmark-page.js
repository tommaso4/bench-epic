let timeLeft = 60;
let timer = document.getElementById("timeLeft");
let countdownTimer = 0;

function isTimeLeft() {
  return timeLeft > -1;
}

function runTimer(timerElement) {
  const timerCircle = timerElement.querySelector("svg > circle + circle");
  timerElement.classList.add("animatable");
  timerCircle.style.strokeDashoffset = 1;

  let countdownTimer = setInterval(function () {
    if (isTimeLeft()) {
      const timeRemaining = timeLeft--;
      const normalizedTime = (60 - timeRemaining) / 60;
      timerCircle.style.strokeDashoffset = normalizedTime;
      timer.innerHTML = timeRemaining;
    } else {
      clearInterval(countdownTimer);
      timerElement.classList.remove("animatable");
      triggerNextButton("btn-next");
      runTimer(timerElement);
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(countdownTimer);
  timeLeft = 60;
  const timerCircle = document.querySelector(".timer svg > circle + circle");
  timerCircle.style.strokeDashoffset = 1;
  timer.innerHTML = timeLeft;
  document.querySelector(".timer").classList.remove("animatable");
}

function triggerNextButton() {
  const button = document.querySelector(".btn-next");
  button.click();
}

function getRandom(nQuestions) {
  const numRandom = Math.floor(Math.random() * nQuestions);
  return numRandom;
}

function printQuestion(arrayQuestions) {
  runTimer(document.querySelector(".timer"));
  const question = document.querySelector(".question > p");
  const index = getRandom(arrayQuestions.length);
  const myQuestion = arrayQuestions[index];
  question.innerHTML = myQuestion.question;

  return myQuestion;
}

let selectedAnswer = "";

function printAnswers(objQuestion) {
  const arrayAnswers = [];
  const divAnswersConteiner = document.querySelector(".wrap-answers");

  arrayAnswers.push(objQuestion.correct_answer);
  objQuestion.incorrect_answers.forEach((el) => {
    arrayAnswers.push(el);
  });
  arrayAnswers.sort();

  for (const answr of arrayAnswers) {
    const divAnswer = document.createElement("div");
    divAnswer.classList.add("answer");

    divAnswer.addEventListener("click", () => {
      document.querySelectorAll(".answer").forEach((a) => a.classList.remove("bg"));
      divAnswer.classList.add("bg");
      (divAnswer.textContent);
      selectedAnswer = divAnswer.textContent;
    });

    divAnswer.innerHTML = answr;
    divAnswersConteiner.append(divAnswer);
  }
}

let countCorrect = 0;
let countIncorrect = 0;
export { countCorrect, countIncorrect };

const checkAnswer = (answerToCheck, correctAnswer) => {
  if (answerToCheck == correctAnswer) {
    countCorrect += 1;
  } else {
    countIncorrect += 1;
  }
};



const getRemainQuestions = (arrayQuestions, oldQuestions) => {
  arrayQuestions.map((question) => {
    const index = arrayQuestions.indexOf(question);
    if (oldQuestions.find((q) => q.question == question.question)) {
      arrayQuestions.splice(index, 1);
    }
  });
  return arrayQuestions;
};

const removeOldAnswers = () => {
  const divAnswersConteiner = document.querySelector(".wrap-answers");
  divAnswersConteiner.innerHTML = null;
};

// const chagePage = () => {
//   const btnChange = document.querySelector('#chagePage');
//   btnChange.style.display = 'block';
// }

const numberOfQuestion = (questionIncrease) => {
  const numberOfQuestion = document.querySelector('#number-of-question');
  numberOfQuestion.innerHTML = `DOMANDA ${questionIncrease} / 10`;
}

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy")
  .then((res) => res.json())
  .then((el) => {
    const arrayQuestions = el.results;
    const oldQuestions = [];
    let questionIncrease = 1;

    const myQuestion = printQuestion(arrayQuestions);
    oldQuestions.push(myQuestion);
    numberOfQuestion(questionIncrease);
    printAnswers(myQuestion);
    const next = document.querySelector(".btn-next");
    next.addEventListener("click", () => {

      if (arrayQuestions.length == 1) {
        next.classList.add('bg1')
        next.innerHTML = 'INVIA';
      } if (arrayQuestions.length == 0) {
        window.location.href = '../Results Page/resultPage.html'
      }
      if (questionIncrease != 10) {
        questionIncrease ++
      }
      numberOfQuestion(questionIncrease)
      checkAnswer(selectedAnswer, myQuestion.correct_answer);
      // runTimer();
      const myNewQuestion = printQuestion(getRemainQuestions(arrayQuestions, oldQuestions));
      oldQuestions.push(myNewQuestion);
      removeOldAnswers();
      printAnswers(myNewQuestion);

      resetCountdown();
    });
  });