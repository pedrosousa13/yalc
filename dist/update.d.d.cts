import { PackageInstallation } from './installations.cjs';

interface UpdatePackagesOptions {
    workingDir: string;
    noInstallationsRemove?: boolean;
    replace?: boolean;
    update?: boolean;
    restore?: boolean;
}
declare const updatePackages: (packages: string[], options: UpdatePackagesOptions) => Promise<PackageInstallation[]>;

export { type UpdatePackagesOptions, updatePackages };
