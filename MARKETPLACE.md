# Marketplace submission

Status: **Submitted — awaiting Cursor review.**

Submitted September 21, 2026 through https://cursor.com/marketplace/publish.

- Publisher display name: OpenScout
- Requested publisher handle: `openscout`
- Plugin identifier: `grok-scout`
- Repository: https://github.com/oscout/grok-scout
- Website: https://oscout.github.io/grok-scout/
- Logo: https://raw.githubusercontent.com/oscout/grok-scout/main/assets/logo.svg
- Hosted MCP endpoint: https://mcp.oscout.net
- Authentication: OAuth with GitHub sign-in and Scout consent

The application page confirmed: “Thanks for applying” and “We've received your submission.” It did not display an application ID or a public listing URL. Submission does not mean marketplace approval.

## Submitted description

Scout for Grok Bot connects Grok Bot to local coding agents through hosted MCP. Delegate coding and review work, exchange messages, and follow results. Uses OAuth with GitHub sign-in and explicit consent. Requires Scout on your Mac, connected with scout mesh bridge connect. Includes a Scout skill that also covers the Grok Bot Mac app and Grok Bot's own cloud computer.

## Verification

The hosted package configuration and referenced assets pass `bun run check`; all seven retained local installer tests pass. Public manifest, MCP config, logo, and connection guide are reachable. The live gateway publishes OAuth authorization-server metadata. The connector is already in use through custom MCP setup, as reported by the operator; installation through the unapproved marketplace listing has not been tested.

## Canonical page move

The connection guide now lives at https://openscout.app/grok/. The original GitHub Pages website URL submitted above redirects to that page. The publisher application remains the same; no duplicate submission was made.

## Package update: scout skill (version 0.2.0)

This is an update to the September 21, 2026 submission, not a new application. The plugin identifier, publisher, repository, and hosted MCP endpoint are unchanged.

Version 0.2.0 turns the package into a Grok Bot plugin in the same layout as Cursor's published plugins (for example `pstack` and `third_party/tailscale` in https://github.com/cursor/plugins): the hosted MCP connector plus one skill.

- `skills/scout/SKILL.md` adds the `scout` skill. It teaches Grok Bot to hand work to the user's coding agents through the Scout connector (`ask` with a full `projectPath` and `harness`, then `invocations_wait`), through the `scout` command when the Grok Bot Mac app has “Execution on this computer”, or through the remote Scout client on Grok Bot's own cloud computer after the user approves its sign-in.
- The manifest adds `displayName` (“Scout”), `category` (`integrations`), `tags`, `skills: "./skills/"`, and `minClientVersions` (`grokbot` and `sand` 0.49.0, `cursor` `never`), matching the Tailscale plugin.

`bun run check` validates the manifest, the hosted MCP configuration, and the skill frontmatter.

## Next step

Wait for Cursor's review response. Address any reviewer feedback, then record the approved listing URL here. Do not submit a duplicate application or claim the plugin is listed before approval.
