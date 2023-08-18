import { FetchError, type FetchErrorRequest, type FetchErrorResponse } from '@pnpm/error';
import { type FetchFromRegistry, type RetryTimeoutOptions } from '@pnpm/fetching-types';
import { type PackageMeta } from './pickPackage';
export declare class RegistryResponseError extends FetchError {
    readonly pkgName: string;
    constructor(request: FetchErrorRequest, response: FetchErrorResponse, pkgName: string);
}
export declare function fromRegistry(fetch: FetchFromRegistry, fetchOpts: {
    retry: RetryTimeoutOptions;
    timeout: number;
}, pkgName: string, registry: string, authHeaderValue?: string): Promise<PackageMeta>;
