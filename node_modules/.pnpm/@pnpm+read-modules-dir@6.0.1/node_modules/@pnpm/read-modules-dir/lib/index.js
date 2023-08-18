"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readModulesDir = void 0;
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const graceful_fs_1 = __importDefault(require("graceful-fs"));
const readdir = util_1.default.promisify(graceful_fs_1.default.readdir);
async function readModulesDir(modulesDir) {
    try {
        return await _readModulesDir(modulesDir);
    }
    catch (err) { // eslint-disable-line
        if (err['code'] === 'ENOENT')
            return null;
        throw err;
    }
}
exports.readModulesDir = readModulesDir;
async function _readModulesDir(modulesDir, scope) {
    const pkgNames = [];
    const parentDir = scope ? path_1.default.join(modulesDir, scope) : modulesDir;
    await Promise.all((await readdir(parentDir, { withFileTypes: true })).map(async (dir) => {
        if (dir.isFile() || dir.name[0] === '.')
            return;
        if (!scope && dir.name[0] === '@') {
            pkgNames.push(...await _readModulesDir(modulesDir, dir.name));
            return;
        }
        const pkgName = scope ? `${scope}/${dir.name}` : dir.name;
        pkgNames.push(pkgName);
    }));
    return pkgNames;
}
//# sourceMappingURL=index.js.map