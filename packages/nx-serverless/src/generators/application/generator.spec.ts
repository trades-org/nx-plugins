import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Linter } from '@nrwl/linter';
import generator from './generator';
import { ServerlessGeneratorSchema } from './schema';

describe('serverless generator', () => {
  let appTree: Tree;
  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  describe('serverless-bundle', () => {
    const options: ServerlessGeneratorSchema = {
      plugin: 'serverless-bundle',
      name: 'sample',
      unitTestRunner: 'jest',
      linter: Linter.EsLint,
      strict: true,
      port: 3333,
    };

    it('should run successfully', async () => {
      await generator(appTree, options);
      const config = readProjectConfiguration(appTree, 'sample');
      expect(config).toEqual({
        root: 'apps/sample',
        projectType: 'application',
        sourceRoot: 'apps/sample/src',
        targets: {
          develop: {
            executor: '@trades-org/nx-serverless:sls',
            options: {
              command: 'offline',
            },
          },
          build: {
            executor: '@trades-org/nx-serverless:sls',
            outputs: ['../../dist/apps/sample'],
            dependsOn: [
              {
                target: 'build',
                projects: 'dependencies',
              },
            ],
            options: {
              command: 'package',
              package: '../../dist/apps/sample',
            },
          },
          deploy: {
            executor: '@trades-org/nx-serverless:sls',
            outputs: ['../../dist/apps/sample'],
            dependsOn: [
              {
                target: 'build',
                projects: 'self',
              },
            ],
            options: {
              command: 'deploy',
              force: true,
              package: '../../dist/apps/sample',
              verbose: true,
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
          test: {
            executor: '@nrwl/jest:jest',
            outputs: ['coverage/apps/sample'],
            options: {
              jestConfig: 'apps/sample/jest.config.js',
              passWithNoTests: true,
            },
          },
          lint: {
            executor: '@nrwl/linter:eslint',
            outputs: ['{options.outputFile}'],
            options: {
              lintFilePatterns: ['apps/sample/src/**/*.{ts,tsx,js,jsx}'],
            },
          },
        },
        tags: [],
      });
    });
  });

  describe('@trades-org/nx-serverless/plugin', () => {
    const options: ServerlessGeneratorSchema = {
      plugin: '@trades-org/nx-serverless/plugin',
      name: 'sample',
      unitTestRunner: 'jest',
      linter: Linter.EsLint,
      strict: true,
      port: 3333,
    };

    it('should run successfully', async () => {
      await generator(appTree, options);
      const config = readProjectConfiguration(appTree, 'sample');
      expect(config).toEqual({
        root: 'apps/sample',
        projectType: 'application',
        sourceRoot: 'apps/sample/src',
        targets: {
          develop: {
            executor: '@trades-org/nx-serverless:sls',
            options: {
              buildTarget: 'sample:build',
              command: 'offline',
            },
          },
          build: {
            executor: '@trades-org/nx-serverless:sls',
            outputs: ['../../dist/apps/sample'],
            options: {
              command: 'package',
              package: '../../dist/apps/sample',
              buildTarget: 'sample:build:production',
            },
            dependsOn: [
              {
                target: 'build',
                projects: 'dependencies',
              },
            ],
          },
          deploy: {
            executor: '@trades-org/nx-serverless:sls',
            outputs: ['../../dist/apps/sample'],
            dependsOn: [
              {
                target: 'build',
                projects: 'self',
              },
            ],
            options: {
              command: 'deploy',
              force: true,
              package: '../../dist/apps/sample',
              verbose: true,
              buildTarget: 'sample:build:production',
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
          test: {
            executor: '@nrwl/jest:jest',
            outputs: ['coverage/apps/sample'],
            options: {
              jestConfig: 'apps/sample/jest.config.js',
              passWithNoTests: true,
            },
          },
          lint: {
            executor: '@nrwl/linter:eslint',
            outputs: ['{options.outputFile}'],
            options: {
              lintFilePatterns: ['apps/sample/src/**/*.{ts,tsx,js,jsx}'],
            },
          },
        },
        tags: [],
      });
    });
  });
});
