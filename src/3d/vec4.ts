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
  export class Vec4 extends Float64Array implements VecClonableDotted<Vec4>{
    constructor(){
      super(4);
    }
    add(vec: Vec4|ArrayLike<number>) {
      this[0] += vec[0];
      this[1] += vec[1];
      this[2] += vec[2];
      this[3] += vec[3];
    }
    subtract(vec: Vec4|ArrayLike<number>) {
      this[0] -= vec[0];
      this[1] -= vec[1];
      this[2] -= vec[2];
      this[3] -= vec[3];
    }
    mult(vec: Vec4 | ArrayLike<number>|number) {
      if(typeof vec === 'number'){
        this[0] *= vec;
        this[1] *= vec;
        this[2] *= vec;
        this[3] *= vec;  
      }else{
        this[0] *= vec[0];
        this[1] *= vec[1];
        this[2] *= vec[2];
        this[3] *= vec[3];  
      }
    }
    divide(vec:Vec4 | ArrayLike<number>|number){
      if(typeof vec === 'number'){
        this[0] /= vec;
        this[1] /= vec;
        this[2] /= vec;
        this[3] /= vec; 
      }else{
        this[0] /= vec[0];
        this[1] /= vec[1];
        this[2] /= vec[2];
        this[3] /= vec[3];   
      }
    }
    dot(vec: Vec4|ArrayLike<number>): number {
      return this[0] * vec[0] +
        this[1] * vec[1] +
        this[2] * vec[2] +
        this[3] * vec[3];
    }
    mag(): number {
      return Math.sqrt(this.magsqr());
    }
    magsqr(): number {
      return this.dot(this);
    }
    zeros(): void {
      this.fill(0);
    }
    ones(): void {
      this.fill(1);
    }
    normalize():void{
      var mag_inv: number = 1.0/this.mag();
      this.mult(mag_inv);
    }
    clone():Vec4{
      var v: Vec4 = new Vec4();
      v.set(this);
      return v;
    }
    toVec3(): Vec3 {
      var v: Vec3 = new Vec3();
      v.set(this);
      return v;
    }
  }
}