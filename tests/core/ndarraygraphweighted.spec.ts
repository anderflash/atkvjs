/// <reference path="../../typings/main/ambient/jasmine/index.d.ts" />
/// <reference path="../../src/core/ndarraygraphweighted.ts" />
/// <reference path="../../src/core/ndarray.ts" />
describe("Weighted NDArrayGraph tests", function() {
  it("should create an empty weighted graph array", function() {
    type tipo = Int32Array;
    var tipo_ctor = Int32Array;
    var array: at.NDArray<tipo> = new at.NDArray(tipo_ctor, [3, 4], null);
    var grapharray: at.NDArrayGraphWeighted<tipo> = new at.NDArrayGraphWeighted(tipo_ctor, array);
    expect(grapharray.num_neighbors).toBe(4);
    expect(grapharray.neighbors.size).toEqual([3, 4, 4]);
    expect(grapharray.edges.size).toEqual([3, 4, 4]);
    expect(grapharray.weights.size).toEqual([3, 4, 4]);
  });
});