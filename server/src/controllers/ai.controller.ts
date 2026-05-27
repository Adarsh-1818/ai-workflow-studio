import { Request, Response } from "express";

export const generateResponse = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    console.log("MOCK AI HIT:", prompt);

    const result = `
🤖 Mock AI Response

You asked: "${prompt}"

Here’s a structured answer:

1. Understand the problem
2. Break it down
3. Think step by step
4. Provide solution

💡 This is a mock response (OpenAI disabled)
`;

    return res.json({ result });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Mock AI failed" });
  }
};