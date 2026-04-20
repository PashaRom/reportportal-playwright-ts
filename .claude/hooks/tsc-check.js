#!/usr/bin/env node
'use strict';

const chunks = [];
process.stdin.on('data', (d) => chunks.push(d));
process.stdin.on('end', () => {
  const input = JSON.parse(Buffer.concat(chunks).toString());
  const filePath = input.tool_input?.file_path ?? '';

  // Only run for TypeScript files
  if (!/\.(ts|tsx)$/.test(filePath)) process.exit(0);

  const { execSync } = require('child_process');
  const cwd = 'C:\\Users\\pavel_romash1\\Projects\\ReportPortalTypeScript';

  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe', cwd });
    // No errors — exit silently
    process.exit(0);
  } catch (e) {
    const stdout = e.stdout?.toString() ?? '';
    const stderr = e.stderr?.toString() ?? '';
    const output = (stdout + stderr).trim();

    console.log(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PostToolUse',
          additionalContext:
            'TypeScript compilation errors detected. Fix all errors before proceeding:\n\n' +
            output,
        },
      }),
    );
  }
});
