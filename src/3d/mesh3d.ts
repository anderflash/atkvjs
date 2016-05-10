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

/// <reference path="object3d.ts" />
/// <reference path="geometry3d.ts" />
/// <reference path="material.ts" />
 
module at{
  export class Mesh3D implements Object3D{
    name: string;
    geometry: Geometry3D;
    material: Material;
    constructor(geometry?:Geometry3D,
                material?:Material3D
    ){
      this.geometry = geometry;
      this.material = material;
    }
  }
}