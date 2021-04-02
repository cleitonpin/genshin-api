import { readFileSync } from "fs";
import { join } from "path";

export const readFile = (language: string, file: string): any => {
    try {
        const path = join(__dirname, '..', 'json', language, file);
        const data = JSON.parse(readFileSync(path, 'utf-8'));

        return data;
    } catch (e) {
        return {
            error: 'This language not supported'
        }
    }
}