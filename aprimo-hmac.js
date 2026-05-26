#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");

function calculateAprimoWebhookHmac(secret, httpBodyContent) {
  return crypto
    .createHmac("sha256", Buffer.from(secret, "utf8"))
    .update(Buffer.from(httpBodyContent, "utf8"))
    .digest("base64");
}

function readStdin() {
  return fs.readFileSync(0, "utf8");
}

function printUsage() {
  console.log(`Usage:
  node aprimo-hmac.js --secret <secret> --body '<raw-json-body>'
  node aprimo-hmac.js --secret <secret> --file payload.json
  type payload.json | node aprimo-hmac.js --secret <secret>

Options:
  --secret, -s   Aprimo webhook secret
  --body, -b     Raw HTTP body content
  --file, -f     File containing the raw HTTP body content
  --help, -h     Show this help
`);
}

function getArg(name, shortName) {
  const args = process.argv.slice(2);
  const index = args.findIndex((arg) => arg === name || arg === shortName);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasArg(name, shortName) {
  return process.argv.includes(name) || process.argv.includes(shortName);
}

if (require.main === module) {
  if (hasArg("--help", "-h")) {
    printUsage();
    process.exit(0);
  }

  const secret = getArg("--secret", "-s") || process.env.APRIMO_WEBHOOK_SECRET;
  const bodyArg = getArg("--body", "-b");
  const fileArg = getArg("--file", "-f");

  if (!secret) {
    console.error("Missing secret. Pass --secret or set APRIMO_WEBHOOK_SECRET.");
    process.exit(1);
  }

  let body;
  if (bodyArg !== undefined) {
    body = bodyArg;
  } else if (fileArg !== undefined) {
    body = fs.readFileSync(fileArg, "utf8");
  } else {
    body = readStdin();
  }

  process.stdout.write(calculateAprimoWebhookHmac(secret, body));
}

module.exports = {
  calculateAprimoWebhookHmac,
};
