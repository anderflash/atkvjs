interface ArrayBuffered {
  /**
    * The ArrayBuffer instance referenced by the array. 
    */
  buffer: ArrayBuffer;

  /**
    * The length in bytes of the array.
    */
  byteLength: number;

  /**
    * The offset in bytes of the array.
    */
  byteOffset: number;
}

interface Filled<T>{
  fill(value: number, start?: number, end?: number): T;
}

interface TypedArray<T> extends ArrayBuffered, Filled<T>{
  BYTES_PER_ELEMENT: number;
}

interface TypedArrayConstructor<T extends ArrayBuffered> {
  prototype: T;
  new (length: number): T;
  new (array: ArrayLike<number>): T;
  new (buffer: ArrayBuffer, byteOffset?: number, length?: number): T;

  /**
    * The size in bytes of each element in the array. 
    */
  BYTES_PER_ELEMENT: number;

  /**
    * Returns a new array from a set of elements.
    * @param items A set of elements to include in the new array object.
    */
  of(...items: number[]): T;

  /**
    * Creates an array from an array-like or iterable object.
    * @param arrayLike An array-like or iterable object to convert to an array.
    * @param mapfn A mapping function to call on every element of the array.
    * @param thisArg Value of 'this' used to invoke the mapfn.
    */
  from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): T;
}