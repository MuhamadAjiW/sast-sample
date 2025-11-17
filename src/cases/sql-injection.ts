import { Client } from "pg";

// Database configuration - vulnerable to exposure
const dbConfig = {
	host: "localhost",
	port: 5433,
	database: "testdb",
	user: "testuser",
	password: "testpass",
};

// SQL Injection vulnerabilities with actual PostgreSQL execution
export async function unsafeQuery(userInput: string) {
	const client = new Client(dbConfig);
	await client.connect();

	// Vulnerable: Direct string concatenation
	const query = `SELECT * FROM users WHERE id = ${userInput}`;

	try {
		const result = await client.query(query);
		await client.end();
		return result.rows;
	} catch (error) {
		await client.end();
		throw error;
	}
}

export async function unsafeLogin(username: string, password: string) {
	const client = new Client(dbConfig);
	await client.connect();

	// Vulnerable: String concatenation allowing SQL injection
	const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

	try {
		const result = await client.query(sql);
		await client.end();
		return result.rows;
	} catch (error) {
		await client.end();
		throw error;
	}
}

export class DatabaseService {
	private client: Client;

	constructor() {
		this.client = new Client(dbConfig);
	}

	async connect() {
		await this.client.connect();
	}

	async disconnect() {
		await this.client.end();
	}

	// Vulnerable: Direct parameter injection
	async executeQuery(id: string) {
		const query = `DELETE FROM users WHERE id = ${id}`;
		return await this.client.query(query);
	}

	// Vulnerable: Template literal injection
	async searchUsers(searchTerm: string) {
		const query = `SELECT * FROM users WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'`;
		return await this.client.query(query);
	}

	// Vulnerable: Dynamic table/column names
	async getDataFromTable(tableName: string, columnName: string, value: string) {
		const query = `SELECT * FROM ${tableName} WHERE ${columnName} = '${value}'`;
		return await this.client.query(query);
	}
}
