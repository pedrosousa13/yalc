import { PackageName } from './installations.cjs';

declare type PackageScripts = Partial<{
    preinstall: string;
    prepack: string;
    postpack: string;
    prepare: string;
    install: string;
    prepublish: string;
    prepublishOnly: string;
    publish: string;
    postpublish: string;
    preyalcpublish: string;
    preyalc: string;
    postyalcpublish: string;
    postyalc: string;
}>;
interface PackageManifest {
    name: string;
    version: string;
    yalcSig?: string;
    private?: boolean;
    bin?: string | {
        [name: string]: string;
    };
    dependencies?: {
        [name: string]: string;
    };
    devDependencies?: {
        [name: string]: string;
    };
    peerDependencies?: {
        [name: string]: string;
    };
    yalc: Partial<{
        sig: boolean;
        signature: boolean;
        noSig: boolean;
    }>;
    workspaces?: string[];
    scripts?: PackageScripts;
    __Indent?: string;
}
declare const parsePackageName: (packageName: string) => {
    name: PackageName;
    version: string;
};
declare function readPackageManifest(workingDir: string): PackageManifest | null;
declare function writePackageManifest(workingDir: string, pkg: PackageManifest): void;

export { type PackageManifest, type PackageScripts, parsePackageName, readPackageManifest, writePackageManifest };
