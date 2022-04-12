import { joinPathFragments, ProjectConfiguration } from '@nrwl/devkit';
import { getBuildBaseConfig } from './get-build-base-config';
import { getOutputPath } from './get-output-path';
import { ServerlessGeneratorNormalizedSchema } from './normalized-options';

export function getProjectConfig(
  options: ServerlessGeneratorNormalizedSchema,
): ProjectConfiguration {
  const outputPath = getOutputPath(options);
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
      serve: {
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
        outputs: [outputPath, buildBaseConfig.options.outputPath],
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
        },
      },
      deploy: {
        executor: '@trades-org/nx-serverless:sls',
        outputs: [outputPath, buildBaseConfig.options.outputPath],
        dependsOn: [
          {
            target: 'build',
            projects: 'self',
          },
        ],
        options: {
          command: 'deploy',
          //TODO: update this reference to trades.org-monorepo structure
          package: '.serverless',
          ...(options.plugin === '@trades-org/nx-serverless/plugin'
            ? { buildTarget: buildTargetProd }
            : {}),
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
