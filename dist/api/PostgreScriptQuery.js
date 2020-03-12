"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class ScriptQuery {
    constructor(script) {
        this.parseResults = (results) => {
            return results.map(result => {
                let toParse = result[this.script];
                if (util_1.isString(toParse)) {
                    toParse = toParse.replace('(', '').replace(')', '');
                }
                return this.resultParser ? this.resultParser(toParse) : defaultResultParser(toParse);
            });
        };
        if (!script || script === '') {
            throw new Error('Undefined script.');
        }
        this.script = script;
    }
    setParameters(...parameters) {
        this.parameters = parameters;
        return this;
    }
    setResultParser(parser) {
        this.resultParser = parser;
        return this;
    }
    constructQuery() {
        let query = `SELECT ${this.script}(`;
        if (this.parameters.length > 0) {
            this.parameters.forEach(parameter => (query += `'${parameter}', `));
            query = query.substring(0, query.lastIndexOf(', '));
        }
        return query + ')';
    }
    async executeForMultiResult(repository) {
        return repository.query(this.constructQuery()).then(this.parseResults);
    }
    async executeForSingleResult(repository) {
        return this.executeForMultiResult(repository).then(result => result[0]);
    }
    async executeForSuccess(repository) {
        return this.executeForMultiResult(repository).then(result => !result);
    }
    async executeForFailure(repository) {
        try {
            await this.executeForMultiResult(repository);
        }
        catch (e) {
            return true;
        }
        return false;
    }
}
const defaultResultParser = (result) => {
    return result;
};
function PostgreScriptQuery(script) {
    return new ScriptQuery(script);
}
exports.default = PostgreScriptQuery;
//# sourceMappingURL=PostgreScriptQuery.js.map