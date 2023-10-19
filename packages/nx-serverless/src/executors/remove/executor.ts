import { ExecutorContext } from '@nx/devkit';
import { getProjectConfiguration, stringifyArgs } from '@trades-org/nx-core';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';
import { printCommand } from '../../utils/print-command';
import { printDeprecationWarning } from '../../utils/print-deprecation-warning';
import { runSlsHelp } from '../../utils/run-sls-help';
import { RemoveExecutorSchema } from './schema';

export default async function runExecutor(options: RemoveExecutorSchema, context: ExecutorContext) {
  const { noError, showHelp, ...rest } = options;

  printDeprecationWarning();

  if (showHelp) {
    return runSlsHelp(context, 'remove');
  }

  const stringifiedArgs = stringifyArgs(rest);
  const command = `sls remove ${stringifiedArgs}`.trim();

  printCommand(command);

  try {
    return await runCommands(
      {
        command,
        color: true,
        cwd: getProjectConfiguration(context).root,
        __unparsed__: [],
      },
      context,
    );
  } catch (e) {
    if (noError) {
      return { success: true };
    }

    console.error(e);

    return { success: false };
  }
}
