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
    constructor(buffer:ArrayBuffer = null, offset:number=null){
      if (buffer === null)
        super(4);
      else
        super(buffer, offset, 4);
    }
    add(vec:Vec3|ArrayLike<number>|number, out:Vec3 = null):void{
      var vec_add: Vec3;
      if (out === null) vec_add = this;
      else vec_add = out;
      if(typeof vec === 'number'){
        vec_add[0] = this[0] + vec;
        vec_add[1] = this[1] + vec;
        vec_add[2] = this[2] + vec;  
      }else{
        vec_add[0] = this[0] + vec[0];
        vec_add[1] = this[1] + vec[1];
        vec_add[2] = this[2] + vec[2];
      }
    }
    subtract(vec:Vec3|ArrayLike<number>|number, out:Vec3 = null):void{
      var vec_sub: Vec3;
      if (out === null) vec_sub = this;
      else vec_sub = out;
      if(typeof vec === 'number'){
        vec_sub[0] = this[0] - vec;
        vec_sub[1] = this[1] - vec;
        vec_sub[2] = this[2] - vec;
      }else{
        vec_sub[0] = this[0] - vec[0];
        vec_sub[1] = this[1] - vec[1];
        vec_sub[2] = this[2] - vec[2];
      }
    }
    dot(vec: Vec3 | ArrayLike<number>): number {
      return this[0] * vec[0] +
             this[1] * vec[1] +
             this[2] * vec[2];
    }
    mult(vec: Vec3 | ArrayLike<number> | number, out:Vec3 = null):void {
      var vec_mult: Vec3;
      if (out === null) vec_mult = this;
      else vec_mult = out;

      if (typeof vec === 'number') {
        vec_mult[0] = this[0] * vec;
        vec_mult[1] = this[1] * vec;
        vec_mult[2] = this[2] * vec;
      } else {
        vec_mult[0] = this[0] * vec[0];
        vec_mult[1] = this[1] * vec[1];
        vec_mult[2] = this[2] * vec[2];
      }
      
    }
    divide(vec: Vec3 | ArrayLike<number> | number, out:Vec3 = null):void {
      if (typeof vec === 'number') {
        this.mult(1.0/vec, out);
      }else{
        var vec_mult: Vec3;
        if (out === null) vec_mult = this;
        else vec_mult = out;
        vec_mult[0] = this[0] / vec[0];
        vec_mult[1] = this[1] / vec[1];
        vec_mult[2] = this[2] / vec[2];
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
    normalize(out:Vec3 = null): void {
      var mag_inv: number = 1.0 / this.mag();
      this.mult(mag_inv,out);
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

  // Creating a temporary buffer for vec3 (for reuse)
  var vec3_buffer: ArrayBuffer = new ArrayBuffer(10 << 2);
  var vec3_tmp: Array<Vec3> = Array(10);
  for (let i = 0; i < 10; i++) {
    vec3_tmp[i] = new Vec3(vec3_buffer, i << 2);
  }
}