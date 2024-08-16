interface PublishPackageOptions {
    workingDir: string;
    signature?: boolean;
    changed?: boolean;
    push?: boolean;
    update?: boolean;
    replace?: boolean;
    npm?: boolean;
    content?: boolean;
    private?: boolean;
    scripts?: boolean;
    devMod?: boolean;
    workspaceResolve?: boolean;
}
declare const publishPackage: (options: PublishPackageOptions) => Promise<void>;

export { type PublishPackageOptions, publishPackage };
