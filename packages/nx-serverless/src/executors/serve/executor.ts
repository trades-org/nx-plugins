import { ExecutorContext } from '@nx/devkit';
import { getProjectConfiguration, stringifyArgs } from '@trades-org/nx-core';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';
import { printCommand } from '../../utils/print-command';
import { printDeprecationWarning } from '../../utils/print-deprecation-warning';
import { runSlsHelp } from '../../utils/run-sls-help';
import { ServeExecutorSchema } from './schema';

export default async function runExecutor(options: ServeExecutorSchema, context: ExecutorContext) {
  const { showHelp, ...rest } = options;

  printDeprecationWarning();

  if (showHelp) {
    return runSlsHelp(context, 'offline');
  }

  const stringifiedArgs = stringifyArgs(rest);
  const command = `sls offline ${stringifiedArgs}`.trim();

  printCommand(command);

  return runCommands(
    {
      command,
      color: true,
      cwd: getProjectConfiguration(context).root,
      __unparsed__: [],
    },
    context,
  );
}
