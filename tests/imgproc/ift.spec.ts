/// <reference path="../../src/core/ndarraygraph.ts"/>
/// <reference path="../../src/core/ndarray.ts"/>
/// <reference path="../../src/imgproc/ift.ts"/>
/// <reference path="../../typings/main/ambient/jasmine/index.d.ts" />

import IFT = at.IFT;
import Optimization = at.Optimization;
import f_max = at.f_max;
import w_diff_abs = at.w_diff_abs;
import seeds_from_data = at.seeds_from_data;

describe("IFT Tests", function(){
  

  it("Should create a correct IFT", function(){
    var ift:IFT<Int32Array> = new IFT(Int32Array);
    expect(ift).not.toBeNull();
    expect(ift.connectivities).toBeNull();
    expect(ift.roots).toBeNull();
    expect(ift.labels).toBeNull();
    expect(ift.predecessors).toBeNull();
  });

  it("Should apply a primal ift w/ fmax", function(){
    var ift: IFT<Uint8Array> = new IFT(Uint8Array);
    var array_data: Array<number> = [
        0,  0,  0,  0,
        0,  0,  0,255,
        0,255,255,255,
      255,255,255,255
    ];
    var seeds_data: Array<number> = [0,0,15,1];
    var array: NDArray<Uint8Array> = new NDArray(Uint8Array, array_data, [4, 4]);
    ift.apply(
      array,
      Neighboring.NEIGHBOR_4,
      Optimization.MINIMIZATION,
      w_diff_abs,
      f_max,
      seeds_from_data(seeds_data)
    );

    var connectivities: Array<number> = [-Infinity,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-Infinity];
    var predecessors  : Array<number> = [0, 0, 1, 2, 0, 1, 2, 11, 4, 13, 14, 15, 13, 14, 15, 15];
    var labels        : Array<number> = [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1];
    var roots         : Array<number> = [0, 0, 0, 0, 0, 0, 0, 15, 0, 15, 15, 15, 15, 15, 15, 15];

    expect(ift.connectivities.equals(connectivities)).toBeTruthy();
    expect(ift.predecessors.equals(predecessors)).toBeTruthy();
    expect(ift.labels.equals(labels)).toBeTruthy();
    expect(ift.roots.equals(roots)).toBeTruthy();
  });

  it("Should apply a dual ift w/ fmin", function(){

  });

  it("Should apply a primal ift w/ fsum", function(){

  });
});