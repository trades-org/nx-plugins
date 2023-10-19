import { runCommandAsync, runNxCommandAsync, tmpProjPath, uniq } from '@nx/plugin/testing';
import { getPackageManagerCommand } from 'nx/src/utils/package-manager';
import { ensureComplexNxProject } from '@trades-org/nx-core/src/testing-utils/ensure-complex-nx-project';
import { readFileSync, writeFileSync } from 'fs';

describe('nx-npm e2e', () => {
  beforeAll(async () => {
    ensureComplexNxProject(
      ['@trades-org/nx-npm', 'dist/packages/nx-npm'],
      ['@trades-org/nx-core', 'dist/packages/nx-core'],
    );
    const pmc = getPackageManagerCommand();
    await runCommandAsync(`${pmc.addDev} @nx/node`);
    const p = JSON.parse(readFileSync(tmpProjPath('package.json')).toString());
    p['repository'] = {
      type: 'git',
      url: 'https://github.com/Bielik20/nx-plugins',
    };
    writeFileSync(tmpProjPath('package.json'), JSON.stringify(p, null, 2));
  });

  it('should create nx-npm', async () => {
    const plugin = uniq('nx-npm');

    await runNxCommandAsync(
      `generate @nx/node:lib ${plugin} --publishable --importPath ${plugin}`,
    );
    await runNxCommandAsync(`generate @trades-org/nx-npm:npm --project ${plugin}`);

    const buildResult = await runNxCommandAsync(`build ${plugin}`);
    const publishResult = await runNxCommandAsync(`publish ${plugin} --npmToken noop --dryRun`);

    expect(publishResult.stderr).toContain('Tarball Contents');
    expect(publishResult.stderr).toContain('Tarball Details');
  });
});
