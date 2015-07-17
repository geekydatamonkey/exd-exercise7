/**
* Snowflake
*/

'use strict';

import _ from 'lodash';
import LSystem from './LSystem';
import Turtle from './Turtle';

const π = Math.PI;

export default class LShape {

  /**
  * constructor
  */
  constructor(config) {
    let defaults = {
      leftAngle: π/3,
      rightAngle: π/3,
      axiom: 'F--F--F',
      color: [0],
      colorChangeRate: 1/20,
      generations: 3,
      length: 200,
      rotation: 0,
      // root is at origin
      // turtle begins pointing up
      root: { x: 0, y: 0},
      rules: {
        'F': 'F+F--F+F'
      },
      sketch: null,
      strokeWeight: 1,
      scaleFactor: 0.5,
      time: 0,
    };

    config = _.assign({}, defaults, config);

    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });

    // setup lsys
    this.lsys = new LSystem(this.axiom, this.rules);
    this.lsys.generate(this.generations);
    console.log(this.lsys.getCurrent());

    // setup turtle
    this.turtle = new Turtle({
      instructions: this.lsys.getCurrent(),
      color: this.color,
      colorChangeRate: this.colorChangeRate,
      length: this.length * Math.pow(this.scaleFactor, this.generations),
      //length: this.length,
      sketch: this.sketch,
      strokeWeight: this.strokeWeight,
      leftTurnAngle: this.leftAngle,
      rightTurnAngle: this.rightAngle,
    });

  }

  update() {
    //this.root.y = (this.root.y + 1)  % this.sketch.height;
    this.rotation += 0.01;
    //this.root.x = (this.root.x + getRandomInt(-1,1)) % this.sketch.width;
    return this;
  }

  render() {
    let s = this.sketch;

    // change axes to have origin at center
    s.push();
    s.stroke(200);

    s.translate(this.root.x, this.root.y);
    s.rotate(this.rotation);

    this.turtle.render();
    this.time += 1;
    s.pop();
  }

}