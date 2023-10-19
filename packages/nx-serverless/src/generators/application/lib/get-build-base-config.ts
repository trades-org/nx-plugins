import { joinPathFragments, offsetFromRoot, TargetConfiguration } from '@nx/devkit';
import { NormalizedOptions } from '@trades-org/nx-core';

export function getBuildBaseConfig(options: NormalizedOptions): TargetConfiguration {
  return {
    executor: '@nx/node:webpack',
    outputs: ['{options.outputPath}'],
    options: {
      outputPath: `${offsetFromRoot(options.projectRoot)}${joinPathFragments(
        'dist',
        options.projectRoot,
      )}`,
      main: joinPathFragments(options.projectRoot, 'src', 'main.ts'),
      tsConfig: joinPathFragments(options.projectRoot, 'tsconfig.app.json'),
      externalDependencies: 'all',
    },
    configurations: {
      production: {
        optimization: true,
        extractLicenses: true,
        inspect: false,
        externalDependencies: 'none',
      },
    },
  };
}
