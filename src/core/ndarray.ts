/// <reference path="typedarray.ts"/>

module at {
  /**
   * @brief      Class for multidimensional arrays
   */
  export class NDArray<T extends TypedArray<T>> {
    // -----------------------
    // Properties
    // -----------------------
     
    /**
     * Number of dimensions
     */
    dim          : number;            
    /**
     * Size of each dimension
     */
    size         : Array<number>;
    /**
     * How many elements we jump in array for each dimension
     */
    step         : Array<number>;     
    /**
     * The number of elements
     */
    num_elements : number;
    /**
     * If it's a subarray, offset is the difference between the start of subarray 
     * and the start of the parent array
     */
    offset       : number;
    /**
     * The data buffer of the array (to access the elements we 
     * need to use typed_data instead of data)
     */
    buffer       : ArrayBuffer;
    /**
     * The data view of the buffer
     */
    data         : TypedArray<T>;
    /**
     * Superarray of this array
     */
    parent       : NDArray<T>;
    
    /**
     * @brief      Class for a multidimensional arrays 
     *
     * @param      data_array     The data array
     * @param      data_size      The data size
     * @param      dtype          The dtype
     * @param      default_value  The default value
     */
    constructor(
      private ctor: TypedArrayConstructor<TypedArray<T>>,
      data_size    : Array<number>,
      bufferOrArray: ArrayLike<number> | ArrayBuffer = null,
      default_value: any = null)
    {
      // Getting the dimension
      this.dim  = data_size.length;

      // The size for each dimension
      this.size = data_size;

      // The step
      this.step = Array<number>(this.dim);
      this.step[this.dim - 1] = 1;
      for (let i = 1; i < this.dim; i++)
        this.step[this.dim - i - 1] = this.step[this.dim - i] *
                                      this.size[this.dim - i];

      // The number of elements
      this.num_elements = this.step[0] * this.size[0];

      // Offset
      this.offset = 0;

      // Parent array
      this.parent = null;

      // Get data
      if(bufferOrArray === null)
        bufferOrArray = new ArrayBuffer(this.ctor.BYTES_PER_ELEMENT * this.num_elements);
      if(bufferOrArray instanceof ArrayBuffer)
        this.data = new this.ctor(bufferOrArray);
      else
        this.data = new this.ctor(bufferOrArray);
      this.buffer = this.data.buffer;

      // Filling with default value if set
      if (default_value !== null) {
        this.fill(default_value);
      }
    }

    indices(index, items:Array<number> = null):Array<number> {
      if(items === null)
        items = Array(this.size.length);
      for (let i: number = 0; i < this.size.length; i++){
        items[i] = Math.floor(index / this.step[i]);
        index %= this.step[i];
      }
      return items;
    }
    index(indices):number {
      let index: number = 0;
      for (let i = 0; i < indices.length; i++) {
        index += this.step[i] * indices[i];
      }
      return index;
    }
    get(...items): number {
      if (items.length == 1) return this.data[items[0]];
      return this.data[this.index(items)];
    }
    set(indices: Array<number>, value: number):void {
      if (indices.length == 1) this.data[indices[0]] = value;
      this.data[this.index(indices)] = value;
    }
    /**
     * Set all array (or subarray) to the value
     *
     * @param      value  The value
     *
     */
    fill(value: number):void {
      this.data.fill(value);
    }
    /**
     * @brief      Get indices
     *
     * @param      ranges  list of ranges. Each range is a list of numbers:
     *                     [start,stop,step]. You can set [start], [start,stop]
     *                     or [start,stop,step].
     *
     * @return     { description_of_the_return_value }
     */
    slice(...ranges:Array<Array<number>>):NDArray<T>{
      var size: Array<number> = Array(ranges.length);
      for (let i = 0; i < this.size.length; i++){
        if(i > ranges.length){
          size[i] = this.size[i];
        }
        else{
          
        }
      }
      var subarray:NDArray<T> = new NDArray(this.ctor, this.size,);

      return subarray;
    }
    /**
     * @brief      Returns true if all values in list equals the values 
     *             in array
     *
     * @param      list  The list
     *
     * @return     True if has equal data values (regardless of type)
     */
    equals(list:ArrayLike<number>):boolean{
      for (let i = 0; i < list.length; i++){
        if (list[i] != this.get(i)) return false;
      }
      return true;
    }
    [Symbol.iterator](): Iterator<number>{
      var index:number = -1;
      var array: NDArray<T> = this;
      return {
        next:function(){
          return index < array.num_elements ? {
            value: array.get(index), done: false
          } :{done:true};
        }
      };

    }
  }
  /**
   * @brief      Create an array of zeros
   *
   * @param      size   The size
   * @param      dtype  The dtype
   *
   * @return     An array of zeros
   */
  export function zeros<T extends TypedArray<T>>(
    ctor: TypedArrayConstructor<TypedArray<T>>, 
    size: Array<number>, dtype: any = null): NDArray<T> 
  {
    return new NDArray(ctor, size, null, 0);
  }
  /**
   * @brief      Create
   *
   * @param      size   The size
   * @param      dtype  The dtype
   *
   * @return     { description_of_the_return_value }
   */
  export function ones<T extends TypedArray<T>>(
    ctor: TypedArrayConstructor<TypedArray<T>>,
    size: Array<number>, dtype: any = null): NDArray<T> {
    return new NDArray(ctor, size, null, 1);
  }
  export function eye<T extends TypedArray<T>>(
    ctor: TypedArrayConstructor<TypedArray<T>>, 
    size: number): NDArray<T> {
    var array: NDArray<T> = zeros(ctor,[size, size]);
    for (let i = 0; i < size; i++) {
      array.set([i, i], 1);
    }
    return array;
  }
}