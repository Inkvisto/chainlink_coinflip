import { type Lockfile } from '@pnpm/lockfile-types';
export declare function extendProjectsWithTargetDirs<T>(projects: Array<T & {
    id: string;
}>, lockfile: Lockfile, ctx: {
    virtualStoreDir: string;
    pkgLocationsByDepPath?: Record<string, string[]>;
}): Array<T & {
    id: string;
    stages: string[];
    targetDirs: string[];
}>;
