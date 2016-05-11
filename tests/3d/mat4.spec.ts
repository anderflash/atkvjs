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
 
declare module jasmine{
  interface Matchers {
    toEqualArray(array:ArrayLike<number>): void;
    toAlmostEqualArray(array: ArrayLike<number>): void;
  }
}
describe('Mat4 tests', () => {
  var customMatchers: jasmine.CustomMatcherFactories = {
    toEqualArray: function(util: jasmine.MatchersUtil, 
                           customEqualityTesters: Array<jasmine.CustomEqualityTester>)
                  : jasmine.CustomMatcher {
      return {
        compare: function(actual: ArrayLike<number>, expected: ArrayLike<number>):jasmine.CustomMatcherResult {
          var result: jasmine.CustomMatcherResult = { pass: true, message: "Equal arrays" };
          for (let i: number = 0; i < actual.length; i++)
            if (actual[i] != expected[i]) {
              result.pass = false;
              result.message = "(index " + i + ") Expected " + actual[i] + " to be " + expected[i];
              break;
            }
          return result;
        }
      };
    },
    toAlmostEqualArray: function(util: jasmine.MatchersUtil,
                                 customEqualityTesters: Array<jasmine.CustomEqualityTester>)
                        : jasmine.CustomMatcher {
      return {
        compare: function(actual: ArrayLike<number>, 
                          expected: ArrayLike<number>,precision:number = 2)
                 : jasmine.CustomMatcherResult 
        {
          if (precision !== 0) precision = precision || 2;
          var result:jasmine.CustomMatcherResult = { pass: true, message: "Equal arrays" };
          var value: number = (Math.pow(10, -precision) / 2);
          for (let i: number = 0; i < actual.length; i++)
            if (Math.abs(actual[i] - expected[i]) > value) {
              result.pass = false;
              result.message = "(index " + i + ") Expected " + actual[i] + " to be " + expected[i] ;
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
  var mat4: at.Mat4 = new at.Mat4();

  it("should create an identity mat",function(){
    var eye       : Array<number> = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    mat4.eye();
    expect(mat4).toEqualArray(eye);
  });
  it("should translate a matrix", function(){
    var translated: Array<number> = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 1, 1];
    mat4.translate([0, 2, 1]);
    expect(mat4).toEqualArray(translated);
  });
  it("should rotate a matrix", function() {
    var rotated: Array<number> = [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1];
    mat4.eye();
    mat4.rotate(90, [0, 1, 0]);
    expect(mat4).toAlmostEqualArray(rotated);

  });
  it("should scale a matrix", function() {
    var scaled: Array<number> = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1];
    mat4.eye();
    mat4.scale(2);
    expect(mat4).toEqualArray(scaled);
  });
  it("should multiply it with a vector", function() {
    var vec: at.Vec4 = new at.Vec4();
    vec.set([1, 2, 3, 1]);
    mat4.dotVec(vec);
    expect(vec).toEqualArray([2, 4, 6, 1]);
  });
  it("should multiply it with another matrix", function(){
    var mat: at.Mat4 = new at.Mat4();
    mat.eye();
    mat4.dot(mat);
    var expect_values: Array<number> = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1];
    expect(mat4).toEqualArray(expect_values);
  });
});