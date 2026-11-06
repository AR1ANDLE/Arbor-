# Deployment

## Local development

Use Node.js 20.9+ and install a compatible Git executable on `PATH`. Run `npm install`, `npm run build`, and `npm start`. The application requires the Node.js runtime; it is not a static export or serverless Git service.

## Production status

There is no production deployment configuration yet. Temporary repositories are process-local directories under the OS temp directory, the session map is in memory, and there is no authentication. Restarts lose session lookup, and multiple application instances do not share state. Do not expose this prototype to the public internet.

A hosted version needs an authenticated API, isolated worker/container execution, disk and CPU quotas, lifecycle cleanup, serialized operations, persistent session metadata, secure secret handling, health checks, graceful shutdown, and an explicit retention policy. Add deployment manifests only after selecting the hosting environment and isolation model.
