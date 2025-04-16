# Issue explanation of dulicated bindings in auto-generated `wrangler.json` file with Nuxt 3 Layers architecture

Related issues:

- https://github.com/nitrojs/nitro/issues/3316
 
## Steps to reproduce

### Clone repo, install packages, and build the app

```
git clone git@github.com:serhii-chernenko/nuxt-layers-cloudflare-issue-v2.git
bun install
bun run build:app
```

### Verify a generated `wrangler.json` file.

```bash
cat src/apps/app/dist/_worker.js/wrangler.json
```

Expected output:
```json
{
  "compatibility_date": "2025-01-27",
  "kv_namespaces": [
    {
      "binding": "KV_CORE",
      "id": "SET_IN_ENV"
    },
    {
      "binding": "KV_CMS",
      "id": "SET_IN_ENV"
    },
    {
      "binding": "KV_CORE",
      "id": "SET_IN_ENV"
    }
  ],
  "d1_databases": [
    {
      "binding": "DB_CORE",
      "database_id": "SET_IN_ENV"
    },
    {
      "binding": "DB_CMS",
      "database_id": "SET_IN_ENV"
    },
    {
      "binding": "DB_CORE",
      "database_id": "SET_IN_ENV"
    }
  ],
  "name": "nuxt-layers-cloudflare-issue-v2",
  "pages_build_output_dir": "..",
  "compatibility_flags": [
    "nodejs_compat",
    "no_nodejs_compat_v2"
  ]
}
```

As you can see, `KV_CORE` and `DB_CORE` duplicated twice.

### Dev failed

If you run
```bash
bun run dev:app
```
You have to see the error
```
ERROR  Failed to initialize wrangler bindings proxy Processing dist/_worker.js/wrangler.json configuration:
│   - KV_CORE assigned to multiple KV Namespaces bindings.
│   - DB_CORE assigned to multiple D1 Databases bindings.
│   - Bindings must have unique names, so that they can all be referenced in the worker.
│     Please change your bindings to have unique names.
```

### Explanation

The issue happens because I extend one layer in another one and then both are extended in the end application:

- Core Admin → App
- Core Admin → CMS Admin (because this layer needs functionality of the Core Admin layer) → App

I can avoid this issue by extending the chain this way:

- Core Admin → CMS Admin → App

Just by removing:

- Core Admin → App

But I want to have the explicit extending in the end app.

### Suggestion

Filtering bindings in each array available for the `nitro.cloudflare.wrangler` object such as `kv_namespaces`, `d1_databases`, etc. by the same name.
