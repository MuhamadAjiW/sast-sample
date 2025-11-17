# Security Scan Comparison

## Overview

| Tool | Total Issues | Critical/Blocker | High | Medium | Major | Minor |
|------|--------------|------------------|------|--------|-------|-------|
| Snyk Code | 12 | - | 9 | 2 | - | 1 |
| SonarQube | 6 | 2 | 0 | 0 | 3 | 1 |

## Snyk Results (12 issues)

### High Severity (9)

- **Command Injection** (2 instances)
  - `src/routes/command-injection.ts` line 23: unsanitized input to `exec()` — CWE-78
  - `src/routes/command-injection.ts` line 43: unsanitized input to `exec()` — CWE-78

- **Hardcoded Non-Cryptographic Secret** (3 instances)
  - `src/cases/hardcoded-secrets.ts` line 2: API_KEY — CWE-547
  - `src/cases/hardcoded-secrets.ts` line 12: accessKey — CWE-547
  - `src/cases/hardcoded-secrets.ts` line 13: secretKey — CWE-547

- **Path Traversal** (2 instances)
  - `src/routes/path-traversal.ts` line 20: unsanitized input flows into `fs.readFileSync` — CWE-23
  - `src/routes/path-traversal.ts` line 39: unsanitized input flows into `fs.readFileSync` — CWE-23

- **SQL Injection** (2 instances)
  - `src/routes/sql-injection.ts` line 21: unsanitized input used in SQL query — CWE-89
  - `src/routes/sql-injection.ts` line 46: unsanitized input used in SQL query — CWE-89

### Medium Severity (2)

- **Use of Hardcoded Passwords** (2 instances)
  - `src/cases/hardcoded-secrets.ts` line 3: DATABASE_PASSWORD — CWE-798, CWE-259
  - `src/cases/sql-injection.ts` line 9: password — CWE-798, CWE-259

### Low Severity (1)

- **Use of Hardcoded Credentials** (1 instance)
  - `src/cases/sql-injection.ts` line 8: client credentials — CWE-798

## SonarQube Results (6 issues)

### Blocker Severity (2)

- **PostgreSQL database password** (2 instances)
  - `src/cases/env-secrets.ts` line 14
  - `src/cases/hardcoded-secrets.ts` line 19

### Major Severity (3)

- **Members not marked readonly** (3 instances)
  - `src/cases/hardcoded-secrets.ts` line 7: apiKey
  - `src/cases/hardcoded-secrets.ts` line 8: dbConnection
  - `src/cases/sql-injection.ts` line 48: client

### Minor Severity (1)

- **Import conventions / Unused** (1 instance)
  - `src/cases/path-traversal.ts` line 2: Remove this unused import of 'path'

## Key Differences

- **Detection Focus**
  - Snyk Code: SAST-focused, finds runtime vulnerability patterns (SQLi, command injection, path traversal, hardcoded secrets)
  - SonarQube: Security + code quality, identifies blocker-level secrets and code improvements (readonly, imports)

- **Secret Detection**
  - Snyk Code: Found hardcoded secrets in `hardcoded-secrets.ts` (API key, AWS keys) and DB password in `hardcoded-secrets.ts`
  - SonarQube: Found PostgreSQL DB passwords as blocker issues in `env-secrets.ts` and `hardcoded-secrets.ts`

- **Coverage Overlap**
  - Both tools flagged hardcoded secrets in `hardcoded-secrets.ts`. Snyk Code also flagged code runtime vulnerabilities (SQLi/Command injection/Path traversal) that SonarQube did not call out as security issues this run.
