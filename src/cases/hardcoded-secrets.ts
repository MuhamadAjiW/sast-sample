// Hardcoded secrets and credentials
export const API_KEY = 'sk-1234567890abcdef';
export const DATABASE_PASSWORD = 'admin123';
export const JWT_SECRET = 'my-super-secret-jwt-key';

export class ConfigService {
  private apiKey = 'AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  private dbConnection = 'mongodb://admin:password123@localhost:27017/mydb';
  
  getAwsCredentials() {
    return {
      accessKey: 'AKIAIOSFODNN7EXAMPLE',
      secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
    };
  }
}

export function connectToDatabase() {
  const connectionString = 'postgres://user:secretpassword@localhost/db';
  return connectionString;
}