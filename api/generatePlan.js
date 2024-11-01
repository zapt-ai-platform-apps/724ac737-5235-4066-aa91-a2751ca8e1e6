import * as Sentry from "@sentry/node";
import { Configuration, OpenAIApi } from 'openai';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ message: 'Prompt is required' });
    return;
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 1500,
      temperature: 0.7,
    });

    const plan = completion.data.choices[0].text.trim();

    res.status(200).json({ plan });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error generating plan:', error);
    res.status(500).json({ message: 'Error generating plan' });
  }
}