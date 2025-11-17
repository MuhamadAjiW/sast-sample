import type { FastifyInstance } from "fastify";
import { API_KEY, connectToDatabase } from "../cases/hardcoded-secrets";
import { configService, envService } from "../services";

export async function secretsRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/config",
		{
			schema: {
				summary: "Get configuration (Hardcoded Secrets)",
				tags: ["Hardcoded Secrets"],
				querystring: {},
			},
		},
		async () => {
			return {
				apiKey: API_KEY,
				dbConnection: connectToDatabase(),
				awsCredentials: configService.getAwsCredentials(),
			};
		},
	);

	fastify.get(
		"/env",
		{
			schema: {
				summary: "Get environment variables (Environment Secrets)",
				tags: ["Environment Secrets"],
				querystring: {},
			},
		},
		async () => {
			return { env: envService.getAllEnvVars() };
		},
	);

	fastify.get(
		"/debug",
		{
			schema: {
				summary: "Debug configuration (Environment Secrets)",
				tags: ["Environment Secrets"],
				querystring: {},
			},
		},
		async () => {
			envService.debugConfig();
			return { message: "Debug info logged" };
		},
	);
}
