import { parse } from 'url';
import { Repository } from 'typeorm';
import { response } from 'express';
import { isString } from 'util';

class ScriptQuery<T> {
  private script: string;
  private parameters?: any[];
  private resultParser?: (result: string) => T;

  constructor(script: string) {
    if (!script || script === '') {
      throw new Error('Undefined script.');
    }
    this.script = script;
  }

  // Provider parameters in same order as in PostgreSQL script
  public setParameters(...parameters: any): ScriptQuery<T> {
    this.parameters = parameters;
    return this;
  }

  public setResultParser(parser: (result: any) => T): ScriptQuery<T> {
    this.resultParser = parser;
    return this;
  }

  private constructQuery(): string {
    let query: string = `SELECT ${this.script}(`;

    //Insert parameters into query.
    if (this.parameters.length > 0) {
      this.parameters.forEach(parameter => (query += `'${parameter}', `));
      query = query.substring(0, query.lastIndexOf(', ')); //remove trailing ', ' after last parameter
    }

    return query + ')';
  }

  /*
  Reponse format example:
  script name: find_or_insert_o_auth_user
  [ { find_or_insert_o_auth_user:'(107007507068402,Emily,Sharpestein,3,2019-03-25,emily_nwijqhl_sharpestein@tfbnw.net,1)' } ]
  */
  private parseResults = (results: any[]) => {
    return results.map(result => {
      let toParse: string = result[this.script];
      if (isString(toParse)) {
        toParse = toParse.replace('(', '').replace(')', '');
      }
      return this.resultParser ? this.resultParser(toParse) : defaultResultParser<T>(toParse);
    });
  };

  public async executeForMultiResult(repository: Repository<any>): Promise<T[]> {
    return repository.query(this.constructQuery()).then(this.parseResults);
  }

  public async executeForSingleResult(repository: Repository<any>): Promise<T> {
    return this.executeForMultiResult(repository).then(result => result[0]);
  }

  //if query is successful then return true
  public async executeForSuccess(repository: Repository<any>): Promise<boolean> {
    return this.executeForMultiResult(repository).then(result => !result);
  }

  public async executeForFailure(repository: Repository<any>): Promise<boolean> {
    try {
      await this.executeForMultiResult(repository);
    } catch (e) {
      return true;
    }

    return false;
  }
}

const defaultResultParser = <T>(result: any): T => {
  return result as T;
};

export default function PostgreScriptQuery<T>(script: string): ScriptQuery<T> {
  return new ScriptQuery<T>(script);
}