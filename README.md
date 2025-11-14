# Snyk SAST Test Cases

This TypeScript project contains intentionally vulnerable code to test Snyk's Static Application Security Testing (SAST) capabilities.

## Vulnerability Categories

### 1. SQL Injection (`src/cases/sql-injection.ts`)
- Unsafe query construction with string concatenation
- Direct user input in SQL queries

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

## Usage

```bash
npm run build  # Compile TypeScript
npm run start  # Run the application
npm run dev    # Run in development mode
```

## Testing with Snyk

Run Snyk SAST scan:
```bash
snyk code test
```