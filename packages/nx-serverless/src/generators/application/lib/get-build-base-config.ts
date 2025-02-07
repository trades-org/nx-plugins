import { joinPathFragments, TargetConfiguration } from '@nx/devkit';
import { NormalizedOptions } from '@trades-org/nx-core';

export function getBuildBaseConfig(options: NormalizedOptions): TargetConfiguration {
  return {
    executor: '@nx/webpack:webpack',
    outputs: ['{options.outputPath}'],
    options: {
      main: 'noop',
      outputPath: joinPathFragments('dist', options.projectRoot),
      tsConfig: joinPathFragments(options.projectRoot, 'tsconfig.app.json'),
      externalDependencies: 'none',
      target: 'node',
      compiler: 'tsc',
      webpackConfig: joinPathFragments(options.projectRoot, 'webpack.config.js'),
    },
    configurations: {
      development: {},
      production: {
        optimization: true,
        extractLicenses: true,
        inspect: false,
      },
    },
    defaultConfiguration: 'production',
  };
}
