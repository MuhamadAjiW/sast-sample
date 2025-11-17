# SAST Test Cases (Snyk vs SonarQube)

This TypeScript project contains intentionally vulnerable code used to test Snyk's Static Application Security Testing (SAST) findings and compare them to a local SonarQube analysis. It includes a set of vulnerable examples and supporting tooling to run scans and observe results locally.

## What's included

- A small Fastify API with intentionally vulnerable routes (see `src/routes`) that exercise common vulnerabilities.
- Example vulnerabilities in `src/cases/*` used for SAST testing.
- A local SonarQube setup and PostgreSQL data in `sonarqube/` and `postgresql/` folders (for demo purposes).
- Sample scan outputs in `results/` for quick reference.

## Vulnerability Categories

### 1. SQL Injection (`src/cases/sql-injection.ts`)

- Actual PostgreSQL connections with vulnerable queries
- Unsafe query construction with string concatenation
- Direct user input in SQL queries
- Dynamic table/column name injection
- Template literal injection

### 2. Cross-Site Scripting (XSS) (`src/cases/xss-vulnerability.ts`)

- Unsafe innerHTML assignments
- Unescaped user content rendering

### 3. Path Traversal (`src/cases/path-traversal.ts`)

- Unsafe file path construction
- Direct user input in file operations

### 4. Command Injection (`src/cases/command-injection.ts`)

- Unsafe command execution with user input
- Unvalidated system calls

### 5. Hardcoded Secrets (`src/cases/hardcoded-secrets.ts`)

- API keys, passwords, and credentials in source code
- Database connection strings with embedded credentials

### 6. Prompt Injection (`src/cases/prompt-injection.ts`)

- Direct user input concatenation to AI prompts
- Unsafe template construction allowing instruction override

### 7. Environment Secrets (`src/cases/env-secrets.ts`)

- Direct exposure of environment variables containing secrets
- Logging sensitive environment variables
- Returning all environment variables potentially exposing secrets

## Usage

### Prerequisites

- Docker & Docker Compose
- Node 18+ (or a compatible runtime used by `tsx`)
- `pnpm` (preferred; `npm` will also work for many commands)

### Start services (SonarQube & Postgres)

1. Start the demo services:

   ```bash
   docker-compose up -d
   ```

2. Install dependencies (preferred):

   ```bash
   pnpm install
   ```

3. Run the application locally:

   ```bash
   pnpm run build  # compile TypeScript
   pnpm run start  # run the application
   pnpm run dev    # run in development (watch) mode
   ```

The vulnerable API runs by default on [http://localhost:3000](http://localhost:3000) and exposes an OpenAPI page at [http://localhost:3000/docs](http://localhost:3000/docs).

### CLI helpers & cleaning

If you need to reset the docker volumes and demo data, there is a convenience script:

```bash
pnpm run docker:clean
```

### Databases and credentials

The test PostgreSQL database included in this repo will be available on port 5433 with:

- Database: `testdb`
- Username: `testuser`
- Password: `testpass`

## Testing with Snyk

Run Snyk SAST scan:

```bash
snyk code test
```

Tip: If you're only interested in the provided examples and want to reuse the cached results, we've exported some example scan outputs to `results/`.

## Testing with SonarQube

1. Start SonarQube:

   ```bash
   docker-compose up -d
   ```

2. Wait for SonarQube to be ready (check [http://localhost:9000](http://localhost:9000), default credentials: admin/admin)

3. Install dependencies and run analysis:

   ```bash
   pnpm install   # if not already installed
   pnpm run sonar # runs sonar-scanner using sonar-project.properties
   ```

4. View results at [http://localhost:9000](http://localhost:9000)

NOTE: `sonar-project.properties` contains a `sonar.token` entry for local testing; replace it with your own token or remove it when publishing the project or scanning on a shared system.

Sonar plugin and scripts

This repo contains a `pnpm` script to run the `sonar-scanner` (`pnpm run sonar`) and a small `results/` directory with example outputs and JSON snapshots that demonstrate how Snyk and Sonar reports appear.

Use `pnpm run lint` or `pnpm run lint:fix` to run the Biome linter (configured in `package.json`).

Additional scan and analysis tips

- To reproduce Snyk scans: `snyk code test --json > results/snyk-results.json`
- To reproduce Sonar analysis: run `pnpm run sonar` and review sonar UI at [http://localhost:9000](http://localhost:9000)

## Notes & Best Practices

- This repository is intentionally insecure and should never be used as a template for real applications.
- Avoid exposing secrets or credentials; example token and credentials are for local demo only.
- When scanning with Snyk or Sonar, use credentials and cloud tokens appropriate for your environment.

## Results & Examples

Pre-generated scans are available in `results/` so you can look at example outputs without re-running scans every time. Each run in `results/` is dated and contains both `snyk-results.json` and `sonarqube-results.json`.

## Contributing

Contributions are welcome: please follow the existing tone and remember this repo's goal is to provide reproducible SAST case studies.

## License

Licenses and attributions should remain in place; this repo is for test/demo only.

