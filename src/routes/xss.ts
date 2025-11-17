import type { FastifyInstance } from "fastify";
import { unsafeHtmlGeneration } from "../cases/xss-vulnerability";

export async function xssRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/render",
		{
			schema: {
				summary: "Render HTML (XSS vulnerable)",
				tags: ["XSS"],
				querystring: {
					type: "object",
					properties: { name: { type: "string" } },
					required: ["name"],
				},
			},
		},
		async (request) => {
			const { name } = request.query as { name: string };
			return { html: unsafeHtmlGeneration(name) };
		},
	);
}
