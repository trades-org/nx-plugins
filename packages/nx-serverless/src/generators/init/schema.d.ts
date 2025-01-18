export interface InitGeneratorSchema {
  unitTestRunner: 'jest' | 'none';
  plugin: 'serverless-esbuild' | '@trades-org/nx-serverless/plugin';
  skipFormat: boolean;
}
