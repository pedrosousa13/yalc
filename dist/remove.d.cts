interface RemovePackagesOptions {
    all?: boolean;
    retreat?: boolean;
    workingDir: string;
}
declare const removePackages: (packages: string[], options: RemovePackagesOptions) => Promise<void>;

export { type RemovePackagesOptions, removePackages };
