export interface SlsInfisicalExecutorSchema {
  command: string;
  infisicalPath: string;
  infisicalEnv: string;
  env?: NodeJS.ProcessEnv;
}
