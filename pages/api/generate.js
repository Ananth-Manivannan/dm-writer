import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Write me a one sentence personalized cold linkedin message to a person with the following bio, suggesting that we connect regarding the platform I work on, UserTesting, which helps companies get qualatative insights from their customers. The goal is to eventually sell them to use my platform, but conceal that for now. Focus on building a relationship and having a casual conversation. Include something personalized about the bio.

Bio:

Turing is the fastest way to develop better consumer products using data and AI. Backed by notable Silicon Valley Investors including Y-combinator. 

We are building a world class software team. Please reach out if you are a Rockstar ML/sofwtare engineer!

Ajith previously founded Dextro Analytics, with the vision of integrating analytics and technology to help global companies solve the same problem differently. He pioneered in utilizing novel approaches and creating cloud-based products in the form of decision support systems. He has worked with over 50 global companies to help them improve their effectiveness in marketing, operations, and supply chain. He has worked with global brands such as Dell, Coke, Sanofi, Microsoft and also provided services to the government and public sector including the Department of Defense and Workforce Development Authority.
 
Ajith specializes in a wide range of machine learning, causality, and artificial intelligence algorithms. He has extensive experience in novel techniques such as Deep Learning, Neural Networks, Bayesian Networks, etc. and is an expert in building cloud-based applications.
 
Ajith is a Computer Science graduate from Amrita University. He was awarded at the national level at IBM "The Great Mind Challenge" for creating a path-breaking cloud-based application for the Retail industry. He was also deeply associated with IIM, Bangalore in the form of a strategic partnership.


Message: Hi Ajith, I noticed that you have extensive experience in Machine Learning and Artificial Intelligence. I'm working on a platform called UserTesting which helps companies get qualitative and quantitative insights from their customers - it sounds like something that could be of use to you! Would love to connect and chat more about your experiences in the industry.

Bio: 

Hands-on Executive and Entrepreneur with more than 30 years of experience, a track record of rapid and successful global product development, and a proven ability to develop and ship products across a broad range of technical markets. Strong team building and leadership experience coupled with a bias for innovation and core technology development.

Message: 

Hi [Name], I saw your impressive portfolio of accomplishments and thought it would be great to connect. Would love to hear more about how you develop successful products across a broad range of markets - could you share some insights? Best, [Your Name]

Bio:

Leverage internal data and integrate with external market data to make better decisions to accelerate value creation. Apply Now, Next and Néw framework to simultaneously exploit current assets to defend business model while simultaneously exploring opportunities for exponential value creation. Opportunity to collaborate through Digital Foundry 360 - an external ecosystem focused on accelerating value creation and monetization beyond traditional organizational boundaries and business models.

Message:

Hi [Name], I noticed that you specialize in leveraging internal data and integrating with external market data to create value. That's something we focus on a lot at UserTesting - our platform helps companies get qualitative and quantitative insights from their customers, which can be used to make better decisions. Would love to connect and learn more about your experiences!

Bio:
`;
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