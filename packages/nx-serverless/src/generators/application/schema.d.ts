import { Linter } from '@nx/linter';

export interface ServerlessGeneratorSchema {
  plugin: 'serverless-bundle' | '@trades-org/nx-serverless/plugin';
  name: string;
  tags?: string;
  directory?: string;
  linter: Linter;
  unitTestRunner: 'jest' | 'none';
  port: number;
  babelJest?: boolean;
  strict: boolean;
  skipFormat?: boolean;
}
