import { type VersionSelectors } from '@pnpm/resolver-base';
import { type PackageManifest } from '@pnpm/types';
import { type RegistryPackageSpec } from './parsePref';
export interface PackageMeta {
    name: string;
    'dist-tags': Record<string, string>;
    versions: Record<string, PackageInRegistry>;
    time?: PackageMetaTime;
    cachedAt?: number;
}
export type PackageMetaTime = Record<string, string> & {
    unpublished?: {
        time: string;
        versions: string[];
    };
};
export interface PackageMetaCache {
    get: (key: string) => PackageMeta | undefined;
    set: (key: string, meta: PackageMeta) => void;
    has: (key: string) => boolean;
}
export type PackageInRegistry = PackageManifest & {
    dist: {
        integrity?: string;
        shasum: string;
        tarball: string;
    };
};
export interface PickPackageOptions {
    authHeaderValue?: string;
    publishedBy?: Date;
    preferredVersionSelectors: VersionSelectors | undefined;
    pickLowestVersion?: boolean;
    registry: string;
    dryRun: boolean;
}
export declare function pickPackage(ctx: {
    fetch: (pkgName: string, registry: string, authHeaderValue?: string) => Promise<PackageMeta>;
    metaDir: string;
    metaCache: PackageMetaCache;
    cacheDir: string;
    offline?: boolean;
    preferOffline?: boolean;
    filterMetadata?: boolean;
}, spec: RegistryPackageSpec, opts: PickPackageOptions): Promise<{
    meta: PackageMeta;
    pickedPackage: PackageInRegistry | null;
}>;
