// SQL Injection vulnerabilities
export function unsafeQuery(userInput: string) {
  const query = `SELECT * FROM users WHERE id = ${userInput}`;
  return query;
}

export function unsafeLogin(username: string, password: string) {
  const sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  return sql;
}

export class DatabaseService {
  executeQuery(id: string) {
    return `DELETE FROM users WHERE id = ${id}`;
  }
}