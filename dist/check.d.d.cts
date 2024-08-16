declare type CheckOptions = {
    workingDir: string;
    all?: boolean;
    commit?: boolean;
};
declare function checkManifest(options: CheckOptions): void;

export { type CheckOptions, checkManifest };
