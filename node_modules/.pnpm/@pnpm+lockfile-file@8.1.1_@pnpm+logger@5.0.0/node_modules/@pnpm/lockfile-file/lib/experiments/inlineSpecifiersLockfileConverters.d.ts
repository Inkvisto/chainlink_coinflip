import type { Lockfile } from '@pnpm/lockfile-types';
import { type InlineSpecifiersLockfile } from './InlineSpecifiersLockfile';
export declare function isExperimentalInlineSpecifiersFormat(lockfile: InlineSpecifiersLockfile | Lockfile): lockfile is InlineSpecifiersLockfile;
export declare function convertToInlineSpecifiersFormat(lockfile: Lockfile): InlineSpecifiersLockfile;
export declare function revertFromInlineSpecifiersFormatIfNecessary(lockfile: Lockfile | InlineSpecifiersLockfile): Lockfile;
export declare function revertFromInlineSpecifiersFormat(lockfile: InlineSpecifiersLockfile): Lockfile;
export declare function convertLockfileV6DepPathToV5DepPath(newDepPath: string): string;
