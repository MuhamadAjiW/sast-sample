import Fastify from "fastify";
import { swaggerConfig, swaggerUIConfig } from "./config/swagger";
import { registerRoutes } from "./routes";

const fastify = Fastify({ logger: true });

// Register Swagger
fastify.register(require("@fastify/swagger"), swaggerConfig);
fastify.register(require("@fastify/swagger-ui"), swaggerUIConfig);

// Register all routes
fastify.register(registerRoutes);

export default fastify;
