import {
  addDependenciesToPackageJson,
  formatFiles,
  GeneratorCallback,
  readWorkspaceConfiguration,
  Tree,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';
import { jestInitGenerator } from '@nrwl/jest';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { setDefaultCollection } from '@nrwl/workspace/src/utilities/set-default-collection';
import { devDependencies } from '@trades-org/nx-core';
import { InitGeneratorSchema } from './schema';

export default async function serverlessInitGenerator(host: Tree, options: InitGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  setDefaultCollection(host, '@trades-org/nx-serverless');
  updateGitignore(host);
  addCacheableOperation(host);

  if (!options.unitTestRunner || options.unitTestRunner === 'jest') {
    const jestTask = jestInitGenerator(host, {});
    tasks.push(jestTask);
  }

  const installTask = updateDependencies(host, options);
  tasks.push(installTask);

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(...tasks);
}

function updateDependencies(host: Tree, options: InitGeneratorSchema) {
  return addDependenciesToPackageJson(
    host,
    {},
    {
      '@trades-org/nx-serverless': '*',
      serverless: devDependencies['serverless'],
      'serverless-offline': devDependencies['serverless-offline'],
      ...(options.plugin === 'serverless-bundle'
        ? {'@trades-org/serverless-bundle': devDependencies['@trades-org/serverless-bundle'],}
        : { '@nrwl/node': '*' }),
    },
  );
}

function updateGitignore(host: Tree) {
  let ignore = '';

  if (host.exists('.gitignore')) {
    ignore = host.read('.gitignore').toString();
  }

  if (!ignore.includes('# Serverless')) {
    ignore = ignore.concat('\n# Serverless\n.serverless\n.webpack\n');
    host.write('.gitignore', ignore);
  }
}

function addCacheableOperation(tree: Tree) {
  const workspace = readWorkspaceConfiguration(tree);
  if (
    !workspace.tasksRunnerOptions ||
    !workspace.tasksRunnerOptions.default ||
    workspace.tasksRunnerOptions.default.runner !== '@nrwl/workspace/tasks-runners/default'
  ) {
    return;
  }

  workspace.tasksRunnerOptions.default.options = workspace.tasksRunnerOptions.default.options || {};

  workspace.tasksRunnerOptions.default.options.cacheableOperations =
    workspace.tasksRunnerOptions.default.options.cacheableOperations || [];
  if (!workspace.tasksRunnerOptions.default.options.cacheableOperations.includes('package')) {
    workspace.tasksRunnerOptions.default.options.cacheableOperations.push('package');
  }
  updateWorkspaceConfiguration(tree, workspace);
}
