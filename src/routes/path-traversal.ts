import type { FastifyInstance } from "fastify";
import { readUserFile, unsafeFileAccess } from "../cases/path-traversal";

export async function pathTraversalRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/file",
		{
			schema: {
				summary: "Read file (Path Traversal vulnerable)",
				tags: ["Path Traversal"],
				querystring: {
					type: "object",
					properties: { path: { type: "string" } },
					required: ["path"],
				},
			},
		},
		async (request) => {
			const { path } = request.query as { path: string };
			return { content: readUserFile(path) };
		},
	);

	fastify.get(
		"/upload",
		{
			schema: {
				summary: "Access upload file (Path Traversal vulnerable)",
				tags: ["Path Traversal"],
				querystring: {
					type: "object",
					properties: { file: { type: "string" } },
					required: ["file"],
				},
			},
		},
		async (request) => {
			const { file } = request.query as { file: string };
			return { content: unsafeFileAccess(file).toString() };
		},
	);
}
