---
name: scout
description: Hand work to the user's coding agents (Claude Code, Codex and others) on their Mac through Scout, then bring back the reply. Use when the user mentions Scout or /scout, says "hand this to my coding agents", "ask Claude on my Mac", "ask Codex on my Mac", or wants a coding agent in one of their projects to review, explain, or change code. Covers the Scout connector, the Grok Bot Mac app, and Grok Bot's own cloud computer.
---

# Scout for Grok Bot

Scout carries work from Grok Bot to the coding agents on the user's Mac. You ask an agent for work, keep the handle Scout returns, and wait for the reply. Pick the first situation below that applies.

## 1. The Scout connector is connected

Call the `whoami` tool. If it answers with an identity, use the connector tools.

- Hand off work with `ask`. Pass `projectPath` as a full path on the user's Mac (for example `/Users/sam/dev/app`, never `~/dev/app`) and `harness` (`claude` or `codex`). Put the whole task in `body`.
- Keep every handle the receipt returns (ref, flight, invocation, conversation, work, or session). A receipt means the work was accepted; it is not the answer.
- Follow up with `invocations_wait` until the work finishes, or `invocations_get` to read its current state. Show the user the agent's output.
- Use `messages_send` only for one-way FYIs that need no reply.
- Never invent agent names. To find an existing agent, call `agents_search`. When the user names a project rather than an agent, use `projectPath` and `harness` and let Scout route.

## 2. Grok Bot Mac app with "Execution on this computer"

If there is no connector but you can run commands on the user's Mac, use the `scout` command there.

1. Run `scout --version`. If the command is missing, send the user to https://openscout.app/grokbot to install Scout, then continue.
2. Run `scout who` to see the user's agents.
3. Hand off work:

   ```sh
   scout ask --project /full/path/to/project --harness claude "Review the latest changes and report back. Don't edit files."
   ```

   To reach an agent listed by `scout who`, use `scout ask --to <agent> "<task>"`.
4. Keep the ref the receipt prints, then run `scout wait <ref>` and show the user the reply.

## 3. Grok Bot's own cloud computer

Use this when there is no connector and no Mac app. You install a small Scout client on your own cloud computer and the user approves its sign-in. Ask the user before you install anything.

1. Install the client:

   ```sh
   curl -fsSL https://openscout.app/remote/install.sh | sh
   ```

   If `scout` is not on your PATH afterward, run it as `~/.local/bin/scout`.
2. Start the sign-in:

   ```sh
   scout login --as grokbot
   ```

3. Send the user the sign-in link it prints. They open it, sign in with GitHub, approve, and get a one-time code.
4. Wait for the user to paste the code, then finish:

   ```sh
   scout login --code <code>
   ```

5. Confirm with `scout whoami` (it prints `grokbot`) and `scout who` (it lists the user's agents).

Then hand off work. To reach a named agent from `scout who`:

```sh
scout ask <agent> "Explain what src/server.ts does. Don't edit files."
```

To target a project rather than a named agent:

```sh
scout call ask '{"projectPath": "/full/path/to/project", "harness": "claude", "body": "Review the latest changes and report back."}'
```

Keep the ref from the receipt and run `scout wait <ref>` to bring back the reply. `scout status <ref>` reads the current state without waiting.

## Writing a good ask

- Name the project with a full path and say which agent should do it (`claude` or `codex`).
- Keep the first request small and specific. "Don't edit files" describes the task; it does not change the agent's permissions.
- Tell the user what you asked, which handle you are following, and then the reply.

## Troubleshooting

- `node_unreachable`, or "the Scout Mac's bridge is offline": the user's Mac is not connected to Scout's gateway. Ask the user to run `scout mesh bridge status` on the Mac, then `scout mesh bridge connect` if it is not connected. Retry once they confirm.
- "not signed in" or a rejected token on the cloud computer: run `scout login --as grokbot` again and repeat the sign-in.
- No agents in `scout who` or `agents_search`: the user needs at least one coding agent on the Mac. Point them to https://openscout.app/grokbot.
- Never paste tokens or credentials into chat, and never ask the user for one. The one-time sign-in code is the only thing the user hands you.
