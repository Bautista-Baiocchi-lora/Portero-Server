import { Repository } from 'typeorm';
declare class ScriptQuery<T> {
    private script;
    private parameters?;
    private resultParser?;
    constructor(script: string);
    setParameters(...parameters: any): ScriptQuery<T>;
    setResultParser(parser: (result: any) => T): ScriptQuery<T>;
    private constructQuery;
    private parseResults;
    executeForMultiResult(repository: Repository<any>): Promise<T[]>;
    executeForSingleResult(repository: Repository<any>): Promise<T>;
    executeForSuccess(repository: Repository<any>): Promise<boolean>;
    executeForFailure(repository: Repository<any>): Promise<boolean>;
}
export default function PostgreScriptQuery<T>(script: string): ScriptQuery<T>;
export {};
