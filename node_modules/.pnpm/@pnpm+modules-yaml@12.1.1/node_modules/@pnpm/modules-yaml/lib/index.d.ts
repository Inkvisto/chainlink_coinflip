import { type DependenciesField, type HoistedDependencies, type Registries } from '@pnpm/types';
export type IncludedDependencies = {
    [dependenciesField in DependenciesField]: boolean;
};
export interface Modules {
    hoistedAliases?: {
        [depPath: string]: string[];
    };
    hoistedDependencies: HoistedDependencies;
    hoistPattern?: string[];
    included: IncludedDependencies;
    layoutVersion: number;
    nodeLinker?: 'hoisted' | 'isolated' | 'pnp';
    packageManager: string;
    pendingBuilds: string[];
    prunedAt: string;
    registries?: Registries;
    shamefullyHoist?: boolean;
    publicHoistPattern?: string[];
    skipped: string[];
    storeDir: string;
    virtualStoreDir: string;
    injectedDeps?: Record<string, string[]>;
    hoistedLocations?: Record<string, string[]>;
}
export declare function readModulesManifest(modulesDir: string): Promise<Modules | null>;
export declare function writeModulesManifest(modulesDir: string, modules: Modules & {
    registries: Registries;
}, opts?: {
    makeModulesDir?: boolean;
}): Promise<void>;
