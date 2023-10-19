import { ExecutorContext } from '@nx/devkit';
import { getProjectConfiguration, stringifyArgs } from '@trades-org/nx-core';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';
import { printCommand } from '../../utils/print-command';
import { printDeprecationWarning } from '../../utils/print-deprecation-warning';
import { runSlsHelp } from '../../utils/run-sls-help';
import { DeployExecutorSchema } from './schema';

export default async function runExecutor(options: DeployExecutorSchema, context: ExecutorContext) {
  printDeprecationWarning();

  const { showHelp, outputPath, noBuild, ...rest } = options;

  if (noBuild) {
    rest.package = './.serverless';
  }

  if (showHelp) {
    return runSlsHelp(context, 'deploy');
  }

  const stringifiedArgs = stringifyArgs(rest);
  const command = `sls deploy ${stringifiedArgs}`.trim();

  printCommand(command);

  return runCommands(
    {
      command,
      outputPath,
      color: true,
      cwd: getProjectConfiguration(context).root,
      __unparsed__: [],
    },
    context,
  );
}
