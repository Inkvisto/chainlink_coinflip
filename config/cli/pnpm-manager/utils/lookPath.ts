import * as fs from 'fs';
import * as path from 'path';

const isWindows = /^win/i.test(process.platform);

const isFilepath = (cmd: string): string | undefined => {
    return cmd.includes(path.sep) ? path.resolve(cmd) : undefined;
}

const access = (fpath: string): Promise<string | undefined> => {
    return new Promise(resolve => fs.access(fpath, fs.constants.X_OK, err => resolve(err ? undefined : fpath)));
};

const isExecutable = async (abspath: string, opt: LookPathOption = {}): Promise<string | undefined> => {
    const envvars = opt.env || process.env;
    const exts = (envvars.PATHEXT || '').split(path.delimiter).concat('');
    const bins = await Promise.all(exts.map(ext => access(abspath + ext)));
    return bins.find(bin => !!bin);
};

const getDirsToWalkThrough = (opt: LookPathOption): string[] => {
    const envvars = opt.env || process.env;
    const envname = isWindows ? 'Path' : 'PATH';
    return (envvars[envname] || '').split(path.delimiter).concat(opt.include || []).filter(p => !(opt.exclude || []).includes(p));
};
export async function lookpath(command: string, opt: LookPathOption = {}): Promise<string | undefined> {

    const directpath = isFilepath(command);
    if (directpath) return isExecutable(directpath, opt);

    const dirs = getDirsToWalkThrough(opt);
    const bins = await Promise.all(dirs.map(dir => isExecutable(path.join(dir, command), opt)));
    return bins.find(bin => !!bin);
}

export interface LookPathOption {
    include?: string[];
    exclude?: string[];
    env?: NodeJS.ProcessEnv;
}