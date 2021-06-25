import fs from "fs";

fs.rmdirSync(new URL("/dist", import.meta.url), { recursive: true });
