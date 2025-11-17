import { exec } from "node:child_process";

// Command injection vulnerabilities
export function executeUserCommand(userInput: string) {
	exec(`ls -la ${userInput}`, (error, stdout) => {
		console.log(stdout);
	});
}

export function unsafeSystemCall(filename: string) {
	const command = `cat ${filename}`;
	exec(command);
}

export class SystemService {
	runCommand(cmd: string) {
		return exec(`echo ${cmd}`);
	}

	processFile(path: string) {
		exec(`chmod 755 ${path}`);
	}
}
