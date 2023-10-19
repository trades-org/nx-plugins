import { detectPackageManager } from 'nx/src/utils/package-manager';

export function getPackageManagerLockFile(packageManager?: 'npm' | 'yarn' | 'pnpm'): string {
  packageManager = packageManager || detectPackageManager();

  switch (packageManager) {
    case 'yarn':
      return 'yarn.lock';
    case 'pnpm':
      return 'pnpm-lock.yaml';
    case 'npm':
    default:
      return 'package-lock.json';
  }
}
