"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
/* const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}); */
/* export const generateAIResponse = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}; */
const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        const responses = [
            "That's an interesting question. Let me think...",
            "Here's what I would suggest based on your input:",
            "From an AI perspective, this can be approached like this:",
            "Good question! Breaking it down:",
        ];
        const random = responses[Math.floor(Math.random() * responses.length)];
        const result = `
  🤖 AI Assistant
  
  ${random}
  
  You asked: "${prompt}"
  
  👉 Here’s a structured answer:
  - Step 1: Understand the problem
  - Step 2: Break it into parts
  - Step 3: Solve iteratively
  - Step 4: Validate output
  
  💡 Tip: Try refining your prompt for better results.
  `;
        res.json({ result });
    }
    catch (err) {
        res.status(500).json({ message: "AI error" });
    }
};
exports.generateResponse = generateResponse;
