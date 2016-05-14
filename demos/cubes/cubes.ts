/**
 ** This file is part of the atkvjs project.
 ** Copyright 2016 Anderson Tavares <acmt@outlook.com>.
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

/**
 * @file: @kv.js 3D API: A 2D Triangle Webgl demo
 * 
 * This code was created for the Introduction Computer Graphics course, 
 * in May 13th of 2016, at the Institute of Mathematics and Statistics,
 * of the University of Sao Paulo, Brazil.
 */

/// <reference path="../../src/core/animation.ts" />
/// <reference path="../../src/3d/scene.ts" />
/// <reference path="../../src/3d/renderer.ts" />
/// <reference path="../../src/3d/webglrenderer.ts" />
/// <reference path="../../src/3d/perspectivecamera.ts" />
/// <reference path="../../src/3d/camera3d.ts" />
/// <reference path="../../src/3d/mesh3d.ts" />
/// <reference path="../../src/3d/shaderprogram.ts" />

/**
 * This demo shows two texturized cubes, from a loaded one 
 */
namespace at.demos.cube{
  // Our elements
  var renderer: at.Renderer;
  var scene   : at.Scene;
  var camera  : at.Camera3D;
  var cube1   : at.Mesh3D; // Loaded cube
  var cube2   : at.Mesh3D; // Modification of the cube

  // Main function 
  export function initDemo(){
    renderer = new at.WebGLRenderer("at-canvas");
    scene    = new at.Scene();
    camera   = new at.PerspectiveCamera(45.0, renderer.aspect, 0.1, 100.0);

    var rendererPromise:Promise<at.ShaderProgram> = renderer.loadProgram("program1", "vert.glsl", "frag.glsl");
    var scenePromise:Promise<void> = at.loadOBJ("cube.obj").then(mesh => {
      cube1 = mesh;
      scene.push(cube1);

      cube2 = cube1.clone();
      cube2.material = at.materials.newTexture("Grass", "grass.jpg");
    });
    Promise.all([webglPromise, scenePromise]).then(startDrawing);
  }

  // Now start the drawing loop, with animation 
  function startDrawing() {
    // Allow animation
    at.requestAnimFrame(startDrawing);

    // Draw our demo and animate it
    renderer.render(scene, camera);
  }
}

// Call the main function when everything is loaded
document.addEventListener("DOMContentLoaded", function() {
  at.demos.cube.initDemo();
});