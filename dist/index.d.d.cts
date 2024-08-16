/// <reference types="node" />
import { ExecSyncOptions } from 'child_process';
export { publishPackage } from './publish.cjs';
export { updatePackages } from './update.cjs';
export { checkManifest } from './check.cjs';
export { removePackages } from './remove.cjs';
export { addPackages } from './add.cjs';
export { PackageManifest, PackageScripts, parsePackageName, readPackageManifest, writePackageManifest } from './pkg.cjs';
export { getPackageManager, getPackageManagerInstallCmd, getPackageManagerUpdateCmd, getRunScriptCmd, isYarn, pmInstallCmd, pmMarkFiles, pmRunScriptCmd, pmUpdateCmd, runPmUpdate } from './pm.cjs';
import './installations.cjs';

declare const values: {
    myNameIs: string;
    ignoreFileName: string;
    myNameIsCapitalized: string;
    lockfileName: string;
    yalcPackagesFolder: string;
    prescript: string;
    postscript: string;
    installationsFile: string;
};
interface UpdatePackagesOptions {
    safe?: boolean;
    workingDir: string;
}

interface YalcGlobal {
    yalcStoreMainDir: string;
}
declare const yalcGlobal: YalcGlobal;
declare function getStoreMainDir(): string;
declare function getStorePackagesDir(): string;
declare const getPackageStoreDir: (packageName: string, version?: string) => string;
declare const execLoudOptions: ExecSyncOptions;
declare const readSignatureFile: (workingDir: string) => string;
declare const readIgnoreFile: (workingDir: string) => string;
declare const writeSignatureFile: (workingDir: string, signature: string) => void;

export { type UpdatePackagesOptions, type YalcGlobal, execLoudOptions, getPackageStoreDir, getStoreMainDir, getStorePackagesDir, readIgnoreFile, readSignatureFile, values, writeSignatureFile, yalcGlobal };
