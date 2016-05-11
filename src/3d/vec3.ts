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

/// <reference path="vec.ts" />
module at{
  export class Vec3 extends Float64Array implements VecClonableDotted<Vec3>{
    constructor(){
      super(3);
    }
    add(vec:Vec3){
      this[0] += vec[0];
      this[1] += vec[1];
      this[2] += vec[2];
    }
    subtract(vec:Vec3){
      this[0] -= vec[0];
      this[1] -= vec[1];
      this[2] -= vec[2];
    }
    dot(vec: Vec3 | ArrayLike<number>): number {
      return this[0] * vec[0] +
             this[1] * vec[1] +
             this[2] * vec[2];
    }
    mult(vec: Vec3 | ArrayLike<number> | number) {
      if (typeof vec === 'number') {
        this[0] *= vec;
        this[1] *= vec;
        this[2] *= vec;
      } else {
        this[0] *= vec[0];
        this[1] *= vec[1];
        this[2] *= vec[2];
      }
    }
    divide(vec: Vec3 | ArrayLike<number> | number) {
      if (typeof vec === 'number') {
        this[0] /= vec;
        this[1] /= vec;
        this[2] /= vec;
      } else {
        this[0] /= vec[0];
        this[1] /= vec[1];
        this[2] /= vec[2];
      }
    }
    mag():number{
      return Math.sqrt(this.magsqr());
    }
    magsqr():number{
      return this.dot(this);
    }
    zeros():void{
      this.fill(0);
    }
    ones():void{
      this.fill(1);
    }
    normalize(): void {
      var mag_inv: number = 1.0 / this.mag();
      this.mult(mag_inv);
    }
    clone():Vec3{
      var v: Vec3 = new Vec3();
      v.set(this);
      return v;
    }
    toVec4(w:number = 1):Vec4{
      var v: Vec4 = new Vec4();
      v.set(this);
      v[3] = w;
      return v;
    }
  }
}