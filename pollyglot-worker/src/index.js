import OpenAI from 'openai';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Content-Type': 'application/json',
};
export default {
	async fetch(request, env, ctx) {
		 console.log(env.OPENROUTER_API_KEY);
    console.log(env.API_URL);
    console.log(env.AI_MODEL);
			if (request.method === 'OPTIONS') {
			return new Response(null,
			{ status: 204, headers:corsHeaders });
		 }
		if (request.method !== 'POST') {
			return new Response(
				JSON.stringify({
					error: 'Method not allowed ',
				}),
				{status: 405, headers: corsHeaders,},
			);
		}
		try {
			const body = await request.json();
			const { text, language } = body;
			const prompt = `You are a professional translator.
        Task:
        Translate the user text into ${language}.
        Rules:
        - Return ONLY the translation
        - Do NOT add explanations
        - Do NOT add extra text
        - Keep the meaning natural`;
			const openai = new OpenAI({
				apiKey: env.OPENROUTER_API_KEY,
				baseURL: env.API_URL,
			});
			const response = await openai.chat.completions.create({
				model: env.AI_MODEL,
				messages: [
					{ role: 'system', content: prompt },
					{ role: 'user', content: text },
				],
				temperature: 0.3,
				max_tokens: 500,
			});
			const translation = response.choices[0].message.content;
			if (!translation) {
				return new Response(
					JSON.stringify({
						error: 'No translation returned from AI',
					}),
					{
						status: 502,
						headers: corsHeaders,
					},
				);
			}
			return new Response(
				JSON.stringify({
					translation,
				}),
				{
					status: 200,
					headers: corsHeaders,
				},
			);
		} catch (error) {
			return new Response(
				JSON.stringify({
					error: error.message || 'Internal server error',
				}),
				{
					status: error.status || 500,
					headers:corsHeaders
				},
			);
		}
	},
};
