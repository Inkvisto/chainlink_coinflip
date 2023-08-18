import { type Lockfile, type ProjectSnapshot } from '@pnpm/lockfile-types';
export declare function writeWantedLockfile(pkgPath: string, wantedLockfile: Lockfile, opts?: {
    forceSharedFormat?: boolean;
    useGitBranchLockfile?: boolean;
    mergeGitBranchLockfiles?: boolean;
}): Promise<void>;
export declare function writeCurrentLockfile(virtualStoreDir: string, currentLockfile: Lockfile, opts?: {
    forceSharedFormat?: boolean;
}): Promise<void>;
export declare function isEmptyLockfile(lockfile: Lockfile): boolean;
export type LockfileFile = Omit<Lockfile, 'importers'> & Partial<ProjectSnapshot> & Partial<Pick<Lockfile, 'importers'>>;
export interface NormalizeLockfileOpts {
    forceSharedFormat: boolean;
    includeEmptySpecifiersField: boolean;
}
export declare function normalizeLockfile(lockfile: Lockfile, opts: NormalizeLockfileOpts): LockfileFile;
export declare function writeLockfiles(opts: {
    forceSharedFormat?: boolean;
    wantedLockfile: Lockfile;
    wantedLockfileDir: string;
    currentLockfile: Lockfile;
    currentLockfileDir: string;
    useGitBranchLockfile?: boolean;
    mergeGitBranchLockfiles?: boolean;
}): Promise<void>;
