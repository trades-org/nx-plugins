import { detectPackageManager } from 'nx/src/utils/package-manager';

export function getPackageManagerInstall(packageManager?: 'npm' | 'yarn' | 'pnpm'): string {
  packageManager = packageManager || detectPackageManager();

  switch (packageManager) {
    case 'yarn':
      return 'yarn';
    case 'pnpm':
      return 'pnpm i --frozen-lockfile';
    case 'npm':
    default:
      return 'npm ci';
  }
}
