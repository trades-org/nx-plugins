import 'dotenv/config';
import { ExecutorContext } from '@nx/devkit';
import { getProjectConfiguration, stringifyArgs } from '@trades-org/nx-core';
import * as execa from 'execa';
import { NX_CONTEXT_KEY } from '../../../plugin/nrwl/nx-constants';
import { printCommand } from '../../utils/print-command';
import { SlsInfisicalExecutorSchema } from './schema';

export default async function runExecutor(
  options: SlsInfisicalExecutorSchema,
  context: ExecutorContext,
) {
  const { command, infisicalPath, infisicalEnv, env = process.env, ...rest } = options;
  const IS_CI_RUN = process.env.CI === 'true';
  const projectRoot = getProjectConfiguration(context).root;
  const stringifiedArgs = stringifyArgs({
    ...rest,
  });
  const fullCommand =
    `infisical run --path=${infisicalPath} --env=${infisicalEnv} -- sls ${command} ${stringifiedArgs}`.trim();

  printCommand(fullCommand);
  const result = await execa.command(fullCommand, {
    cwd: projectRoot,
    stdio: IS_CI_RUN ? undefined : 'inherit',
    all: IS_CI_RUN,
    env: {
      FORCE_COLOR: 'true',
      NODE_OPTIONS: '--enable-source-maps',
      ...env,
      [NX_CONTEXT_KEY]: JSON.stringify(context),
    },
  });

  if (IS_CI_RUN) {
    console.log(result.all);
  }

  return {
    success: true,
  };
}
