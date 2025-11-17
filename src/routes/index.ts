import type { FastifyInstance } from "fastify";
import { commandInjectionRoutes } from "./command-injection";
import { pathTraversalRoutes } from "./path-traversal";
import { promptInjectionRoutes } from "./prompt-injection";
import { secretsRoutes } from "./secrets";
import { sqlInjectionRoutes } from "./sql-injection";
import { xssRoutes } from "./xss";

export async function registerRoutes(fastify: FastifyInstance) {
	await fastify.register(sqlInjectionRoutes);
	await fastify.register(pathTraversalRoutes);
	await fastify.register(xssRoutes);
	await fastify.register(commandInjectionRoutes);
	await fastify.register(secretsRoutes);
	await fastify.register(promptInjectionRoutes);
}
