let categories = document.querySelectorAll(".cat");
let catselect = "";
let difficultiesselect = "";
let points = 0;

categories.forEach((category) => {
  category.addEventListener("click", () => {
    console.log(category);
    document.querySelector(".category").innerHTML = category.innerHTML;
    catselect = category.innerHTML;
    document.querySelector(".category_dropdown").classList.add("hide");
  });
});

let dificulties = document.querySelectorAll(".difficulties");

dificulties.forEach((difficulty) => {
  difficulty.addEventListener("click", () => {
    console.log(difficulty);
    document.querySelector(".difficulty").innerHTML = difficulty.innerHTML;
    difficultiesselect = difficulty.innerHTML;
    document.querySelector(".difficulty_dropdown").classList.add("hide");
  });
});

let btn = document.getElementById("start-btn");
btn.addEventListener("click", () => {
  console.log(catselect);
  console.log(difficultiesselect);
  if (catselect == "" || difficultiesselect == " ") {
    alert("select category and difficulty first");
  } else {
    sendApiRequest();
    startGame();
    points = 0;
  }
});

function startGame(data) {
  btn.classList.add("hide");
  document.getElementById("question-container").classList.remove("hide");
  shuffledquestion = data;
  currentquestionindex = 0;
}

async function sendApiRequest() {
  let response = await fetch(
    `https://the-trivia-api.com/api/questions?categories=${catselect}&limit=10&region=IN&difficulty=${difficultiesselect}`
  );
  data = await response.json();
  showquestion(data);
}
function showquestion(data) {
  resetState();
  document.getElementById("question").innerHTML =
    data[currentquestionindex].question;
  answer = [
    data[currentquestionindex].correctAnswer,
    data[currentquestionindex].incorrectAnswers[0],
    data[currentquestionindex].incorrectAnswers[1],
    data[currentquestionindex].incorrectAnswers[2],
  ];
  answer.sort(() => Math.random() - 0.5);
  document.querySelector(".btn1").innerHTML = answer[0];
  document.querySelector(".btn2").innerHTML = answer[1];
  document.querySelector(".btn3").innerHTML = answer[2];
  document.querySelector(".btn4").innerHTML = answer[3];
}
let answerbtns = document.querySelectorAll(".btn");

answerbtns.forEach((answerbtn) => {
  answerbtn.addEventListener("click", () => {
    console.log(answerbtn);
    if (answerbtn.innerHTML == data[currentquestionindex].correctAnswer) {
      answerbtn.classList.add("correct");
      document.querySelectorAll(".btn:not(.correct)").forEach((btn) => {
        btn.classList.add("wrong");
      });
      document.querySelector("#next-btn").classList.remove("hide");
      points++;
    } else {
      answerbtn.classList.add("wrong");
      document.querySelectorAll(".btn:not(.wrong)").forEach((btn) => {
        btn.classList.add("disabled");
      });
      document.querySelector(".next-btn").classList.remove("hide");
      document.querySelector(
        ".correctans"
      ).innerHTML = `Answer : ${data[currentquestionindex].correctAnswer}`;
    }
  });
});

document.querySelector(".next-btn").addEventListener("click", () => {
  currentquestionindex++;
  showquestion(data, currentquestionindex);
});

function resetState() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("correct");
  });
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("wrong");
  });
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("disabled");
  });
  document.getElementById("next-btn").classList.add("hide");
  document.querySelector(".correctans").innerHTML = "";

  if (data.length < currentquestionindex + 1) {
    document.querySelectorAll(".answer").forEach((btn) => {
      btn.classList.add("hide");
    });
    document.getElementById("question").classList.add("hide");
    document.querySelector(".restart-btn").classList.remove("hide");
    document.querySelector(
      ".correctans"
    ).innerHTML = `Your Score : ${points} / 10`;
  }
}

document.querySelector(".restart-btn").addEventListener("click", () => {
  location.reload(true);
});
