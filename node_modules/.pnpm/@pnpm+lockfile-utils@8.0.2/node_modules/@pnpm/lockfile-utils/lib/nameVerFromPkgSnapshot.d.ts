import { type PackageSnapshot } from '@pnpm/lockfile-types';
export declare function nameVerFromPkgSnapshot(depPath: string, pkgSnapshot: PackageSnapshot): {
    name: string;
    peersSuffix: string | undefined;
    version: string;
};
