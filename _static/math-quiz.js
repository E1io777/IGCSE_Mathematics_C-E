(() => {
  function setup() {
    document.querySelectorAll(".math-quiz").forEach((quiz) => {
      if (quiz.dataset.ready === "yes") return;
      const container = quiz.querySelector(".quiz-choices");
      if (!container) return;
      const choices = container.querySelectorAll(".quiz-choice, p");
      choices.forEach((choice, index) => {
        if (!choice.textContent.trim()) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "math-quiz-answer";
        button.textContent = choice.textContent.trim();
        button.dataset.answer = String(index);
        button.setAttribute("aria-pressed", "false");
        choice.replaceWith(button);
      });
      const feedback = quiz.querySelector(".quiz-feedback");
      if (feedback) feedback.setAttribute("aria-live", "polite");
      quiz.dataset.ready = "yes";
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".math-quiz-answer");
    if (!button) return;
    const quiz = button.closest(".math-quiz");
    if (!quiz) return;
    quiz.querySelectorAll(".math-quiz-answer").forEach((item) => {
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
    });
    const correctClass = Array.from(quiz.classList).find((name) => name.startsWith("math-quiz-correct-"));
    const correct = correctClass ? correctClass.substring("math-quiz-correct-".length) : "0";
    const feedback = quiz.querySelector(".quiz-feedback");
    if (!feedback) return;
    const isCorrect = button.dataset.answer === correct;
    feedback.textContent = isCorrect ? "Correct! Well done." : "Not quite. Try again!";
    feedback.classList.toggle("is-correct", isCorrect);
    feedback.classList.toggle("is-incorrect", !isCorrect);
  });

  function start() {
    setup();
    new MutationObserver(setup).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
