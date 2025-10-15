# 🚀 Deployment Optimization

This configuration prevents unnecessary builds on Render and Vercel when non-relevant files are modified.

## How It Works

### Vercel (Frontend - `/web`)
- **File**: `vercel.json` with inline `ignoreCommand`
- **Logic**: Deploys **only** if there are changes in the `/web` folder
- **Ignores**: README, markdown files in root, backend changes

### Render (Backend - root)
- **File**: `render.yaml` with `ignoredPaths`
- **Logic**: Deploys **only** if there are changes to the backend (root)
- **Ignores**: `/web` folder, markdown files, LICENSE, .gitignore

## Examples

| Change | Render Deploy | Vercel Deploy |
|----------|---------------|---------------|
| `README.md` | ❌ No | ❌ No |
| `server/routes/teacher.ts` | ✅ Yes | ❌ No |
| `web/src/app/page.tsx` | ❌ No | ✅ Yes |
| `package.json` (root) | ✅ Yes | ❌ No |
| `web/package.json` | ❌ No | ✅ Yes |

## Local Testing

To test the Vercel ignore logic locally:

```bash
if git diff --quiet HEAD^ HEAD -- web/ ':!*.md' ':!*.txt' ':!LICENSE'; then echo '✅ Build skipped (no frontend changes)'; else echo '🚀 Build proceeds (frontend changes detected)'; fi
```

## Notes

- The first time you push after this configuration, it might deploy to both services anyway
- On Vercel, you might need to reconnect the project to apply the `vercel.json` configuration
- The ignore logic uses git diff to compare changes between commits

