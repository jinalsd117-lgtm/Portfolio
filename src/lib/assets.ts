import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * True when a file exists in /public. Lets the site pick up the profile
 * photo and resume PDF automatically once they're added — and never link
 * to a file that isn't there.
 */
export function publicAssetExists(publicPath: string): boolean {
  return existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}
