//starts quiz with button click
function startQuiz() {
$('#start').on('click', function(event){
renderQuestion();
});
}

//qustion number and score display
function updateQuestionAndScore() {
const html = $(`<ul> <li id="js-answered">Question Number: ${STORE.currentQuestion +1} of ${STORE.questions.length}
</li>
</ul>`);
$(".question-and-score").html(html);
}

//update question choices
function updateChoices() {
let question = STORE.questions[STORE.currentQuestion];
for(let i = 0; i < question.choices.length; i++) {
$('.js-choices').append(`<input type = "radio" name = "choices" id= "choice${i+1}" value="${question.choices[i]}" tabindex = "${i+1}">
<label for="choice${i+1}"> ${question.choices[i]} </label> <br/>
<span id="js-id${i+1}"></span>`
);
}
}

//render question
function renderQuestion() {
let question = STORE.questions[STORE.currentQuestion];
updateQuestionAndScore();
const questionHtml = $(`<div>
<form id="js-questions" class = "question-form">
<fieldset>
<div class = "lookGood question">
<div class = "lookGreat">
<legend> ${question.question}</legend>
</div>
</div>

<div class = "lookGood choices">
div class = "lookGreat">
<div class = "js-choices"> </div>
</div>
</div>

<div class ="lookGood">
<div class = "lookGreat">
<button type = "submit" id = "answer" tabindex= "5"> Submit </button>
<button type = "button" id = "next-question" tabindex = "6"> Next </button>
</div>
</div>
</fieldset>
</form>
</div>`);
$("main").html(questionHtml);
updateChoices();
$("#next-question").hide();
}

function handleChoice() {
$('body').on("submit", "#js-questions", function (event) {
event.preventDefault();
let currentQues = STORE.questions[STORE.currentQuestion];
let selectedChoice = $("input[name=choices]:checked").val();
if(!selectedChoice) {
alert ("You must choose an option to continue");
return;
}
let id_num = currentQues.choices.findIndex(i => i === selectedChoice);
let id = "#js-id" + ++id_num;
$('span').removeClass("correct-answer incorrect-answer");
if(selectedChoice === currentQues.answer) {
STORE.score++;
$(`${id}`).append(`That is correct!<br/>`);
$(`${id}`).addClass("correct-answer");
} else {
  $(`${id}`).append(`That is incorrect.  The correct answer is "${currentQues.answer}"<br/>`);
  $(`${id}`).addClass("incorrect-answer");
}
  STORE.currentQuestion++;
  $('#js-score').text(`Score: ${STORE.score} out of ${STORE.questions.length}`);
  $('#answer').hide();
  $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
});
}

function displayResults() {
  let resultHtml = $( `<div class = "results"><form id= "js-start-over"><fieldset>
<div class = "lookGood">
<div class = "lookGreat">
<legend> Your score is: ${STORE.score} out of ${STORE.questions.length}</legend>
</div>
</div>

<div class = "lookGood">
<div class = "lookGreat">
<button type="button" id="restart"> Restart </button>
</div>
</div>
</fieldset>
</form>
</div>`);
  STORE.currentQuestion = 0;
  STORE.score = 0;
  $("main").html(resultHtml);
}

function handleQuestions() {
  $('body').on('click', '#next-question', (event) => {
               STORE.currentQuestion === STORE.questions.length?
               displayResults() : renderQuestion();
});
}

function startOver() {
  $('body').on('click', '#restart', (event) => {
    renderQuestion();
  });
}

function pageLoad() {
  startQuiz();
  handleQuestions();
  handleChoice();
  startOver();
}

$(pageLoad);


