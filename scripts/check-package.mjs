import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = path => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const manifest = read(".cursor-plugin/plugin.json");
assert.match(manifest.name, /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/);
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
for (const path of [manifest.mcpServers, manifest.logo]) {
  assert.equal(typeof path, "string");
  assert.ok(!path.startsWith("/") && !path.split("/").includes(".."));
  assert.ok(existsSync(resolve(root, path)), `Missing package asset: ${path}`);
}
const config = read(manifest.mcpServers);
assert.deepEqual(config, { mcpServers: { scout: { url: "https://mcp.oscout.net" } } },
  "Marketplace configuration must use hosted OAuth without local commands or embedded credentials");
assert.equal(manifest.license, read("package.json").license);
assert.equal(manifest.version, read("package.json").version, "plugin.json and package.json versions must match");
assert.equal(typeof manifest.displayName, "string");
assert.match(manifest.minClientVersions?.grokbot ?? "", /^\d+\.\d+\.\d+$/, "minClientVersions.grokbot is required");
assert.equal(manifest.skills, "./skills/");
const skillPath = "skills/scout/SKILL.md";
assert.ok(existsSync(resolve(root, skillPath)), `Missing skill: ${skillPath}`);
const skill = readFileSync(resolve(root, skillPath), "utf8");
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
assert.ok(frontmatter, `${skillPath} must start with YAML frontmatter`);
const field = key => frontmatter[1].match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].trim();
assert.equal(field("name"), "scout", `${skillPath} frontmatter name must be "scout"`);
assert.ok((field("description") ?? "").length >= 40, `${skillPath} frontmatter needs a description`);
console.log("Hosted MCP package, assets, and scout skill validated.");
