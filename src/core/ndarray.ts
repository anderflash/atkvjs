/// <reference path="typedarray.ts"/>

module at {
  /**
   * @brief      Class for multidimensional arrays
   */
  export class NDArray {
    dim: number;
    size: Array<number>;
    step: Array<number>;
    data: ArrayBuffer;
    dtype: TypedArray;
    num_elements: number;
    elemsize: number;
    offset: number;
    is_data_owner: boolean;
    constructor(data_array: ArrayLike<number> | Iterable<number> | ArrayBuffer,
      data_size: Array<number>,
      dtype: any = null, default_value: any = null) {
      this.dim = data_size.length;
      this.size = data_size;
      this.step = Array<number>(this.dim);
      this.step[this.dim - 1] = 1;
      for (let i = 1; i < this.dim; i++)
        this.step[this.dim - i - 1] = this.step[this.dim - i] *
          this.size[this.dim - i];
      this.num_elements = this.step[0] * this.size[0];
      if (dtype === null) {
        dtype = Int32Array;
        this.elemsize = 4;
      }

      // Get data
      if (data_array !== null) {
        if (data_array instanceof ArrayBuffer) {
          this.data = data_array;
          this.is_data_owner = false;
        } else {
          this.dtype = new dtype(data_array);
          this.data = this.dtype.buffer;
          this.is_data_owner = true;
        }
      } else {
        this.data = new ArrayBuffer(this.elemsize * this.num_elements);
        this.is_data_owner = true;
      }
      this.dtype = new dtype(this.data);

      if (dtype === undefined) {
        this.dtype = new Uint32Array(this.data);
      }
      if (default_value !== null) {
        this.fill(default_value);
      }
      this.offset = 0;
    }
    indices(index) {

    }
    index(indices) {
      let index: number = 0;
      for (let i = 0; i < indices.length; i++) {
        index += this.step[i] * indices[i];
      }
      return index;
    }
    get(...items): number {
      if (items.length == 1) return this.dtype[items[0]];
      return this.dtype[this.index(items)];
    }
    set(indices: Array<number>, value: number) {
      if (indices.length == 1) this.dtype[indices[0]] = value;
      this.dtype[this.index(indices)] = value;
    }
    fill(value: number) {
      this.dtype.fill(value);
    }
    /**
     * @brief      Get indices
     *
     * @param      ranges  The ranges
     *
     * @return     { description_of_the_return_value }
     */
    slice(...ranges:Array<Array<number>>){
      var size: Array<number> = Array(ranges.length);
      for (let i = 0; i < this.size.length; i++){
        if(i > ranges.length){
          size[i] = this.size[i];
        }
        else{
          if(ranges[i].length;
        }
      }
      var subarray: NDArray = new NDArray(this.data, this.size, this.dtype);

      return subarray;
    }
  }

  export function zeros(size: Array<number>, dtype: any = null) {
    return new NDArray(null, size, dtype, 0);
  }
  export function ones(size: Array<number>, dtype: any = null) {
    return new NDArray(null, size, dtype, 1);
  }
  export function eye(size: number, dtype: any = null) {
    var array: NDArray = zeros([size, size], dtype);
    for (let i = 0; i < size; i++) {
      array.set([i, i], 1);
    }
    return array;
  }
}