// Environment variable secrets exposure vulnerability
export class EnvSecretsService {
	// Directly exposing environment variables
	getApiKey() {
		return (
			process.env.OPENAI_API_KEY ||
			"sk-proj-1234567890abcdefghijklmnopqrstuvwxyz"
		);
	}

	getDatabaseUrl() {
		return (
			process.env.DATABASE_URL ||
			"postgresql://admin:supersecret123@localhost:5432/myapp"
		);
	}

	// Logging sensitive environment variables
	debugConfig() {
		console.log("Config:", {
			apiKey: process.env.OPENAI_API_KEY,
			dbUrl: process.env.DATABASE_URL,
			jwtSecret: process.env.JWT_SECRET,
		});
	}

	// Returning all environment variables (potential secrets exposure)
	getAllEnvVars() {
		return process.env;
	}
}
