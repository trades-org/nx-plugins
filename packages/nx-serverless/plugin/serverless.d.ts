declare namespace Serverless {
  interface Instance {
    cli: {
      log(str: string): void;
    };

    config: {
      servicePath: string;
    };

    service: {
      getServiceObject(): Service;
      provider: {
        name: string;
      };
      functions: {
        [key: string]: Serverless.Function;
      };
      package: Serverless.Package;
      getAllFunctions(): string[];
      custom?: {
        stepFunctionsOffline?: {
          location?: string;
        };
        'serverless-offline'?: {
          location?: string;
        };
      };
    };

    pluginManager: PluginManager;
  }

  interface Service {
    name: string;
  }

  interface Options {
    function?: string;
    skipPackage?: boolean;
  }

  interface Function {
    handler: string;
    name: string;
    events: Record<string, unknown>;
    package?: Serverless.Package;
  }

  interface Package {
    include?: string[];
    exclude?: string[];
    patterns?: string[];
    artifact?: string;
    individually?: boolean;
  }

  interface PluginManager {
    spawn(command: string): Promise<void>;
  }

  interface Logging {
    log: {
      error: (text: string) => void;
      warning: (text: string) => void;
      notice: (text: string) => void;
      info: (text: string) => void;
      debug: (text: string) => void;
      verbose: (text: string) => void;
      success: (text: string) => void;
    };
    writeText: (text: string | string[]) => void;
  }
}
