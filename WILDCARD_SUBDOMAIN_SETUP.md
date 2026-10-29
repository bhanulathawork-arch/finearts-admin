# FineArtsProject wildcard subdomain setup

## What changed
- Public institute websites now resolve from the hostname instead of `/site/:slug`.
- Frontend reads the institute subdomain using `VITE_ROOT_DOMAIN`.
- Backend endpoint: `GET /api/websites/public/subdomain/:subdomain` (the API prefix depends on the existing server mount).
- Existing dashboards and the institute website preview route are preserved.

## Before deployment
1. Back up the MySQL database.
2. Run the backend migration `migrations/20261024_add_institute_website_subdomain.sql` once.
3. Confirm that every published institute has a unique, DNS-safe `subdomain` value.
4. In Vercel project environment variables, set `VITE_ROOT_DOMAIN` to the purchased root domain only, e.g. `example.com` (no protocol and no `www`). Redeploy after setting it.
5. Add the root domain and `*.example.com` to the same Vercel project. Follow the exact nameserver instructions shown in Vercel for wildcard support.
6. Test at least two institutes and verify that an unknown subdomain returns 404 from the API.

## Subdomain rules
Use one DNS label only: lowercase letters, numbers, and hyphens; 1–63 characters; no leading/trailing hyphen. Each subdomain must be unique. The migration initially copies existing website slugs to the `subdomain` column as a convenience; public URL routing itself no longer uses `/site/:slug`.

## Local development
You can test host resolution with `kalaa.localhost` and `swara.localhost`. Set the frontend dev server's `VITE_ROOT_DOMAIN` only for testing an actual root domain; `.localhost` is recognized directly by the helper.

## Security
Do not commit `.env` files, service-account JSON files, or credentials. Keep backend credentials in Render environment variables and the frontend root-domain setting in Vercel environment variables.
