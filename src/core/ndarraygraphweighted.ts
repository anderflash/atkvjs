/// <reference path="ndarraygraph.ts" />
module at{
  export class NDArrayGraphWeighted<T extends TypedArray<T>> extends NDArrayGraph<T>{
    weights: NDArray<Float32Array>;
  }
}