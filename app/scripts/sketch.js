/* jshint newcap: false */

'use strict';

import $ from 'jquery';
import _ from 'lodash';
import p5 from 'p5';
import Shape from './LShape';
import getRandomInt from './getRandomInt';

const π = Math.PI;

let config = { 
  parent: '.canvas-wrapper',
};

let $canvasWrapper = $(config.parent);
let shapes = [];
let t = 0;

function sketch(s) {

  s.setup = function() {

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    setupShapes();

  };

  s.draw = function() {
    s.clear();

    _.forEach(shapes, (shape) => {
      shape.update().render();
    });

    t += 1;
  };

  function setupShapes() {
    // begin with regular polygon
    let sides = getRandomInt(3,12);
    let axiom = 'F' + '-F'.repeat(sides);

    // possible rules
    let letters = ['F','-','+'];
    let fRuleArray = ['F'];

    //let ruleLength = getRandomInt(1,10);
    let ruleLength = 4;
    for (let i=0; i < ruleLength; i++) {
      let randomLetterIndex = getRandomInt(0, letters.length);
      fRuleArray.push(letters[randomLetterIndex]);
    }

    let conf = {
      axiom: axiom,
      sketch: s,
      root: {x: s.width/2, y: s.height/2 },
      generations: 6,
      scaleFactor: 3/4,
      leftAngle: 2*π/sides,
      rightAngle: 2*π/getRandomInt(1,12),
      rules: {
        'F' : fRuleArray.join(''),
      }
    };

    shapes.push(new Shape(conf));
  }

  s.mousePressed = s.keyPressed = function() {
    shapes = [];
    setupShapes();
  };

  s.windowResized = function() {
    s.resizeCanvas( $canvasWrapper.innerWidth(), $canvasWrapper.innerHeight() );
    s.setup();
  };

}

function init() {
  return new p5(sketch);
}

module.exports = { init };