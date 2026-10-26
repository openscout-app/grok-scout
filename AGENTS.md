# Scout for Grok Bot

This repository is the hosted MCP connector package for Grok Bot. It is
public. Grok Bot reaches Scout through the hosted connector at
`https://mcp.oscout.net`, with OAuth over HTTP.

## Where work goes

- Scout owns the tools and the records. Do not implement them here. Keep this
  repository to host packaging.
- Behavior that every harness needs goes to the core repository,
  `openscout-app/scout`. Land it there first, then use it here.
- Grok as an execution harness is a separate thing. It does not belong in
  this package.

| Path | Holds |
| --- | --- |
| `.cursor-plugin/plugin.json` | The marketplace manifest |
| `mcp.json` | The hosted connector configuration |
| `skills/scout/SKILL.md` | The `scout` skill |
| `.cursor/mcp.json`, `scripts/install.mjs` | Optional local Cursor stdio helpers |
| `MARKETPLACE.md` | The marketplace submission record |
| `docs/index.html` | The GitHub Pages site |

## Rules

- The marketplace package is `.cursor-plugin/plugin.json`, `mcp.json`, and the
  skill. `mcp.json` names only the hosted URL. Do not embed tokens or bridge
  credentials.
- Every command that the skill names must exist in the Scout CLI or in the
  remote client at https://openscout.app/remote/scout.
- The local Cursor helpers do not configure the hosted connector. Keep that
  difference explicit in the documentation.
- For a fresh ask, send `projectPath` and an optional `harness`. Follow up
  with the handle that the ask returns. Use `messages_send` only for one-way
  updates. Do not guess agent names.
- The hosted connector works when the user's host is connected with
  `scout mesh bridge connect`. The user signs in with GitHub and then approves
  the host.
- Keep the version in `.cursor-plugin/plugin.json` and `package.json` the
  same.
- Scout is for high-trust local developer use. Do not claim enterprise,
  compliance, or multi-tenant readiness.
- This repository is public. Do not commit local paths, host names,
  credentials, or private source.

## Checks

- `bun run check`

## Commits and pull requests

- Commit subjects use gitmoji: `📝 Explain the hosted connector setup`.
- Do not add AI co-author trailers or "Generated with" lines.
- Push a branch to `openscout-app/grok-scout` and open a pull request into
  `main`.

<!-- scout:begin -->
## Scout

- Work for another agent, or on another machine, goes through Scout: `scout ask` (MCP `ask`).
- Another machine: `scout ask --on <host> --project <path on that host> --harness <claude|codex>`; `scout hosts` lists machines and their projects. Don't ssh in to launch agents.
- Syntax: `scout ask --help`, `scout help --detail`. Added by `scout setup agents-md`; `scout setup agents-md --remove` takes it out.
<!-- scout:end -->
