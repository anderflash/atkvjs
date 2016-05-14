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

/// <reference path="renderer.ts" />
/// <reference path="scene.ts" />
/// <reference path="camera3d.ts" />
/// <reference path="shader.ts" />
/// <reference path="shaderprogram.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference path="../../typings/main/ambient/whatwg-fetch/index.d.ts" />
module at{
  export class WebGLRenderer implements Renderer{
    canvas: HTMLCanvasElement;
    ctx: WebGLRenderingContext;
    constructor(canvasid:string){
      this.canvas = <HTMLCanvasElement>document.getElementById(canvasid);
      this.ctx    = this.canvas.getContext("experimental-webgl");
    }

    render(scene: Scene, camera: Camera3D) {

    }
    get aspect():number{
      return this.canvas.clientWidth / this.canvas.clientHeight;
    }
    loadProgram(programName:string, 
                vertexFilename:string, 
                fragFilename:string)
               :Promise<ShaderProgram>{
      var vertexPromise: Promise<ShaderWebGL> = this.loadShader(this.ctx.VERTEX_SHADER, vertexFilename);
      var fragPromise  : Promise<ShaderWebGL> = this.loadShader(this.ctx.FRAGMENT_SHADER, fragFilename);
      return Promise.all([vertexPromise, fragPromise]).then(shaders => {
        var program: ShaderProgramWebGL = new ShaderProgramWebGL(programName, shaders[0], shaders[1]);
        this.compileProgram(program);
        return program;
      });
    }
    loadShader(shaderType:number, shaderFilename:string):Promise<ShaderWebGL>{
      return fetch(shaderFilename).then(function(shaderSrc:Response):PromiseLike<ShaderWebGL>|PromiseLike<string>{
        var shaderID: WebGLShader = this.ctx.createShader(shaderType);
        this.ctx.shaderSource(shaderID, shaderSrc.text());
        this.ctx.compileShader(shaderID);
        if (!this.ctx.getShaderParameter(shaderID, this.ctx.COMPILE_STATUS)){
          var message: string = this.ctx.getShaderInfoLog(shaderID);
          return Promise.reject<string>(message);
        }
        return Promise.resolve(new ShaderWebGL(shaderFilename, shaderID));
      }.bind(this));
    }
    compileProgram(program:ShaderProgramWebGL):void{
      var programWebGL: ShaderProgramWebGL = <ShaderProgramWebGL>program;
      program.id = this.ctx.createProgram();
      var vertexShaderWebGL: ShaderWebGL = <ShaderWebGL>program.vertexShader;
      this.ctx.attachShader(program.id, vertexShaderWebGL.id);
    }
  }
}