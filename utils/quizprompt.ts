export const QUIZ_PROMPT = `
You are a quiz generator.

Create 10 multiple-choice questions from this PDF.

Return ONLY valid JSON.

Schema:

{
  "questions": [
    {
      "question": "string",
      "options": ["string","string","string","string"],
      "correctAnswerIndex": 0,
      "explanation": "string"
    }
  ]
}

Rules:
- Exactly 4 options.
- Only one correct answer.
- Questions should test understanding, not memorization.
- Return valid JSON only.
`