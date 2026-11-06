# Git playground

The playground creates a temporary, server-side Git repository per session. Starter text files are available before initialization. Git commands are sent as one line and checked by the registry parser before the server invokes the real Git executable with `shell: false`.

## Current workflow

- Create a temporary session and add starter files.
- Initialize the repository and configure an in-session learner identity.
- Inspect status, stage files, commit, work with branches, merge, and use the other commands in the engine registry.
- Read and write workspace text files through a separate bounded file API.
- Refresh the UI from the repository after every Git command.
- Require confirmation for commands classified as destructive.

Per-session operations are queued. Sessions expire after three hours or can be reset from the interface. Reset deletes the temporary Git history after the user confirms in the browser.

## Current limits

Session ownership lives only in application process memory. A restart or another server instance cannot find the same session. The service does not support authentication, durable accounts, real repositories, network remotes, credentials, pull, or public multi-user isolation. Push practice uses a private bare repository inside the session. Conflicts are real Git state, but the UI does not yet offer a complete conflict editor. Do not expose this prototype as a public Git service.
