/// <reference path="../core/typedarray.ts"/>
/// <reference path="../core/ndarray.ts"/>

module at{
  export enum Optimization{
    MAXIMIZATION,
    MINIMIZATION
  };

  export function fmin(){

  }
  export function fmax() {

  }
  export function fsum() {

  }
  export function feuc() {

  }

  export class IFT<T extends TypedArray<T>>{
    connectivities:NDArray<Float64Array>;
    roots         :NDArray<Int32Array>;
    predecessors  :NDArray<Int32Array>;
    labels        :NDArray<Uint16Array>;

    constructor(private ctor:TypedArrayConstructor<TypedArray<T>>){
      this.connectivities = null;
      this.roots          = null;
      this.predecessors   = null;
      this.labels         = null;
    }
    applyIFT(array:NDArray<T>, optimization:Optimization, weight:Function, connectivity:Function, seeds:NDArray<Int32Array>):void{

    }
  }
}