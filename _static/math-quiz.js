(() => {
  function initialiseMathQuizzes() {
    document.querySelectorAll(".math-quiz").forEach((quiz) => {
      if (quiz.dataset.quizReady === "true") return;

      const choices = quiz.querySelectorAll(".quiz-choice");
      if (!choices.length) return;

      choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "math-quiz-answer";
        button.textContent = choice.textContent.trim();
        button.setAttribute("aria-pressed", "false");
        button.dataset.answer = String(index);
        choice.replaceWith(button);
      });

      const feedback = quiz.querySelector(".quiz-feedback");
      if (feedback) feedback.setAttribute("aria-live", "polite");
      quiz.dataset.quizReady = "true";
      quiz.dataset.selected = "";
    });
  }

  function handleQuizClick(event) {
    const button = event.target.closest(".math-quiz-answer");
    if (!button) return;

    const quiz = button.closest(".math-quiz");
    if (!quiz) return;

    const feedback = quiz.querySelector(".quiz-feedback");
    quiz.querySelectorAll(".math-quiz-answer").forEach((answer) => {
      answer.setAttribute("aria-pressed", answer === button ? "true" : "false");
    });

    quiz.dataset.selected = button.dataset.answer;
    const correctMatch = quiz.className.match(/(?:^|\\s)math-quiz-correct-(\\d+)(?:\\s|$)/);
    const correct = correctMatch ? correctMatch[1] : "0";

    if (feedback) {
      if (quiz.dataset.selected === correct) {
        feedback.textContent = "Correct! Well done.";
        feedback.classList.add("is-correct");
        feedback.classList.remove("is-incorrect");
      } else {
        feedback.textContent = "Not quite. Try again!";
        feedback.classList.add("is-incorrect");
        feedback.classList.remove("is-correct");
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseMathQuizzes);
  } else {
    initialiseMathQuizzes();
  }

  document.addEventListener("click", handleQuizClick);
  // Re-initialise if the book theme inserts page content after initial load.
  new MutationObserver(initialiseMathQuizzes).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
