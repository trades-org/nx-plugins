import { Tree } from '@nx/devkit';
import { addPropertyToJestConfig } from '@nx/jest';
import { NxJestPlaywrightGeneratorNormalizedSchema } from './normalize-options';

export function updateJestConfig(host: Tree, options: NxJestPlaywrightGeneratorNormalizedSchema) {
  addPropertyToJestConfig(host, 'jest.config.js', 'projects', `<rootDir>/${options.projectRoot}`);
}
