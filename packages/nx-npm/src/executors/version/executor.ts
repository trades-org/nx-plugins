import { ExecutorContext } from '@nx/devkit';
import { getProjectConfiguration } from '@trades-org/nx-core';
import { execSync } from 'child_process';
import { VersionExecutorSchema } from './schema';

export default async function runExecutor(
  options: VersionExecutorSchema,
  context: ExecutorContext,
) {
  const config = getProjectConfiguration(context);
  const root = config.root;

  execSync(`npm version ${options.pkgVersion}`, { cwd: root, stdio: 'inherit' });

  return {
    success: true,
  };
}
