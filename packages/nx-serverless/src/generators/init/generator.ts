import {
  formatFiles,
  GeneratorCallback,
  readWorkspaceConfiguration,
  Tree,
  updateWorkspaceConfiguration,
} from '@nx/devkit';
import { runTasksInSerial } from '@nx/devkit/src/generators/run-tasks-in-serial';
import { jestInitGenerator } from '@nx/jest';
import { InitGeneratorSchema } from './schema';

export default async function serverlessInitGenerator(host: Tree, options: InitGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  updateGitignore(host);
  addCacheableOperation(host);

  if (!options.unitTestRunner || options.unitTestRunner === 'jest') {
    const jestTask = await jestInitGenerator(host, {});
    tasks.push(jestTask);
  }

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(...tasks);
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
    workspace.tasksRunnerOptions.default.runner !== 'nx/tasks-runners/default'
  ) {
    return;
  }

  workspace.tasksRunnerOptions.default.options = workspace.tasksRunnerOptions.default.options || {};

  workspace.tasksRunnerOptions.default.options.cacheableOperations =
    workspace.tasksRunnerOptions.default.options.cacheableOperations || [];
  if (!workspace.tasksRunnerOptions.default.options.cacheableOperations.includes('build')) {
    workspace.tasksRunnerOptions.default.options.cacheableOperations.push('build');
  }
  updateWorkspaceConfiguration(tree, workspace);
}
