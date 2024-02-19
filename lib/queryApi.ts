import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai.chat.completions
    .create({
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => {
      res.choices[0].message.content;
    })
    .catch((e) => {
      return `Chat GPT was unable to generate a completion Error:  ${e}`;
    });

  return res
}

export {
  query
}
