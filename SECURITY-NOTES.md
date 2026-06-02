# Security Notes (Stage 1)

## Environment files

- Never commit `.env` files to git.
- Keep local configuration in:
  - `.env.local`
  - `.env.development.local`
  - `.env.production.local`
  - `.env.test.local`
- Use `.env.example` as the only committed reference.

## Secrets & credentials

- Never hardcode credentials (API keys, tokens, passwords, private keys) in:
  - source files
  - config files
  - README / docs
- Always use environment variables for future APIs and third-party services.

## If exposure happens

- Rotate the credential immediately with the provider.
- Treat any committed secret as compromised (even if later removed).
- If pushed to a remote, rotate + invalidate and consider history rewrite procedures.

## Recommended hygiene

- Add CI to run `npm run lint` and `npm run build` on every PR/push.
- Consider a pre-commit secret scanner (e.g. gitleaks) once the team workflow is in place.

