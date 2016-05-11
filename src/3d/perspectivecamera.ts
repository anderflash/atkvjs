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

/// <reference path="../core/math.ts" />

module at{
  export class PerspectiveCamera extends Camera3D{
    fov: number;
    aspect: number;
    zoom: number;
    near: number;
    far: number;
    constructor(fov: number, aspect: number, near: number, far: number) {
      super();
      this.set(fov, aspect, near, far);
    }
    getEffectiveFOV():number{
      return at.radToDeg(2 * Math.atan(Math.tan(at.degToRad(this.fov) * 0.5) / this.zoom));
    }
    set(fov:number, aspect:number, near:number, far:number){
      this.fov    = fov;
      this.aspect = aspect;
      this.near   = near;
      this.far    = far;
      this.updateProjectionMatrix();
    }
    updateProjectionMatrix(){
      var new_fov = this.getEffectiveFOV();
      var ymax = this.near * Math.tan(degToRad(new_fov * 0.5));
      var ymin = - ymax;
      var xmin = ymin * this.aspect;
      var xmax = ymax * this.aspect;
      return this.frustrum(xmin, xmax, ymin, ymax, near, far);
    }
    frustrum(left:number, right:number, bottom:number, top:number, near:number, far:number) {
      var te = this.projectionMatrix;
      var x = 2 * near / (right - left);
      var y = 2 * near / (top - bottom);

      var a = (right + left) / (right - left);
      var b = (top + bottom) / (top - bottom);
      var c = - (far + near) / (far - near);
      var d = - 2 * far * near / (far - near);

      te[0] = x; te[4] = 0; te[8] = a; te[12] = 0;
      te[1] = 0; te[5] = y; te[9] = b; te[13] = 0;
      te[2] = 0; te[6] = 0; te[10] = c; te[14] = d;
      te[3] = 0; te[7] = 0; te[11] = - 1; te[15] = 0;
      return te;
    }
  }
}