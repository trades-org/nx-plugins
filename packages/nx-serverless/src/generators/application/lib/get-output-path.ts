import { NormalizedOptions } from '@trades-org/nx-core';
import { join } from 'path';

export function getOutputPath(options: NormalizedOptions) {
  return join(options.projectRoot, '.serverless');
}
