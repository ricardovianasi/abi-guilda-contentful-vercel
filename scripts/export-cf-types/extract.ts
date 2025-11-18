import { execSync } from 'child_process';
import { mkdtempSync, rmSync, writeFileSync, accessSync, constants } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { getEnv } from '../getEnv';

const targetSpaceExport = 'target-space.json';

export function extract(outputDir: string) {
  console.log('start extracting');

  // Define export envs upfront to avoid doing any work if env isn't correct
  const targetEnv = {
    SPACE_ID: getEnv('CONTENTFUL_SPACE_ID'),
    ENVIRONMENT: getEnv('CONTENTFUL_ENV_ID'),
    MANAGEMENT_TOKEN: getEnv('CONTENTFUL_MANAGEMENT_TOKEN'),
  };

  // Check for write access to the output dir before doing further work
  try {
    accessSync(outputDir, constants.W_OK);
  } catch (_) {
    throw new Error(`No write access to output dir: ${outputDir}`);
  }

  const tempDir = mkdtempSync(join(tmpdir(), 'export-cf-types-'), 'utf-8');
  console.log(`Exporting contentful data into ${tempDir}`);
  contentfulExport(tempDir, targetSpaceExport, targetEnv);

  const exportedTargetSpace = join(tempDir, targetSpaceExport);
  const typeGeneratorPath = join(__dirname, 'generateTypes');

  writeFileSync(
    join(outputDir, 'contentful.types.ts'),
    execWrapper(`npx tsx ${typeGeneratorPath} ${exportedTargetSpace}`)
  );

  execWrapper(`npx prettier ${join(outputDir, '*.types.ts')} --write`);
  rmSync(tempDir, { recursive: true, force: true, maxRetries: 5 });
  execWrapper(`rm -rf ${tempDir}`);
}

function execWrapper(command: string, env: Record<string, string> = {}) {
  console.log(command);
  return execSync(command.replace(/\n\s*/gm, ' ').trim(), {
    env: { ...process.env, ...env },
    encoding: 'utf-8',
  });
}

function contentfulExport(
  dir: string,
  file: string,
  env: {
    SPACE_ID: string;
    ENVIRONMENT: string;
    MANAGEMENT_TOKEN: string;
  }
) {
  execWrapper(
    `npx contentful-cli space export
        --skip-content --skip-roles
        --skip-tags --skip-webhooks
        --space-id $SPACE_ID
        --environment-id $ENVIRONMENT
        --management-token $MANAGEMENT_TOKEN
        --export-dir ${dir}
        --content-file ${file}
    `,
    env
  );
}
