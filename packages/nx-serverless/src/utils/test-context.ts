import { ExecutorContext } from '@nrwl/devkit';

export const testContext: ExecutorContext = {
  root: '/base/trades.org/tmp/nx-e2e/proj',
  target: { executor: '@trades-org/nx-serverless:build' },
  workspace: {
    npmScope: '@scope',
    version: 2,
    projects: {
      serverless839554: {
        root: 'apps/serverless839554',
        projectType: 'library',
        sourceRoot: 'apps/serverless839554/src',
        targets: { build: { executor: '@trades-org/nx-serverless:build' } },
      },
    },
    cli: { defaultCollection: '@nrwl/workspace' },
  },
  projectName: 'serverless839554',
  targetName: 'build',
  configurationName: undefined,
  cwd: '/base/trades.org/tmp/nx-e2e/proj',
  isVerbose: false,
};
