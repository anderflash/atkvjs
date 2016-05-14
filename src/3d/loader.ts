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
/// <reference path="mesh3d.ts" />
/// <reference path="container3d.ts" />
/// <reference path="../../typings/main/ambient/whatwg-fetch/index.d.ts" />
module at{
  export function loadMesh(filename:string){
    var filenameParts:string[] = filename.split(".");
    var extension: string = filenameParts[filenameParts.length - 1];
    switch(extension){
      case "obj": loadOBJ(filename); break;
    }
  }
  export function loadOBJ(filename:string):Promise<Container3D>{
    var filenameParts = filename.split("/");

    var base_path: string = filenameParts.slice(0, -1).join('/');
    var name: string = filenameParts[filenameParts.length - 1];
    return fetch(filename).then(function(data){
      return parseOBJ(name, data, base_path);
    });
  }
  export function parseOBJ(name:string, data:string, base_path:string):Container3D{
    var container = new Container3D(name);
    return container;
  }
}