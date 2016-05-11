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

/// <reference path="vec3.ts" />
/// <reference path="vec4.ts" />
module at{
  export class Mat4 extends Float64Array implements Vec, Clonable<Mat4>{
    constructor(){
      super(16);
    }
    translate(t: Vec3|ArrayLike<number>):void{
      this[12] += t[0];
      this[13] += t[1];
      this[14] += t[2];
    }
    rotate(angle:number, vec:Vec3|ArrayLike<number>):void{
      var r: Mat4 = new Mat4();
      var n: Vec3 = new Vec3();
      n.set(vec);
      n.normalize();
      
      // Some shortcuts
      var u2: number = n[0] * n[0];
      var v2: number = n[1] * n[1];
      var w2: number = n[2] * n[2];
      
      var u: number = n[0];
      var v: number = n[1];
      var w: number = n[2];
      var uv: number = u * v;
      var uw: number = u * w;
      var vw: number = v * w;

      var cosTheta: number = Math.cos(angle / 180.0 * Math.PI);
      var sinTheta: number = Math.sin(angle / 180.0 * Math.PI);
      var cosM: number = 1 - cosTheta;

      // Calculation of rotation matrix
      r[0] = cosTheta + u2 * cosM;
      r[1] = uv*cosM + w*sinTheta
      r[2] = uw * cosM - v * sinTheta;
      r[3] = 0;
      r[4] = uv * cosM - w * sinTheta;
      r[5] = cosTheta + v2 * cosM;
      r[6] = vw * cosM + u * sinTheta;
      r[7] = 0;
      r[8] = uw * cosM + v*sinTheta;
      r[9] = vw * cosM - u * sinTheta;
      r[10] = cosTheta + w2 *cosM;
      r[11] = 0;
      r[12] = 0;
      r[13] = 0;
      r[14] = 0;
      r[15] = 1;

      this.dot(r);
    }
    scale(s:Vec3 | number):void{
      if(typeof s === 'number'){
        this[0]  *= s;
        this[5]  *= s;
        this[10] *= s;
      }else{
        this[0]  *= s[0];
        this[5]  *= s[1];
        this[10] *= s[2];
      }
    }
    eye():void{
      this.fill(0);
      this[0] = this[5] = this[10] = this[15] = 1;
    }
    mult(mat: Mat4, to_new: boolean = false):Mat4 {
      var returnMat: Mat4 = this;
      if (to_new) returnMat = new Mat4;
      for (let i = 0; i < 16; i++)
        returnMat[i] = this[i] * mat[i];
      return returnMat;
    }
    dotVec<T extends VecClonableDotted<T>>(vec:T,to_new:boolean = false):T{
      let vec_mat: T = vec.clone();
      let vec_cpy: T = vec.clone();
      let mat_t: Mat4 = this.transpose();
      vec_cpy.set(vec);
      for (let i = 0; i < vec_mat.length; i++) {
        let i2: number = i << 2;
        vec_mat.set(mat_t.subarray(i2, i2 + vec_mat.length));
        vec_cpy[i] = vec_mat.dot(vec);
      }
      if (to_new) return vec_cpy;
      else vec.set(vec_cpy);
      return vec;
    }
    dot(mat:Mat4, output:Mat4 = null):Mat4{
      var rows   : Array<Vec4> = Array(4);
      var columns: Array<Vec4> = Array(4);

      var mat_t: Mat4 = this.transpose();
      var mat_r: Mat4 = new Mat4();

      // Getting rows and columns
      for (let i: number = 0; i < 4; i++){
        let i2: number = i << 2;
        rows[i] = new Vec4();
        rows[i].set(mat_t.subarray(i2, i2 + 4));
        columns[i] = new Vec4();
        columns[i].set(mat.subarray(i2, i2 + 4));
      }

      // Calculating the dot products
      let n: number = 0;
      for (let j: number = 0; j < 4; j++) {
        for (let i: number = 0; i < 4; i++,n++){
          mat_r[n] = rows[i].dot(columns[j]);
        }
      }
      if (output === null) {
        this.set(mat_r);
        return this;
      }else{
        output.set(mat_r);
        return output;
      }
    }
    transpose():Mat4{
      var mat_r: Mat4 = new Mat4();
      let n: number = 0;
      for (let j: number = 0; j < 4; j++) {
        for (let i: number = 0; i < 4; i++ , n++) {
          mat_r[n] = this[(i << 2) + j];
        }
      }
      return mat_r;
    }
    clone():Mat4{
      var m: Mat4 = new Mat4();
      m.set(this);
      return m;
    }
  }
}