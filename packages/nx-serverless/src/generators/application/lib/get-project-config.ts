import { joinPathFragments, ProjectConfiguration } from '@nrwl/devkit';
import { getBuildBaseConfig } from './get-build-base-config';
import { ServerlessGeneratorNormalizedSchema } from './normalized-options';

export function getProjectConfig(
  options: ServerlessGeneratorNormalizedSchema,
): ProjectConfiguration {
  const buildTargetName = 'build';
  const buildTargetDev = `${options.name}:${buildTargetName}`;
  const buildTargetProd = `${buildTargetDev}:production`;
  const buildBaseConfig = getBuildBaseConfig(options);

  return {
    root: options.projectRoot,
    projectType: 'application',
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    targets: {
      ...(options.plugin === '@trades-org/nx-serverless/plugin'
        ? { [buildTargetName]: buildBaseConfig }
        : {}),
      develop: {
        executor: '@trades-org/nx-serverless:sls',
        options: {
          command: 'offline',
          ...(options.plugin === '@trades-org/nx-serverless/plugin'
            ? { buildTarget: buildTargetDev }
            : {}),
        },
      },
      build: {
        executor: '@trades-org/nx-serverless:sls',
        outputs: [buildBaseConfig.options.outputPath],
        dependsOn: [
          {
            target: 'build',
            projects: 'dependencies',
          },
        ],
        options: {
          command: 'package',
          ...(options.plugin === '@trades-org/nx-serverless/plugin'
            ? { buildTarget: buildTargetProd }
            : {}),
          package: buildBaseConfig.options.outputPath,
        },
      },
      deploy: {
        executor: '@trades-org/nx-serverless:sls',
        outputs: [buildBaseConfig.options.outputPath],
        dependsOn: [
          {
            target: 'build',
            projects: 'self',
          },
        ],
        options: {
          command: 'deploy',
          package: buildBaseConfig.options.outputPath,
          force: true,
          verbose: true,
          ...(options.plugin === '@trades-org/nx-serverless/plugin'
            ? { buildTarget: buildTargetProd }
            : {}),
        },
        configurations: {
          production: {
            stage: 'production',
          },
          staging: {
            stage: 'staging',
          },
          dev: {
            stage: 'dev',
          },
        },
      },
      remove: {
        executor: '@trades-org/nx-serverless:sls',
        options: {
          command: 'remove',
        },
      },
      sls: {
        executor: '@trades-org/nx-serverless:sls',
        options: {},
      },
    },
    tags: options.parsedTags,
  };
}
