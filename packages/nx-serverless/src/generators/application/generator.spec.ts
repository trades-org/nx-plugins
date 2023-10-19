import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Linter } from '@nx/linter';
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
        root: 'sample',
        $schema: '../node_modules/nx/schemas/project-schema.json',
        name: 'sample',
        projectType: 'application',
        sourceRoot: 'sample/src',
        targets: {
          develop: {
            executor: '@trades-org/nx-serverless:sls',
            options: {
              command: 'offline',
            },
          },
          build: {
            executor: '@trades-org/nx-serverless:sls',
            outputs: ['../dist/sample'],
            dependsOn: [
              {
                target: 'build',
                projects: 'dependencies',
              },
            ],
            options: {
              command: 'package',
              package: '../dist/sample',
            },
          },
          deploy: {
            executor: '@trades-org/nx-serverless:sls',
            outputs: ['../dist/sample'],
            dependsOn: [
              {
                target: 'build',
                projects: 'self',
              },
            ],
            options: {
              command: 'deploy',
              force: true,
              package: '../dist/sample',
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
            executor: '@nx/jest:jest',
            configurations: {
              ci: {
                ci: true,
                codeCoverage: true,
              },
            },
            outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
            options: {
              jestConfig: 'sample/jest.config.ts',
              passWithNoTests: true,
            },
          },
          lint: {
            executor: '@nx/eslint:lint',
            outputs: ['{options.outputFile}'],
            options: {
              lintFilePatterns: ['./sample/src/**/*.{ts,tsx,js,jsx}'],
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
        root: 'sample',
        name: 'sample',
        $schema: '../node_modules/nx/schemas/project-schema.json',
        projectType: 'application',
        sourceRoot: 'sample/src',
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
            outputs: ['../dist/sample'],
            options: {
              command: 'package',
              package: '../dist/sample',
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
            outputs: ['../dist/sample'],
            dependsOn: [
              {
                target: 'build',
                projects: 'self',
              },
            ],
            options: {
              command: 'deploy',
              force: true,
              package: '../dist/sample',
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
            executor: '@nx/jest:jest',
            configurations: {
              ci: {
                ci: true,
                codeCoverage: true,
              },
            },
            outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
            options: {
              jestConfig: 'sample/jest.config.ts',
              passWithNoTests: true,
            },
          },
          lint: {
            executor: '@nx/eslint:lint',
            outputs: ['{options.outputFile}'],
            options: {
              lintFilePatterns: ['./sample/src/**/*.{ts,tsx,js,jsx}'],
            },
          },
        },
        tags: [],
      });
    });
  });
});
