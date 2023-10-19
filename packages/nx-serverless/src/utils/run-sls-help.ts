import { ExecutorContext } from '@nx/devkit';
import { getProjectConfiguration } from '@trades-org/nx-core';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';

export function runSlsHelp(context: ExecutorContext, command: string) {
  return runCommands(
    {
      command: `sls ${command} --help`,
      color: true,
      cwd: getProjectConfiguration(context).root,
      __unparsed__: [],
    },
    context,
  );
}
