import { type PackageManifest } from '@pnpm/types';
export declare function readPackageJson(pkgPath: string): Promise<PackageManifest>;
export declare function readPackageJsonFromDir(pkgPath: string): Promise<PackageManifest>;
export declare function safeReadPackageJson(pkgPath: string): Promise<PackageManifest | null>;
export declare function safeReadPackageJsonFromDir(pkgPath: string): Promise<PackageManifest | null>;
