"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortLockfileKeys = void 0;
const util_lex_comparator_1 = require("@pnpm/util.lex-comparator");
const sort_keys_1 = __importDefault(require("sort-keys"));
const ORDERED_KEYS = {
    resolution: 1,
    id: 2,
    name: 3,
    version: 4,
    engines: 5,
    cpu: 6,
    os: 7,
    libc: 8,
    deprecated: 9,
    hasBin: 10,
    prepare: 11,
    requiresBuild: 12,
    bundleDependencies: 13,
    peerDependencies: 14,
    peerDependenciesMeta: 15,
    dependencies: 16,
    optionalDependencies: 17,
    transitivePeerDependencies: 18,
    dev: 19,
    optional: 20,
};
const ROOT_KEYS_ORDER = {
    lockfileVersion: 1,
    settings: 2,
    // only and never are conflict options.
    neverBuiltDependencies: 3,
    onlyBuiltDependencies: 3,
    overrides: 4,
    packageExtensionsChecksum: 5,
    patchedDependencies: 6,
    specifiers: 10,
    dependencies: 11,
    optionalDependencies: 12,
    devDependencies: 13,
    dependenciesMeta: 14,
    importers: 15,
    packages: 16,
};
function compareWithPriority(priority, left, right) {
    const leftPriority = priority[left];
    const rightPriority = priority[right];
    if (leftPriority && rightPriority)
        return leftPriority - rightPriority;
    if (leftPriority)
        return -1;
    if (rightPriority)
        return 1;
    return (0, util_lex_comparator_1.lexCompare)(left, right);
}
function sortLockfileKeys(lockfile) {
    const compareRootKeys = compareWithPriority.bind(null, ROOT_KEYS_ORDER);
    if (lockfile.importers != null) {
        lockfile.importers = (0, sort_keys_1.default)(lockfile.importers);
        for (const [importerId, importer] of Object.entries(lockfile.importers)) {
            lockfile.importers[importerId] = (0, sort_keys_1.default)(importer, {
                compare: compareRootKeys,
                deep: true,
            });
        }
    }
    if (lockfile.packages != null) {
        lockfile.packages = (0, sort_keys_1.default)(lockfile.packages);
        for (const [pkgId, pkg] of Object.entries(lockfile.packages)) {
            lockfile.packages[pkgId] = (0, sort_keys_1.default)(pkg, {
                compare: compareWithPriority.bind(null, ORDERED_KEYS),
                deep: true,
            });
        }
    }
    for (const key of ['specifiers', 'dependencies', 'devDependencies', 'optionalDependencies', 'time', 'patchedDependencies']) {
        if (!lockfile[key])
            continue;
        lockfile[key] = (0, sort_keys_1.default)(lockfile[key]); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    return (0, sort_keys_1.default)(lockfile, { compare: compareRootKeys });
}
exports.sortLockfileKeys = sortLockfileKeys;
//# sourceMappingURL=sortLockfileKeys.js.map