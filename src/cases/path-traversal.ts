import * as fs from 'fs';
import * as path from 'path';

// Path traversal vulnerabilities
export function readUserFile(filename: string) {
  return fs.readFileSync(filename, 'utf8');
}

export function unsafeFileAccess(userPath: string) {
  const fullPath = '/uploads/' + userPath;
  return fs.readFileSync(fullPath);
}

export class FileService {
  getFile(relativePath: string) {
    return fs.readFileSync('./files/' + relativePath);
  }
  
  deleteFile(filename: string) {
    fs.unlinkSync(filename);
  }
}