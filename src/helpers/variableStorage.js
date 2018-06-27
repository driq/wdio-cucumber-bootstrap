class VariableStorage {
    constructor() {
        this.variables = {};
    }

    /**
     * Save a variable
     *
     * @param  {String}   name The variable name
     * @param  {String}   value The variable
     */
    saveVariable(name, value) {
        this.variables[name] = value;
    }

    /**
     * Save a variable
     *
     * @param  {String}   name The variable name
     * @returns  {String} The variable
     */
    getVariable(name) {
        return this.variables[name];
    }
}

export default new VariableStorage();
