import { type Lockfile } from '@pnpm/lockfile-types';
export declare function readCurrentLockfile(virtualStoreDir: string, opts: {
    wantedVersions?: string[];
    ignoreIncompatible: boolean;
}): Promise<Lockfile | null>;
export declare function readWantedLockfileAndAutofixConflicts(pkgPath: string, opts: {
    wantedVersions?: string[];
    ignoreIncompatible: boolean;
    useGitBranchLockfile?: boolean;
    mergeGitBranchLockfiles?: boolean;
}): Promise<{
    lockfile: Lockfile | null;
    hadConflicts: boolean;
}>;
export declare function readWantedLockfile(pkgPath: string, opts: {
    wantedVersions?: string[];
    ignoreIncompatible: boolean;
    useGitBranchLockfile?: boolean;
    mergeGitBranchLockfiles?: boolean;
}): Promise<Lockfile | null>;
export declare function createLockfileObject(importerIds: string[], opts: {
    lockfileVersion: number | string;
    autoInstallPeers: boolean;
    excludeLinksFromLockfile: boolean;
}): {
    importers: Record<string, import("@pnpm/lockfile-types").ProjectSnapshot>;
    lockfileVersion: string | number;
    settings: {
        autoInstallPeers: boolean;
        excludeLinksFromLockfile: boolean;
    };
};
