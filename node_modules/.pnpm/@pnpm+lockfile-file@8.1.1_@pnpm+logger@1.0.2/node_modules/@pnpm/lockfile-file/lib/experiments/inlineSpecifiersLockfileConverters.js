"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLockfileV6DepPathToV5DepPath = exports.revertFromInlineSpecifiersFormat = exports.revertFromInlineSpecifiersFormatIfNecessary = exports.convertToInlineSpecifiersFormat = exports.isExperimentalInlineSpecifiersFormat = void 0;
const dp = __importStar(require("@pnpm/dependency-path"));
const InlineSpecifiersLockfile_1 = require("./InlineSpecifiersLockfile");
function isExperimentalInlineSpecifiersFormat(lockfile) {
    const { lockfileVersion } = lockfile;
    return lockfileVersion.toString().startsWith('6.') || typeof lockfileVersion === 'string' && lockfileVersion.endsWith(InlineSpecifiersLockfile_1.INLINE_SPECIFIERS_FORMAT_LOCKFILE_VERSION_SUFFIX);
}
exports.isExperimentalInlineSpecifiersFormat = isExperimentalInlineSpecifiersFormat;
function convertToInlineSpecifiersFormat(lockfile) {
    let importers = lockfile.importers;
    let packages = lockfile.packages;
    if (lockfile.lockfileVersion.toString().startsWith('6.')) {
        importers = Object.fromEntries(Object.entries(lockfile.importers ?? {})
            .map(([importerId, pkgSnapshot]) => {
            const newSnapshot = { ...pkgSnapshot };
            if (newSnapshot.dependencies != null) {
                newSnapshot.dependencies = mapValues(newSnapshot.dependencies, convertOldRefToNewRef);
            }
            if (newSnapshot.optionalDependencies != null) {
                newSnapshot.optionalDependencies = mapValues(newSnapshot.optionalDependencies, convertOldRefToNewRef);
            }
            if (newSnapshot.devDependencies != null) {
                newSnapshot.devDependencies = mapValues(newSnapshot.devDependencies, convertOldRefToNewRef);
            }
            return [importerId, newSnapshot];
        }));
        packages = Object.fromEntries(Object.entries(lockfile.packages ?? {})
            .map(([depPath, pkgSnapshot]) => {
            const newSnapshot = { ...pkgSnapshot };
            if (newSnapshot.dependencies != null) {
                newSnapshot.dependencies = mapValues(newSnapshot.dependencies, convertOldRefToNewRef);
            }
            if (newSnapshot.optionalDependencies != null) {
                newSnapshot.optionalDependencies = mapValues(newSnapshot.optionalDependencies, convertOldRefToNewRef);
            }
            return [convertOldDepPathToNewDepPath(depPath), newSnapshot];
        }));
    }
    const newLockfile = {
        ...lockfile,
        packages,
        lockfileVersion: lockfile.lockfileVersion.toString().startsWith('6.')
            ? lockfile.lockfileVersion.toString()
            : (lockfile.lockfileVersion.toString().endsWith(InlineSpecifiersLockfile_1.INLINE_SPECIFIERS_FORMAT_LOCKFILE_VERSION_SUFFIX)
                ? lockfile.lockfileVersion.toString()
                : `${lockfile.lockfileVersion}${InlineSpecifiersLockfile_1.INLINE_SPECIFIERS_FORMAT_LOCKFILE_VERSION_SUFFIX}`),
        importers: mapValues(importers, convertProjectSnapshotToInlineSpecifiersFormat),
    };
    if (lockfile.lockfileVersion.toString().startsWith('6.') && newLockfile.time) {
        newLockfile.time = Object.fromEntries(Object.entries(newLockfile.time)
            .map(([depPath, time]) => [convertOldDepPathToNewDepPath(depPath), time]));
    }
    return newLockfile;
}
exports.convertToInlineSpecifiersFormat = convertToInlineSpecifiersFormat;
function convertOldDepPathToNewDepPath(oldDepPath) {
    const parsedDepPath = dp.parse(oldDepPath);
    if (!parsedDepPath.name || !parsedDepPath.version)
        return oldDepPath;
    let newDepPath = `/${parsedDepPath.name}@${parsedDepPath.version}`;
    if (parsedDepPath.peersSuffix) {
        if (parsedDepPath.peersSuffix.startsWith('(')) {
            newDepPath += parsedDepPath.peersSuffix;
        }
        else {
            newDepPath += `_${parsedDepPath.peersSuffix}`;
        }
    }
    if (parsedDepPath.host) {
        newDepPath = `${parsedDepPath.host}${newDepPath}`;
    }
    return newDepPath;
}
function convertOldRefToNewRef(oldRef) {
    if (oldRef.startsWith('link:') || oldRef.startsWith('file:')) {
        return oldRef;
    }
    if (oldRef.includes('/')) {
        return convertOldDepPathToNewDepPath(oldRef);
    }
    return oldRef;
}
function revertFromInlineSpecifiersFormatIfNecessary(lockfile) {
    return isExperimentalInlineSpecifiersFormat(lockfile)
        ? revertFromInlineSpecifiersFormat(lockfile)
        : lockfile;
}
exports.revertFromInlineSpecifiersFormatIfNecessary = revertFromInlineSpecifiersFormatIfNecessary;
function revertFromInlineSpecifiersFormat(lockfile) {
    const { lockfileVersion, importers, ...rest } = lockfile;
    const originalVersionStr = lockfileVersion.replace(InlineSpecifiersLockfile_1.INLINE_SPECIFIERS_FORMAT_LOCKFILE_VERSION_SUFFIX, '');
    const originalVersion = Number(originalVersionStr);
    if (isNaN(originalVersion)) {
        throw new Error(`Unable to revert lockfile from inline specifiers format. Invalid version parsed: ${originalVersionStr}`);
    }
    let revertedImporters = mapValues(importers, revertProjectSnapshot);
    let packages = lockfile.packages;
    if (originalVersionStr.startsWith('6.')) {
        revertedImporters = Object.fromEntries(Object.entries(revertedImporters ?? {})
            .map(([importerId, pkgSnapshot]) => {
            const newSnapshot = { ...pkgSnapshot };
            if (newSnapshot.dependencies != null) {
                newSnapshot.dependencies = mapValues(newSnapshot.dependencies, convertNewRefToOldRef);
            }
            if (newSnapshot.optionalDependencies != null) {
                newSnapshot.optionalDependencies = mapValues(newSnapshot.optionalDependencies, convertNewRefToOldRef);
            }
            if (newSnapshot.devDependencies != null) {
                newSnapshot.devDependencies = mapValues(newSnapshot.devDependencies, convertNewRefToOldRef);
            }
            return [importerId, newSnapshot];
        }));
        packages = Object.fromEntries(Object.entries(lockfile.packages ?? {})
            .map(([depPath, pkgSnapshot]) => {
            const newSnapshot = { ...pkgSnapshot };
            if (newSnapshot.dependencies != null) {
                newSnapshot.dependencies = mapValues(newSnapshot.dependencies, convertNewRefToOldRef);
            }
            if (newSnapshot.optionalDependencies != null) {
                newSnapshot.optionalDependencies = mapValues(newSnapshot.optionalDependencies, convertNewRefToOldRef);
            }
            return [convertLockfileV6DepPathToV5DepPath(depPath), newSnapshot];
        }));
    }
    const newLockfile = {
        ...rest,
        lockfileVersion: lockfileVersion.endsWith(InlineSpecifiersLockfile_1.INLINE_SPECIFIERS_FORMAT_LOCKFILE_VERSION_SUFFIX) ? originalVersion : lockfileVersion,
        packages,
        importers: revertedImporters,
    };
    if (originalVersionStr.startsWith('6.') && newLockfile.time) {
        newLockfile.time = Object.fromEntries(Object.entries(newLockfile.time)
            .map(([depPath, time]) => [convertLockfileV6DepPathToV5DepPath(depPath), time]));
    }
    return newLockfile;
}
exports.revertFromInlineSpecifiersFormat = revertFromInlineSpecifiersFormat;
function convertLockfileV6DepPathToV5DepPath(newDepPath) {
    if (!newDepPath.includes('@', 2) || newDepPath.startsWith('file:'))
        return newDepPath;
    const index = newDepPath.indexOf('@', newDepPath.indexOf('/@') + 2);
    if (newDepPath.includes('(') && index > dp.indexOfPeersSuffix(newDepPath))
        return newDepPath;
    return `${newDepPath.substring(0, index)}/${newDepPath.substring(index + 1)}`;
}
exports.convertLockfileV6DepPathToV5DepPath = convertLockfileV6DepPathToV5DepPath;
function convertNewRefToOldRef(oldRef) {
    if (oldRef.startsWith('link:') || oldRef.startsWith('file:')) {
        return oldRef;
    }
    if (oldRef.includes('@')) {
        return convertLockfileV6DepPathToV5DepPath(oldRef);
    }
    return oldRef;
}
function convertProjectSnapshotToInlineSpecifiersFormat(projectSnapshot) {
    const { specifiers, ...rest } = projectSnapshot;
    const convertBlock = (block) => block != null
        ? convertResolvedDependenciesToInlineSpecifiersFormat(block, { specifiers })
        : block;
    return {
        ...rest,
        dependencies: convertBlock(projectSnapshot.dependencies),
        optionalDependencies: convertBlock(projectSnapshot.optionalDependencies),
        devDependencies: convertBlock(projectSnapshot.devDependencies),
    };
}
function convertResolvedDependenciesToInlineSpecifiersFormat(resolvedDependencies, { specifiers }) {
    return mapValues(resolvedDependencies, (version, depName) => ({
        specifier: specifiers[depName],
        version,
    }));
}
function revertProjectSnapshot(from) {
    const specifiers = {};
    function moveSpecifiers(from) {
        const resolvedDependencies = {};
        for (const [depName, { specifier, version }] of Object.entries(from)) {
            const existingValue = specifiers[depName];
            if (existingValue != null && existingValue !== specifier) {
                throw new Error(`Project snapshot lists the same dependency more than once with conflicting versions: ${depName}`);
            }
            specifiers[depName] = specifier;
            resolvedDependencies[depName] = version;
        }
        return resolvedDependencies;
    }
    const dependencies = from.dependencies == null
        ? from.dependencies
        : moveSpecifiers(from.dependencies);
    const devDependencies = from.devDependencies == null
        ? from.devDependencies
        : moveSpecifiers(from.devDependencies);
    const optionalDependencies = from.optionalDependencies == null
        ? from.optionalDependencies
        : moveSpecifiers(from.optionalDependencies);
    return {
        ...from,
        specifiers,
        dependencies,
        devDependencies,
        optionalDependencies,
    };
}
function mapValues(obj, mapper) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        result[key] = mapper(value, key);
    }
    return result;
}
//# sourceMappingURL=inlineSpecifiersLockfileConverters.js.map