#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
'use strict';

const { execSync } = require('child_process');
const path = require('path');
const cwd = path.resolve(__dirname, '../..');

const chunks = [];
process.stdin.on('data', (d) => chunks.push(d));
process.stdin.on('end', () => {
  const input = JSON.parse(Buffer.concat(chunks).toString());
  const filePath = input.tool_input?.file_path ?? '';

  // Only run for TypeScript/JavaScript files
  if (!/\.(ts|tsx|js|mjs|cjs)$/.test(filePath)) process.exit(0);

  const issues = [];

  // Run ESLint
  try {
    execSync(`npx eslint "${filePath}"`, { stdio: 'pipe', cwd });
  } catch (e) {
    const out = (e.stdout?.toString() ?? '').trim();
    if (out) issues.push('ESLint errors:\n' + out);
  }

  // Run Prettier check
  try {
    execSync(`npx prettier --check "${filePath}"`, { stdio: 'pipe', cwd });
  } catch (e) {
    const out = (e.stdout?.toString() ?? '').trim();
    if (out) {
      issues.push('Prettier formatting issues (run prettier --write to fix):\n' + out);
    } else {
      issues.push(`Prettier: "${filePath}" is not formatted correctly.`);
    }
  }

  if (issues.length === 0) process.exit(0);

  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PostToolUse',
        additionalContext:
          'ESLint/Prettier issues detected in the file you just wrote. Fix all issues before proceeding:\n\n' +
          issues.join('\n\n'),
      },
    }),
  );
});
