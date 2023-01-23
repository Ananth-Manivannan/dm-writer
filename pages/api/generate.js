import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Suggest a personalized, genuine sales intro sentence (just one sentence) on linkedin, for someone with this profile bio: 
Bio: Joel Kuhn, CEO of The Matic Greys LLC is a New York Native as well as an NFT creator, entrepreneur and artist. He has a BSBA in marketing and management, 20 years of experience in sales/sales management, and an entrepreneural history in online retail. Most recently he also created a line of designer art toys prior to entering the NFT space. Joel has a passion for digital art, extraterrestrial phenomenon, crypto, the metaverse, and raising his 4 children alongside his partner Chelsea Duffy. 
Personalized Intro:
Hi Joel,I have loved watching the dev of TCG world for theMaticGreys,
and that you are built on Polygon.As a recent polygon grant recipient,
I would love to speak with you about what I am building to get your feedback.
Please let me know if you'd be willing to connect.Thanks!
Bio: 2 years of web3 experience contributing to one of the most innovative projects in the space : CyberKongz.
10 years of hospitality experience at some of the top restaurants in the world.
29 years of entrepreneurial drive.Currently exploring the synergies of technology and food.
Personalized Intro:
Hi there,
I have loved following the journey of Cyberkongz  and am inspired by your 10 years of hospitality experience at some of the top restaurants in the world. I'm currently exploring the synergies of technology and food and would love to hear your thoughts on the potential opportunities. Would you be willing to connect to discuss further?
Bio:`;
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