// LRule.js

/**
* LRule is a rule for an LSystem. Specifically, it maps
* one (?) letter to another
**/

export default class LRule {

  /**
  * creates a rule (mapping) where inputString generates outputString
  **/
  constructor(inputString, outputString) {
    this.input = inputString;
    this.output = outputString;
  }

  getInput() {
    return this.input;
  }

  getOutput(char) {
    if (! this.matches(char)) {
      let message = `The rule '${this.input} -> ${this.output}' ` +
            `cannot be applied to character '${char}'`;
      throw new Error(message);
    }
    return this.output;
  }

  /**
  * returns true if this rule can be applied
  * to testString
  **/
  matches(testString) {
    return testString === this.input;
  }

}