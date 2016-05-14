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

/// <reference path="mat4.ts" />

module at{
  export class Camera3D{
    viewMatrix: Mat4;
    projectionMatrix: Mat4;

    right  : Vec3;
    up     : Vec3;
    forward: Vec3;
    origin: Vec3;

    reset_view():void{
      this.viewMatrix.eye();
      this.right.set([1, 0, 0]);
      this.up.set([0, 1, 0]);
      this.forward.set([0, 0, -1]);
      this.origin.fill(0);
    }
    moveForward(units:number):void{
      this.forward.mult(units,at.vec3_tmp[0]);
      this.origin.add(at.vec3_tmp[0]);
    }
    moveBackwards(units: number): void {
      this.moveForward(-units);
    }
    moveLeft(units: number): void {
      this.moveRight(-units);
    }
    moveRight(units: number): void {
      this.right.mult(units, at.vec3_tmp[0]);
      this.origin.add(at.vec3_tmp[0]);
    }
    moveUp(units: number): void {
      this.up.mult(units, at.vec3_tmp[0]);
    }
    moveDown(units: number): void {

    }
    yaw(units: number): void {

    }
    roll(units:number):void{

    }
    pitch(units:number):void{

    }
    updateViewMatrix(){

    }

    
    

  }
}