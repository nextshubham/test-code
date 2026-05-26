# Aprimo Webhook HMAC Utility

Generate the same Aprimo webhook HMAC as the C# sample:

```js
HMACSHA256(secret, utf8HttpBody).toString("base64")
```

Aprimo documents webhook validation as generating a Base64-encoded HMAC of the raw HTTP body content with `HMACSHA256`, then comparing it with the `X-SH1` header.

## Usage

```powershell
node .\aprimo-hmac.js --secret "your-secret" --body '{\"CalloutLocation\":2}'
```

From a payload file:

```powershell
node .\aprimo-hmac.js --secret "your-secret" --file .\payload.json
```

From stdin:

```powershell
Get-Content .\payload.json -Raw | node .\aprimo-hmac.js --secret "your-secret"
```

Or with an environment variable:

```powershell
$env:APRIMO_WEBHOOK_SECRET = "your-secret"
node .\aprimo-hmac.js --file .\payload.json
```

Important: use the exact raw request body that Aprimo sent. Reformatting JSON, changing whitespace, or changing line endings will produce a different HMAC.
For real webhook payloads, `--file` or stdin is usually safer than `--body` because shell quoting can alter inline JSON.
