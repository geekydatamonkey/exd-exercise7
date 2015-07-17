/**
* LSystem
*
* Using an L-System, one can generate Fractal Forms. 
* An L-System takes an axiom (string) and a set of rules, then with each
* generation, the system expands the axiom according to the rules.
*
* Based on http://natureofcode.com/book/chapter-8-fractals/
* and the example code https://github.com/shiffman/The-Nature-of-Code-Examples
* 
* @example
* Axiom: A
* Ruleset:
*   A -> AB
*   B -> A
*
* Generations: 
* 0: A
* 1: AB (previous A becomes AB)
* 2: ABA (previous A becomes AB, B becomes A)
* 3: ABAAB
* 4: ABAABABA
*
*/

import LRule from './LRule';

export default class LSystem {

  /**
  * creates an LSystem from the string axiom and a rules object
  *
  * @param {string} axiom - starting state of the L-System
  * @param {object} rulesObject - object which defines the rules for the L-System.
  * @returns {LSystem}
  * @example rulesObject
  * { 'A': 'AB', 'B': 'A' } will create two rules: 'A' -> 'AB' and 'B' -> 'A'
  */
  constructor(axiom, rulesObject) {
    this.current = axiom;
    this.generation = 0;
    this.rules = [];

    // setup rules
    Object.keys(rulesObject).forEach((key) => {
      let input = key;
      let output = rulesObject[key];

      this.rules.push(new LRule(input, output));
    });

  }

  /**
  * getCurrent
  */
  getCurrent() {
    return this.current;
  }

  getSentence() {
    return this.getCurrent();
  }

  /**
  * getGeneration
  */
  getGeneration() {
    return this.generation;
  }

  /**
  * applies the rules the current generation
  */
  generate(iterations = 1) {
    for(let i = 0; i < iterations; i++ ) {
      let currentChars = this.current.split('');
      let next = [];

      // Step through current, applying lSystem rules
      currentChars.forEach((char) =>{
        next.push(this._getOutputForChar(char));
      });

      // join next array and replace current
      this.current = next.join(''); 

      // we're now on the next generation
      this.generation += 1;
    }
  }

  next(iterations) {
    return this.generate(iterations);
  }

  /**
  * looks up the appropriate rule for char
  * if no rule exists, return char
  *
  * @param {String} char
  * @return {String}
  */
  _getOutputForChar(char) {
    let len = this.rules.length;
    for (let i=0; i < len; i++) {
      let rule = this.rules[i];
      if (rule.matches(char)) {
        return rule.getOutput(char);
      }
    }
    return char;
  }

}