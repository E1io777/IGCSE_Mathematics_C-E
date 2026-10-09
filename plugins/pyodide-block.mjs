/**
 * MyST v2 JavaScript plugin.
 *
 * Directives:
 * - pyodide-cell: embeds a Python code cell for the existing frontend transform.
 * - math-quiz: creates structured quiz markup that the frontend turns into
 *   real answer buttons. Structured MyST nodes are used instead of raw HTML.
 */

const pyodideCellDirective = {
  name: 'pyodide-cell',
  doc: 'Embed an interactive Pyodide Python cell.',
  alias: ['python-cell'],
  arg: { type: String, doc: 'Optional cell ID' },
  options: {
    id: { type: String, doc: 'Unique cell identifier' },
  },
  body: { type: String, doc: 'Python source code' },
  run(data) {
    const cellId =
      data.options?.id ??
      data.arg ??
      `pyodide-${Math.random().toString(36).slice(2, 9)}`;
    const code = data.body ?? '';

    return [
      {
        type: 'div',
        class: 'pyodide-cell',
        identifier: cellId,
        children: [
          {
            type: 'code',
            lang: 'python',
            value: code,
          },
        ],
      },
    ];
  },
};

const mathQuizDirective = {
  name: 'math-quiz',
  doc: 'Create a multiple-choice maths question with instant feedback.',
  options: {
    question: { type: String, doc: 'Question shown to the student' },
    choices: { type: String, doc: 'Comma-separated answer choices' },
    correct: { type: Number, doc: 'Zero-based index of the correct choice' },
  },
  run(data) {
    const question = data.options?.question ?? 'Choose the correct answer.';
    const choices = (data.options?.choices ?? '')
      .split(',')
      .map((choice) => choice.trim())
      .filter(Boolean);
    const correct = Number(data.options?.correct ?? 0);
    const safeCorrect = Number.isInteger(correct) && correct >= 0 && correct < choices.length
      ? correct
      : 0;

    return [
      {
        type: 'div',
        class: `math-quiz math-quiz-correct-${safeCorrect}`,
        identifier: data.options?.id ?? `math-quiz-${Math.random().toString(36).slice(2, 9)}`,
        children: [
          {
            type: 'div',
            class: 'quiz-question',
            children: [{ type: 'paragraph', children: [{ type: 'text', value: question }] }],
          },
          {
            type: 'div',
            class: 'quiz-choices',
            children: choices.map((choice, index) => ({
              type: 'div',
              class: `quiz-choice quiz-choice-${index}`,
              children: [{ type: 'paragraph', children: [{ type: 'text', value: choice }] }],
            })),
          },
          {
            type: 'div',
            class: 'quiz-feedback',
            children: [],
          },
        ],
      },
    ];
  },
};

export default {
  name: 'Interactive Learning Blocks',
  directives: [pyodideCellDirective, mathQuizDirective],
};
