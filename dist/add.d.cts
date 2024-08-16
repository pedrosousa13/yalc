interface AddPackagesOptions {
    dev?: boolean;
    link?: boolean;
    linkDep?: boolean;
    replace?: boolean;
    update?: boolean;
    safe?: boolean;
    pure?: boolean;
    restore?: boolean;
    workspace?: boolean;
    workingDir: string;
}
declare const addPackages: (packages: string[], options: AddPackagesOptions) => Promise<void>;

export { type AddPackagesOptions, addPackages };
