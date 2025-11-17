import type { FastifyInstance } from "fastify";
import {
	executeUserCommand,
	unsafeSystemCall,
} from "../cases/command-injection";

export async function commandInjectionRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/exec",
		{
			schema: {
				summary: "Execute command (Command Injection vulnerable)",
				tags: ["Command Injection"],
				querystring: {
					type: "object",
					properties: { cmd: { type: "string" } },
					required: ["cmd"],
				},
			},
		},
		async (request) => {
			const { cmd } = request.query as { cmd: string };
			executeUserCommand(cmd);
			return { message: "Command executed" };
		},
	);

	fastify.get(
		"/cat",
		{
			schema: {
				summary: "Process file (Command Injection vulnerable)",
				tags: ["Command Injection"],
				querystring: {
					type: "object",
					properties: { file: { type: "string" } },
					required: ["file"],
				},
			},
		},
		async (request) => {
			const { file } = request.query as { file: string };
			unsafeSystemCall(file);
			return { message: "File processed" };
		},
	);
}
