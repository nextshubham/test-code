# Run Aprimo HMAC Utility On Another System

Follow these steps after the code is available in your GitHub repository.

## 1. Open a terminal

On Windows, open PowerShell.

On Mac or Linux, open Terminal.

## 2. Clone the GitHub repository

```powershell
git clone https://github.com/nextshubham/test-code.git
cd test-code
```

If the code is already downloaded, go directly into that folder instead:

```powershell
cd path\to\test-code
```

## 3. Check Node.js

Run:

```powershell
node --version
```

If it prints a version like `v20.11.0` or `v22.0.0`, Node.js is installed.

If Node.js is not installed, install it from:

```text
https://nodejs.org/
```

## 4. Create the payload file

Create a file named:

```text
payload.json
```

Paste the exact Aprimo webhook request body into it.

Example:

```json
{"CalloutLocation":2}
```

Important: use the exact raw webhook body. Changing spaces, line endings, or JSON formatting can change the HMAC value.

## 5. Run the utility

On Windows PowerShell:

```powershell
node .\aprimo-hmac.js --secret "your-aprimo-secret" --file .\payload.json
```

On Mac or Linux:

```bash
node aprimo-hmac.js --secret "your-aprimo-secret" --file payload.json
```

## 6. Compare the output

The command prints a Base64 HMAC value, for example:

```text
1xYvHAPnCiFkfvKYNPfiGZceAzY6SdiDFSHE/4VqrZ0=
```

Compare this value with the Aprimo webhook request header:

```text
X-SH1
```

If both values match, the webhook is valid.

## Optional: use an environment variable

Do not commit your real Aprimo secret to GitHub. You can store it temporarily in an environment variable.

Windows PowerShell:

```powershell
$env:APRIMO_WEBHOOK_SECRET = "your-aprimo-secret"
node .\aprimo-hmac.js --file .\payload.json
```

Mac or Linux:

```bash
export APRIMO_WEBHOOK_SECRET="your-aprimo-secret"
node aprimo-hmac.js --file payload.json
```

## Manual GitHub file creation

If you cannot push from your computer, you can create the files directly on GitHub:

1. Open `https://github.com/nex/test-code`
2. Click `Add file`
3. Click `Create new file`
4. Create `aprimo-hmac.js` and paste the utility code
5. Click `Commit changes`
6. Repeat the same steps for `README.md`
7. Do not paste your real Aprimo secret into GitHub
