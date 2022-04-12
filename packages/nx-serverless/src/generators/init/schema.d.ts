export interface InitGeneratorSchema {
  unitTestRunner: 'jest' | 'none';
  plugin: 'serverless-bundle' | '@trades-org/nx-serverless/plugin';
  skipFormat: boolean;
}
