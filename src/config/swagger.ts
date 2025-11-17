export const swaggerConfig = {
	openapi: {
		openapi: "3.0.0",
		info: {
			title: "Vulnerable API for Security Testing",
			description: "API with intentional vulnerabilities for SAST testing",
			version: "1.0.0",
		},
		servers: [{ url: "http://localhost:3000" }],
	},
};

export const swaggerUIConfig = {
	routePrefix: "/docs",
	uiConfig: {
		docExpansion: "full",
		deepLinking: false,
	},
};
