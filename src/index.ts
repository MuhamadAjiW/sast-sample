import fastify from "./server";

const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
		console.log("Vulnerable API server running on http://localhost:3000");
		console.log(
			"OpenAPI documentation available at http://localhost:3000/docs",
		);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
