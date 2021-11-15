import { ensureNxProject, runCommandAsync, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

describe('core e2e', () => {
  beforeAll(() => {
    ensureNxProject('@trades-org/nx-core', 'dist/packages/nx-core');
  });

  it('should run generator', async () => {
    await runCommandAsync(`git init`);
    await runNxCommandAsync(`generate @trades-org/nx-core:repository`);
  });
});
