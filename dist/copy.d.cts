declare const getFileHash: (srcPath: string, relPath?: string) => Promise<string>;
declare const copyPackageToStore: (options: {
    workingDir: string;
    signature?: boolean | undefined;
    changed?: boolean | undefined;
    content?: boolean | undefined;
    devMod?: boolean | undefined;
    workspaceResolve?: boolean | undefined;
}) => Promise<string | false>;

export { copyPackageToStore, getFileHash };
