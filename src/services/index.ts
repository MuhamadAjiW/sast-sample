import { SystemService } from "../cases/command-injection";
import { EnvSecretsService } from "../cases/env-secrets";
import { ConfigService } from "../cases/hardcoded-secrets";
import { FileService } from "../cases/path-traversal";
import { VulnerableAIService } from "../cases/prompt-injection";
import { DatabaseService } from "../cases/sql-injection";

export const dbService = new DatabaseService();
export const fileService = new FileService();
export const systemService = new SystemService();
export const configService = new ConfigService();
export const aiService = new VulnerableAIService();
export const envService = new EnvSecretsService();
