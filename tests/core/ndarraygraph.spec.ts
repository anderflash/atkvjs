/// <reference path="../../src/core/ndarraygraph.ts"/>
/// <reference path="../../src/core/ndarray.ts"/>
/// <reference path="ndarray.spec.ts"/>
/// <reference path="../../typings/main/ambient/jasmine/index.d.ts" />

import Neighboring  = at.Neighboring;
import NDArrayGraph = at.NDArrayGraph;

function equalsArray(){

}

describe('NDArrayGraph Tests', function(){
  it("should create a new arraygraph",function(){
    type tipo     = Int32Array;
    var tipo_ctor = Int32Array;
    var array: NDArray<tipo> = new NDArray(tipo_ctor, [2, 5]);
    var arraygraph:NDArrayGraph<tipo> = new NDArrayGraph(tipo_ctor, array); // defaults to Neighboring 4
    var edges_values: Array<number> = [
      0, 1, 0, 1,
      1, 1, 0, 1,
      1, 1, 0, 1,
      1, 1, 0, 1,
      1, 0, 0, 1,

      0, 1, 1, 0,
      1, 1, 1, 0,
      1, 1, 1, 0,
      1, 1, 1, 0,
      1, 0, 1, 0];
    var neighbors_values: Array<number> = [
      -1,  1,-5,  5,
       0,  2,-4,  6,
       1,  3,-3,  7,
       2,  4,-2,  8,
       3,  5,-1,  9,

       4,  6, 0, 10,
       5,  7, 1, 11,
       6,  8, 2, 12,
       7,  9, 3, 13,
       8, 10, 4, 14
    ];

    expect(arraygraph.num_neighbors).toBe(4);
    expect(arraygraph.array).toBe(array);
    expect(arraygraph.neighbors.size).toEqual([2, 5, 4]);
    expect(arraygraph.edges.size).toEqual([2, 5, 4]);
    expect(arraygraph.edges.equals(edges_values)).toBeTruthy();
    expect(arraygraph.neighbors.equals(neighbors_values)).toBeTruthy();
  });
  it("should navigate clearly", function() {
    type tipo = Int32Array;
    var tipo_ctor = Int32Array;
    var array: NDArray<tipo> = new NDArray(tipo_ctor, [2, 5]);
    var arraygraph: NDArrayGraph<tipo> = new NDArrayGraph(tipo_ctor, array);
    var i: number = 0;
    var neighbors_of_3: Array<number> = [2, 4, 8];
    expect(arraygraph.neighbors_of(3)).toEqual(neighbors_of_3);
    expect(arraygraph.are_neighbors(3, 5)).toBeFalsy();
  });
  it("should remove arcs", function(){
    type tipo = Int32Array;
    var tipo_ctor = Int32Array;
    var array: NDArray<tipo> = new NDArray(tipo_ctor, [2, 5]);
    var arraygraph: NDArrayGraph<tipo> = new NDArrayGraph(tipo_ctor, array);
    arraygraph.remove_edge(3, 4);
    expect(arraygraph.neighbors_of(3)).toEqual([2,8]);
    arraygraph.remove_arc(3, 8);
    expect(arraygraph.neighbors_of(3)).toEqual([2]);
    expect(arraygraph.are_neighbors(8, 3)).toBeTruthy();
  });
  it("should add arcs", function(){
    type tipo = Int32Array;
    var tipo_ctor = Int32Array;
    var array: NDArray<tipo> = new NDArray(tipo_ctor, [2, 5]);
    var arraygraph: NDArrayGraph<tipo> = new NDArrayGraph(tipo_ctor, array);
    arraygraph.remove_edge(3, 4);
    arraygraph.add_edge(3, 4);
    expect(arraygraph.neighbors_of(3)).toEqual([2, 4, 8]);
    arraygraph.remove_arc(3, 8);
    arraygraph.add_arc(3, 8);
    expect(arraygraph.neighbors_of(3)).toEqual([2, 4, 8]);
  });
});