const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "What year did Kobe Bryant get drafted in?",
        choice1: "<1995>",
        choice2: "<1996>",
        choice3: "<1997>",
        choice4: "<1998>",
        answer: 2,
    },
    {
        question: "How many championships have the Lakers won?",
        choice1: "<15>",
        choice2: "<20>",
        choice3: "<17>",
        choice4: "<18>",
        answer: 3,
    },
    {
        question: "On what team did Kobe Bryant score 81 pts on?",
        choice1: "<Celtics>",
        choice2: "<Nuggets>",
        choice3: "<Suns>",
        choice4: "<Raptors>",
        answer: 4,
    },
    {
        question: "What year did the Lakers trade for Pau Gasol?",
        choice1: "<2008>",
        choice2: "<2006>",
        choice3: "<2005>",
        choice4: "<2007>",
        answer: 1,
    },
    {
        question: "What year did the Lakers Three Peat start?",
        choice1: "<2001>",
        choice2: "<2000>",
        choice3: "<1999>",
        choice4: "<2002>",
        answer: 2,
    },
    {
        question: "Who was the only Laker to win Sixth Man of the Year?",
        choice1: "<Lou Williams>",
        choice2: "<Ron Artest>",
        choice3: "<Lamar Odom>",
        choice4: "<Shannon Brown>",
        answer: 3,
    },
    {
        question: "What was Kobe's middle name?",
        choice1: "<Mamba>",
        choice2: "<Jellybean>",
        choice3: "<Bean>",
        choice4: "<Black Mamba>",
        answer: 3,
    },
    {
        question: "What coach for the Lakers won the most championships?",
        choice1: "<John Kundla>",
        choice2: "<Pat Riley>",
        choice3: "<Bill Sharman>",
        choice4: "<Phil Jackson>",
        answer: 1,
    },
    {
        question: "What player did the Lakers draft twice?",
        choice1: "<Magic Johnson>",
        choice2: "<Elgin Baylor>",
        choice3: "<Jerry West>",
        choice4: "<Kobe Bryant>",
        answer: 2,
    },
    {
        question: "What Laker player scored the most pts in there final career game?",
        choice1: "<Shaq>",
        choice2: "<Magic Johnson>",
        choice3: "<Kareem Abdul-Jabbar>",
        choice4: "<Kobe Bryant>",
        answer: 4,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
  };
  
  getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      //go to the end page
      return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = ` ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;
  
    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });
  
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };
  
  choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
  
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
  
  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };
  
  startGame();