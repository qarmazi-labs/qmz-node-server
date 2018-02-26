const Util = require('./Util');
const package = require('../package');

const env_defaults = {
  env: 'development',
  httpPort: 80,
  httpsPort: 443,
  domain: 'example.com'
};

class Context {
  constructor() {
    this.expectedEnvvar = {};
    this.envfileFound = false;

    this.getEnvironmentDefinition();
  }

  getEnvironmentDefinition() {
    const envDef = require('../environment');

    if (!envDef) {
      this.envfileFound = false;
      return;
    }

    this.expectedEnvvar._keys = [];
    this.expectedEnvvar._required = [];

    envDef.forEach( envvar => {
      this.expectedEnvvar[envvar.name] = {
        defaultValue: envvar['default'] || null,
        required: envvar.required || false,
      };

      this.expectedEnvvar._keys.push(envvar.name);
      if (envvar.required) this.expectedEnvvar._required.push(envvar.name);
    });
  }

  bootstrap(options) {
    const validOptions = this.validateOptions(options);
    this.options = validOptions || options;

    Object.keys(this.expectedEnvvar).forEach( envvarName => {
      if (!envvarName.match(/^_/)) {
        const value = this.getEnvVar(envvarName, this.expectedEnvvar[envvarName].defaultValue);
        this[Util.snakeToCamel(envvarName)] = value;
      }
    });

    return this;
  }

  getEnvVar(name, defaultValue) {
    // Var precedence env -> npm config -> dotenv -> defaultValue
    return process.env[name] ||
      (this.options.testPackageEnv && false) ||
      (this.options.testDotEnv && false) || defaultValue;
  }

  validateEnvvars(options) {
    const invalidEnvvars = Object.getOwnPropertyNames(Context.prototype);
    // todo
    return undefined;
  }

  validateOptions(options) {
    // todo
    return undefined;
  }
}

module.exports = Context;
