import { type Registries } from '@pnpm/types';
export declare const DEFAULT_REGISTRIES: {
    default: string;
};
export declare function normalizeRegistries(registries?: Record<string, string>): Registries;
