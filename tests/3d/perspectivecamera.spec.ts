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
/// <reference path="../../src/3d/perspectivecamera.ts" />
declare module jasmine{
  interface Matchers {
    toEqualArray(array: ArrayLike<number>): void;
    toAlmostEqualArray(array: ArrayLike<number>): void;
  }
}
describe("Perspective Camera tests", function{

  var customMatchers: jasmine.CustomMatcherFactories = {
    toEqualArray: function(util: jasmine.MatchersUtil,
      customEqualityTesters: Array<jasmine.CustomEqualityTester>)
      : jasmine.CustomMatcher {
      return {
        compare: function(actual: ArrayLike<number>, expected: ArrayLike<number>): jasmine.CustomMatcherResult {
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
          expected: ArrayLike<number>, precision: number = 2)
          : jasmine.CustomMatcherResult {
          if (precision !== 0) precision = precision || 2;
          var result: jasmine.CustomMatcherResult = { pass: true, message: "Equal arrays" };
          var value: number = (Math.pow(10, -precision) / 2);
          for (let i: number = 0; i < actual.length; i++)
            if (Math.abs(actual[i] - expected[i]) > value) {
              result.pass = false;
              result.message = "(index " + i + ") Expected " + actual[i] + " to be " + expected[i];
              break;
            }
          return result;
        }
      };
    }
  };

  var camera: at.PerspectiveCamera;
  beforeEach(function(){
    camera = new at.PerspectiveCamera();
    jasmine.addMatchers(customMatchers);
  });
  it("should reset the view properly", function(){
    camera.resetView();
    expect(camera.origin).toEqual([0, 0, 0]);
    expect(camera.right).toEqual([1, 0, 0]);
    expect(camera.up).toEqual([0, 1, 0]);
    expect(camera.forward).toEqual([0,0,-1]);
    expect(camera.viewmatrix).toArrayEqual();
  });
  it("should move the camera forward", function(){
    camera.resetView();
    camera.moveForward(3);
    expect(camera.origin).toEqualArray([0, 0, -3]);
  });
  it("should move the camera backwards", function(){
    camera.resetView();
    camera.moveBackwards(4);
    expect(camera.origin).toEqualArray([0, 0, 4]);
  });
  it("should move the camera left", function() {
    camera.resetView();
    camera.moveLeft(4);
    expect(camera.origin).toEqualArray([-4, 0, 0]);
  });
  it("should move the camera right", function(){
    camera.resetView();
    camera.moveRight(4);
    expect(camera.origin).toEqualArray([4, 0, 0]);
  });
  it("should move the camera up", function(){
    camera.resetView();
    camera.moveUp(4);
    expect(camera.origin).toEqualArray([0, 4, 0]);
  });
  it("should move the camera down", function(){
    camera.resetView();
    camera.moveDown(4);
    expect(camera.origin).toEqualArray([0, -4, 0]);
  });
  it("should combine camera movements", function(){
    camera.resetView();
    camera.moveForward(4);
    camera.moveLeft(5);
    camera.moveDown(6);
    expect(camera.origin).toEqualArray([-5, -6, -4]);
  });
  it("should yaw the camera", function(){
    camera.resetView();
    camera.yaw(90);
    expect(camera.right).toAlmostEqualArray([0,0,-1]);
  });
  it("should pitch the camera", function(){
    camera.resetView();
    camera.pitch(90);
    expect(camera.right).toAlmostEqualArray([]);
  });
  it("should roll the camera", function(){

  });
  it("should combine rotations", function(){

  });
  it("should make the camera look at a point", function(){

  });
  it("should make the camera update the viewmatrix", function(){

  });
  it("should make the perspective camera update the projectionmatrix", function(){

  });
});