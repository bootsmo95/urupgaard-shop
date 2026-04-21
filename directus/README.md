# Directus (CMS) setup

This folder contains a standalone Directus setup intended to be deployed as a separate service in Coolify.

## Recommended Coolify setup

### 1) Create a Postgres database (you said you'll do this)
Collect:
- host
- port
- database
- user
- password

### 2) Deploy Directus
Option A (recommended): use **Docker Compose** in Coolify
- **Base Directory**: `directus`
- **Docker Compose Location**: `docker-compose.directus.yml`
- Expose port **8055** (Coolify will map it)
- Add persistent volume for uploads (already defined as `directus_uploads`)

### 3) Environment variables
Copy from `.env.directus.example` into Coolify environment variables and fill in:
- `DIRECTUS_PUBLIC_URL`
- `DIRECTUS_KEY`
- `DIRECTUS_SECRET`
- `DIRECTUS_ADMIN_EMAIL`
- `DIRECTUS_ADMIN_PASSWORD`
- `DIRECTUS_DB_HOST`
- `DIRECTUS_DB_DATABASE`
- `DIRECTUS_DB_USER`
- `DIRECTUS_DB_PASSWORD`
- `DIRECTUS_CORS_ORIGIN`

Generate safe secrets:
- `DIRECTUS_KEY`: random 32+ chars
- `DIRECTUS_SECRET`: random 64+ chars

### 4) First login
- Open `${DIRECTUS_PUBLIC_URL}`
- Login with `DIRECTUS_ADMIN_EMAIL` / `DIRECTUS_ADMIN_PASSWORD`

## Notes
- Content is stored in Postgres, not in the repo.
- Uploads are stored in the `directus_uploads` volume, so redeploys will not delete images.
