import { ExecutorContext } from '@nx/devkit';
import { getProjectConfiguration, stringifyArgs } from '@trades-org/nx-core';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';
import { printCommand } from '../../utils/print-command';
import { printDeprecationWarning } from '../../utils/print-deprecation-warning';
import { runSlsHelp } from '../../utils/run-sls-help';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  printDeprecationWarning();

  const { outputPath, showHelp, ...rest } = options;

  if (showHelp) {
    return runSlsHelp(context, 'package');
  }

  const stringifiedArgs = stringifyArgs(rest);
  const command = `sls package ${stringifiedArgs}`.trim();

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
