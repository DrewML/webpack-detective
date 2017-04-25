// @flow

export type Asset = {
    name: string;
    size: number;
    chunks: Array<number>;
    chunkNames: Array<string>;
};

export type Module = {
    id: number;
    identifier: string;
    name: string;
    index: number;
    index2: number;
    size: number;
    cacheable: bool;
    chunks: Array<number>;
    issuer: string;
    issuerId: string;
    issuerName: string;
    reasons: Array<{
        moduleId: string;
        moduleIdentifier: string;
        module: string;
        moduleName: string;
        type: string;
        userRequest: string;
        loc: string;
    }>
};

export type Stats = {
    time: number;
    assets: Array<Asset>;
    modules: Array<Module>;
};
