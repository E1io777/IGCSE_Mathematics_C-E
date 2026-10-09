document.addEventListener("click", function (event) {
  const button = event.target.closest(".math-quiz button");

  if (!button) return;

  const quiz = button.closest(".math-quiz");
  const feedback = quiz.querySelector(".quiz-feedback");

  if (button.dataset.answer) {
    quiz.querySelectorAll("button[data-answer]").forEach((item) => {
      item.setAttribute("aria-pressed", "false");
    });

    button.setAttribute("aria-pressed", "true");
    quiz.dataset.selected = button.dataset.answer;
    feedback.textContent = "";
  }

  if (button.classList.contains("check-answer")) {
    const selected = quiz.dataset.selected;
    const correct = quiz.dataset.correct;

    if (!selected) {
      feedback.textContent = "Choose an answer first.";
    } else if (selected === correct) {
      feedback.textContent = "Correct! Well done.";
    } else {
      feedback.textContent = "Not quite. Try again!";
    }
  }
});
