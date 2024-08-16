declare type PackageName = string & {
    __packageName: true;
};
declare type PackageInstallation = {
    name: PackageName;
    path: string;
};
declare type InstallationsFile = {
    [packageName: string]: string[];
};
declare const readInstallationsFile: () => InstallationsFile;
declare const showInstallations: ({ packages }: {
    packages: string[];
}) => void;
declare const cleanInstallations: ({ packages, dry, }: {
    packages: string[];
    dry: boolean;
}) => Promise<void>;
declare const saveInstallationsFile: (installationsConfig: InstallationsFile) => Promise<void>;
declare const addInstallations: (installations: PackageInstallation[]) => Promise<void>;
declare const removeInstallations: (installations: PackageInstallation[]) => Promise<void>;

export { type InstallationsFile, type PackageInstallation, type PackageName, addInstallations, cleanInstallations, readInstallationsFile, removeInstallations, saveInstallationsFile, showInstallations };
