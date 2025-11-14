# Security Scan Comparison

## Overview

| Tool | Total Issues | Critical/Blocker | High | Medium | Major | Minor |
|------|--------------|------------------|------|--------|-------|-------|
| Snyk | 4 | - | 3 | 1 | - | - |
| SonarQube | 8 | 2 | - | - | 2 | 4 |

## Snyk Results (4 issues)

### High Severity (3)

- **Hardcoded Non-Cryptographic Secret** (3 instances)
  - `hardcoded-secrets.ts` line 2: API_KEY
  - `hardcoded-secrets.ts` line 12: AWS accessKey
  - `hardcoded-secrets.ts` line 13: AWS secretKey
  - CWE-547

### Medium Severity (1)

- **Use of Hardcoded Passwords**
  - `hardcoded-secrets.ts` line 3: DATABASE_PASSWORD
  - CWE-798, CWE-259

## SonarQube Results (8 issues)

### Blocker Severity (2)

- **PostgreSQL database password** (2 instances)
  - `env-secrets.ts` line 9
  - `hardcoded-secrets.ts` line 19

### Major Severity (2)

- **Members not marked readonly** (2 instances)
  - `hardcoded-secrets.ts` line 7: apiKey
  - `hardcoded-secrets.ts` line 8: dbConnection

### Minor Severity (4)

- **Import conventions** (3 instances)
  - `command-injection.ts` line 1: prefer `node:child_process`
  - `path-traversal.ts` line 1: prefer `node:fs`
  - `path-traversal.ts` line 2: prefer `node:path`
- **Unused import**
  - `path-traversal.ts` line 2: unused 'path' import

## Key Differences

### Detection Focus

- **Snyk**: Security vulnerabilities (hardcoded secrets, passwords)
- **SonarQube**: Security issues + code quality (readonly members, import conventions)

### Secret Detection

- **Snyk**: Detected 4 hardcoded secrets (API keys, AWS credentials, password)
- **SonarQube**: Detected 2 PostgreSQL passwords

### Coverage Overlap

- Both tools flagged hardcoded secrets in `hardcoded-secrets.ts`
- Different detection patterns: Snyk found API/AWS keys; SonarQube found DB passwords
