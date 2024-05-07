const Groq = require("groq-sdk");
GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({
  apiKey: GROQ_API_KEY,
});
async function main(message) {
  const chatCompletion = await getGroqChatCompletion(message);
  // Print the completion returned by the LLM.
  // process.stdout.write(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion.choices[0]?.message?.content || "";
}
async function getGroqChatCompletion(message) {
  
  return groq.chat.completions.create({
    messages: message,
    model:"llama3-70b-8192",
  });
}
module.exports = {
  main,
  getGroqChatCompletion,
};
