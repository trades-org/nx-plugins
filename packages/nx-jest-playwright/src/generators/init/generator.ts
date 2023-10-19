import { addDependenciesToPackageJson, formatFiles, Tree, updateJson } from '@nx/devkit';
import { runTasksInSerial } from '@nx/devkit/src/generators/run-tasks-in-serial';
import { jestInitGenerator } from '@nx/jest';
import { devDependencies } from '@trades-org/nx-core';
import { InitGeneratorSchema } from './schema';

export default async function jestPlaywrightInitGenerator(
  host: Tree,
  options: InitGeneratorSchema,
) {
  updateJson(host, 'package.json', (json) => {
    json.dependencies = json.dependencies || {};
    delete json.dependencies['@trades-org/nx-jest-playwright'];

    return json;
  });

  const jestTask = await jestInitGenerator(host, { babelJest: false });

  const installTask = addDependenciesToPackageJson(
    host,
    {},
    {
      ['@trades-org/nx-jest-playwright']: '*',
      'jest-playwright-preset': devDependencies['jest-playwright-preset'],
      playwright: devDependencies['playwright'],
    },
  );

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(jestTask, installTask);
}
