import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export async function readJSON<T>(filename: string): Promise<T> {
  const content = await fs.readFile(path.join(dataDir, filename), "utf8");
  return JSON.parse(content) as T;
}

export async function writeJSON<T>(filename: string, data: T): Promise<void> {
  await fs.writeFile(
    path.join(dataDir, filename),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}
