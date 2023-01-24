import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Write me a one sentence personalized cold linkedin message to a person with the following bio, suggesting that we connect regarding the platform I work on, UserTesting, which helps companies get qualatative and quantative insights from their customers. The goal is to eventually sell them to use my platform, but conceal that for now. Focus on building a relationship and having a casual conversation. Include something personalized about the bio:`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.85,
    max_tokens: 500,
    frequency_penalty: 1,
    presence_penalty: 0.78
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;