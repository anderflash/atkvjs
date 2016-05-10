/**
 ** This file is part of the atkv project.
 ** Copyright 2016 Anderson Tavares <nocturne.pe@gmail.com>.
 **
 ** This program is free software: you can redistribute it and/or modify
 ** it under the terms of the GNU General Public License as published by
 ** the Free Software Foundation, either version 3 of the License, or
 ** (at your option) any later version.
 **
 ** This program is distributed in the hope that it will be useful,
 ** but WITHOUT ANY WARRANTY; without even the implied warranty of
 ** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 ** GNU General Public License for more details.
 **
 ** You should have received a copy of the GNU General Public License
 ** along with this program.  If not, see <http://www.gnu.org/licenses/>.
 **/

/// <reference path="../../typings/main/ambient/jasmine/index.d.ts" />
/// <reference path="../../src/3d/mat4.ts" />
describe('Mat4 tests', () => {

  var customMatchers: jasmine.CustomMatcherFactories = {
    toEqualArray: function(util, customEqualityTesters) {
      return {
        compare: function(actual: ArrayLike<number>, expected: ArrayLike<number>) {
          var result = { pass: true, message: "Equal arrays" };
          for (let i: number = 0; i < actual.length; i++)
            if (actual[i] != expected[i]) {
              result.pass = false;
              result.message = "Expected " + actual[i] + " to be " + expected[i];
              break;
            }
          return result;
        }
      };
    },
    toAlmostEqualArray: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected, precision) {
          if (precision !== 0)
            precision = precision || 2;

          var result = { pass: true, message: "Equal arrays" };
          var value: number = (Math.pow(10, -precision) / 2);
          for (let i = 0; i < actual.length; i++)
            if (Math.abs(expect[i] - actual[i]) > value) {
              result.pass = false;
              result.message = "Expected " + actual[i] + " to be " + expected[i];
              break;
            }
          return result;
        }
      };
    }
  };
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  it("should create an mat",function(){
    var mat4: at.Mat4 = new at.Mat4();
    var eye: Array<number> = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    var translated: Array<number> = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 1, 1];
    var rotated: Array<number> = [0,0,-1,0, 0,1,0,0, -1,0,0,0, 0,0,0,1];
    mat4.eye();
    expect(mat4).toEqualArray(eye);
    mat4.translate([0, 2, 1]);
    expect(mat4).toEqualArray(translated);
    mat4.eye();
    mat4.rotate(90, [0, 1, 0]);
    expect(mat4).toAlmostEqualArray(rotated);
  });
  
});