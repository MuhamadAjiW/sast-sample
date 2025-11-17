import type { FastifyInstance } from "fastify";
import { unsafeChatbot, unsafeEmailGenerator } from "../cases/prompt-injection";
import { aiService } from "../services";

export async function promptInjectionRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/chat",
		{
			schema: {
				summary: "Chat with AI (Prompt Injection vulnerable)",
				tags: ["Prompt Injection"],
				querystring: {
					type: "object",
					properties: { message: { type: "string" } },
					required: ["message"],
				},
			},
		},
		async (request) => {
			const { message } = request.query as { message: string };
			const response = await unsafeChatbot(message);
			return { response: response.text };
		},
	);

	fastify.get(
		"/email",
		{
			schema: {
				summary: "Generate email (Prompt Injection vulnerable)",
				tags: ["Prompt Injection"],
				querystring: {
					type: "object",
					properties: {
						name: { type: "string" },
						content: { type: "string" },
					},
					required: ["name", "content"],
				},
			},
		},
		async (request) => {
			const { name, content } = request.query as {
				name: string;
				content: string;
			};
			const email = await unsafeEmailGenerator(name, content);
			return { email: email.text };
		},
	);

	fastify.get(
		"/translate",
		{
			schema: {
				summary: "Translate text (Prompt Injection vulnerable)",
				tags: ["Prompt Injection"],
				querystring: {
					type: "object",
					properties: {
						text: { type: "string" },
						lang: { type: "string" },
					},
					required: ["text", "lang"],
				},
			},
		},
		async (request) => {
			const { text, lang } = request.query as { text: string; lang: string };
			const translation = await aiService.translateText(text, lang);
			return { translation: translation.text };
		},
	);
}
