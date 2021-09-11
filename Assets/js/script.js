document.addEventListener('DOMContentLoaded', () => {

  var questions = [{
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "Who founded/created JavaScript",
      choices: ["Marco Polo", "Bill Gates", "Brendan Eich", "Thomas Jefferson"],
      answer: "Brendan Eich"
    },
    {
      title: "What is JQuery?",
      choices: ["a type of sandwitch", "a JavaScript library", "a pizza topping", "a show on cartoon network"],
      answer: "a JavaScript library"
    },
    {
      title: "What does the Array push() Method do?",
      choices: ["adds new items to the end of an array, and returns the new length.", "Removes an item by index position", "Copys an Array", "Loop over an Array"],
      answer: "adds new items to the end of an array, and returns the new length."
    },
    {
      title: "What does DOM stand for?",
      choices: ["Direction of Motion", "Drinks on Me", "Disaster Operations Manual", "Document Object Model"],
      answer: "Document Object Model"
    },
  ];

  var startTime = 75;
  var score;
  var timeLeft = startTime;
  var scoresArray = [];
  var scoresList = $('#scores-list');
  var scoreCount = $('#scores-count');
  var sections = document.querySelectorAll("section"); // all sections
  var qCount = 0;
  var clock;
  var questionRightWrong = $('#questionRightWrong');
  var timeLeftEl = $('#time');
  var questionTitleEl = $('#questionTitle');
  var choiceOneEl = $('#choiceOne');
  var choiceTwoEl = $('#choiceTwo');
  var choiceThreeEl = $('#choiceThree');
  var choiceFourEl = $('#choiceFour');
  var choices = document.querySelectorAll('#quiz button'); // all answer option buttons
  var startBtn = $('#startBtn');
  var clearScoresBtn = $('#clearScores');
  var highScoresBtn = $('#highScoresBtn');
  var resetBtn = $('#reset');
  var submitBtn = $('#submit');

  resetBtn.on("click", function() { // reset button
    timeLeft = startTime;
    timeLeftEl.text(timeLeft);
    qCount = 0;
    onlyShow("#startPage");
  });

  highScoresBtn.on("click", function() { // view high scores button
    onlyShow("#highScores");
    highScores();
  });

  submitBtn.on("click", function() { // submit button for highscores
    var initials = $('input[id="initials"]');
    var score = timeLeft;
    scoresArray.push({
      "initials": initials.val(),
      "score": score
    });
    localStorage.setItem("scores", JSON.stringify(scoresArray));
    onlyShow("#highScores");
    highScores();
  });

  startBtn.on("click", function() {
    onlyShow("#quiz");
    setQuestionData();
    clock = setInterval(myTimer, 1000);
  });

  clearScoresBtn.on("click", function() { //clear high scores button clears everything(i think)
    localStorage.clear();
    scoresList.text(null);
    scoreCount.text("Score Count: ");
    score = null;
    storedScores = null;
    scoresArray = [];
    questionRightWrong.text(null);
    alert("cleared");
  });

  function highScores() {
    clearInterval(clock);
    scoresList.text("");
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
      scoresArray = storedScores;
    }
    scoreCount.text("Score Count: " + scoresArray.length);

    for (var i = 0; i < scoresArray.length; i++) { //display highscores
      var tempScore = scoresArray[i];
      var li = document.createElement("li");
      li.textContent = (tempScore.initials + " " + tempScore.score);
      li.setAttribute("data-index", i);
      scoresList.append(li);
    }
  }

  function setQuestionData() {
    if (qCount > 4) {
      score = timeLeft;
      clearInterval(clock);
      onlyShow("#complete");
    } else {
      questionTitleEl.text(questions[qCount].title);
      choiceOneEl.text(questions[qCount].choices[0]);
      choiceTwoEl.text(questions[qCount].choices[1]);
      choiceThreeEl.text(questions[qCount].choices[2]);
      choiceFourEl.text(questions[qCount].choices[3]);
      questionCheck();
    }
  }

  function questionCheck() {
    for (var i = 0; i < choices.length; i++) {
      choices[i].addEventListener("click", function() {
        if (event.currentTarget.textContent === questions[qCount].answer) {
          event.stopImmediatePropagation();
          questionRightWrong.text("Correct");
          qCount++;
          setQuestionData();
        } else {
          event.stopImmediatePropagation();
          questionRightWrong.text("Wrong");
          timeLeft = timeLeft - 10;
        }
      })
    }
  }

  function myTimer() {
    if (timeLeft > 0) {
      timeLeft = timeLeft - 1;
      timeLeftEl.text(timeLeft);
    } else if (timeLeft <= 0) {
      alert("out of time");
      onlyShow("#complete");
      highScores();
      return;
    }
  }

  function onlyShow(element) {
    Array.from(sections).forEach((userItem) => {
      userItem.classList.add('hide');
      userItem.style.display = null;
    });
    $(element).toggle(400);
  }
});
