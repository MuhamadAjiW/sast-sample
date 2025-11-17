import type { FastifyInstance } from "fastify";
import { unsafeLogin, unsafeQuery } from "../cases/sql-injection";
import { dbService } from "../services";

export async function sqlInjectionRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/user",
		{
			schema: {
				summary: "Get user by ID (SQL Injection vulnerable)",
				tags: ["SQL Injection"],
				querystring: {
					type: "object",
					properties: { id: { type: "string" } },
					required: ["id"],
				},
			},
		},
		async (request) => {
			const { id } = request.query as { id: string };
			return { users: await unsafeQuery(id) };
		},
	);

	fastify.get(
		"/login",
		{
			schema: {
				summary: "User login (SQL Injection vulnerable)",
				tags: ["SQL Injection"],
				querystring: {
					type: "object",
					properties: {
						username: { type: "string" },
						password: { type: "string" },
					},
					required: ["username", "password"],
				},
			},
		},
		async (request) => {
			const { username, password } = request.query as {
				username: string;
				password: string;
			};
			const result = await unsafeLogin(username, password);
			return { authenticated: result.length > 0, user: result[0] };
		},
	);

	fastify.get(
		"/search",
		{
			schema: {
				summary: "Search users (SQL Injection vulnerable)",
				tags: ["SQL Injection"],
				querystring: {
					type: "object",
					properties: { term: { type: "string" } },
					required: ["term"],
				},
			},
		},
		async (request) => {
			const { term } = request.query as { term: string };
			await dbService.connect();
			const results = await dbService.searchUsers(term);
			await dbService.disconnect();
			return { results };
		},
	);
}
