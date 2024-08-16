declare type PackageMangerName = 'yarn' | 'npm' | 'pnpm';
declare const pmMarkFiles: {
    [P in PackageMangerName]: string[];
};
declare const pmInstallCmd: {
    [P in PackageMangerName]: string;
};
declare const pmUpdateCmd: {
    [P in PackageMangerName]: string;
};
declare const pmRunScriptCmd: {
    [P in PackageMangerName]: string;
};
declare const getPackageManager: (cwd: string) => PackageMangerName;
declare const getRunScriptCmd: (cwd: string) => string;
declare const getPackageManagerInstallCmd: (cwd: string) => string;
declare const getPackageManagerUpdateCmd: (cwd: string) => string;
declare const isYarn: (cwd: string) => boolean;
declare const runPmUpdate: (workingDir: string, packages: string[]) => void;

export { getPackageManager, getPackageManagerInstallCmd, getPackageManagerUpdateCmd, getRunScriptCmd, isYarn, pmInstallCmd, pmMarkFiles, pmRunScriptCmd, pmUpdateCmd, runPmUpdate };
