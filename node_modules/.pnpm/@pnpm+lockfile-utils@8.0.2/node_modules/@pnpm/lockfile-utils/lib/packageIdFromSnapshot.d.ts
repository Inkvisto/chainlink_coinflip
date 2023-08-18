import { type PackageSnapshot } from '@pnpm/lockfile-types';
import { type Registries } from '@pnpm/types';
export declare function packageIdFromSnapshot(depPath: string, pkgSnapshot: PackageSnapshot, registries: Registries): string;
