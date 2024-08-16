declare type LockFileConfigV0 = {
    [packageName: string]: {
        version?: string;
        file?: boolean;
    };
};
declare type LockFilePackageEntry = {
    version?: string;
    file?: boolean;
    link?: boolean;
    replaced?: string;
    signature?: string;
    pure?: boolean;
    workspace?: boolean;
};
declare type LockFileConfigV1 = {
    version: 'v1';
    packages: {
        [packageName: string]: LockFilePackageEntry;
    };
};
declare type LockFileConfig = LockFileConfigV1;
declare const removeLockfile: (options: {
    workingDir: string;
}) => void;
declare const readLockfile: (options: {
    workingDir: string;
}) => LockFileConfigV1;
declare const writeLockfile: (lockfile: LockFileConfig, options: {
    workingDir: string;
}) => void;
declare const addPackageToLockfile: (packages: ({
    name: string;
} & LockFilePackageEntry)[], options: {
    workingDir: string;
}) => void;

export { type LockFileConfigV0, type LockFileConfigV1, type LockFilePackageEntry, addPackageToLockfile, readLockfile, removeLockfile, writeLockfile };
