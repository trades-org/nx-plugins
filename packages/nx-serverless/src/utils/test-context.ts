import { ExecutorContext } from '@nx/devkit';

export const testContext: ExecutorContext = {
  root: '/base/trades.org/tmp/nx-e2e/proj',
  target: { executor: '@trades-org/nx-serverless:build' },
  workspace: {
    version: 2,
    projects: {
      serverlessMock: {
        root: 'apps/serverlessMock',
        projectType: 'library',
        sourceRoot: 'apps/serverlessMock/src',
        targets: { build: { executor: '@trades-org/nx-serverless:build' } },
      },
    },
  },
  projectName: 'serverlessMock',
  targetName: 'build',
  configurationName: undefined,
  cwd: '/base/trades.org/tmp/nx-e2e/proj',
  isVerbose: false,
};
