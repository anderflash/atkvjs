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
/// <reference path="../../src/3d/vec4.ts" />


describe("Vec4 tests", function() {

  var customMatchers:jasmine.CustomMatcherFactories = {
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
    }
  };
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });


  it("should create a zero vector", function() {
    var vec: at.Vec4 = new at.Vec4();
    
    var zeros: Array<number> = [0, 0, 0, 0];
    var ones: Array<number> = [1,1,1,1];

    vec.zeros();
    expect(vec).toEqualArray(zeros);
    vec.ones();
    expect(vec).toEqualArray(ones);
    vec.add([1, 2, 3, 4]);
    expect(vec).toEqualArray([2, 3, 4, 5]);
    expect(vec.dot(ones)).toBe(14);
    expect(vec.magsqr()).toBe(54);
    expect(vec.mag()).toBe(Math.sqrt(54));
  });
  
});