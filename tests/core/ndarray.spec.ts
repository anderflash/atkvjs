/// <reference path="../../src/core/ndarray.ts"/>
/// <reference path="../../typings/main/ambient/jasmine/index.d.ts" />
import NDArray = at.NDArray;
import zeros   = at.zeros;
import ones    = at.ones;
import eye     = at.eye;
describe('NDArray tests', ()=>{
  var emptyarray:NDArray<Int32Array> = new NDArray(Int32Array,[2, 3]);
  it("should have proper dimension", function(){
    expect(emptyarray.dim).toBe(2);
  });
  it("should have proper size", function() {
    expect(emptyarray.size[0]).toBe(2);
    expect(emptyarray.size[1]).toBe(3);
  });
  it("should have proper step", function(){
    expect(emptyarray.step[0]).toBe(3);
    expect(emptyarray.step[1]).toBe(1);
  });
  it("should have 6 elements", function() {
    expect(emptyarray.num_elements).toBe(6);
  });
  it("should have type Int32Array", function(){
    expect(emptyarray.data instanceof Int32Array).toBeTruthy();
    expect(emptyarray.data.BYTES_PER_ELEMENT).toBe(4);
  });

  var data = [1, 2, 3, 4, 5, 6];
  var array_with_value:NDArray<Int32Array> = new NDArray(Int32Array,[1, 2, 3, 4, 5, 6], [2, 3]);
  it("should have proper data",function(){
    for (let i = 0; i < data.length; i++){
      expect(array_with_value.get(i)).toBe(data[i]);
    }
    for (let y = 0, i = 0; y < 2; y++){
      for (let x = 0; x < 3; x++, i++){
        expect(array_with_value.get(y, x)).toBe(data[i]);
      }
    }
  });
  it("should get zeros and ones", function() {
    var numbers:Array<number> = [0, 1];
    var functions:Array<Function> = [zeros, ones];
    for (let n of numbers) {
      var values:NDArray<Int32Array> = functions[n](Int32Array,[2, 3]);
      // Test 1D index
      for (let i = 0; i < 6; i++)
        expect(values.get(i)).toBe(numbers[n]);

      // Test ND index (in this case, 2D)
      for (let y = 0, i = 0; y < 2; y++) {
        for (let x = 0; x < 3; x++ , i++) {
          expect(values.get(y, x)).toBe(numbers[n]);
        }
      }
    }
  });
  it("should get identity matrix", function() {
    var identity:NDArray<Int32Array> = eye(Int32Array,3);
    var values: Array<number> = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    for (let i = 0; i < values.length; i++){
      expect(identity.get(i)).toBe(values[i]);
    }
  });
  it("should convert ND and 1D indices correctly",function(){
    expect(array_with_value.index([1, 2])).toBe(5);
    expect(array_with_value.indices(5)).toEqual([1, 2]);
  })
  // it("should get a substring", function(){
  //   var array_values   : Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  //   var subarray_values: Array<number> = [1, 4, 7];
  //   var subarray_size  : Array<number> = [1, 3];
  //   var array: NDArray<Int32Array> = new NDArray(Int32Array,array_values,[3, 3]);
  //   // filter just first dimension (y in this case)
  //   var subarray: NDArray<Int32Array> = array.slice([1, 2]);
  //   var i = 0;
  //   for(let value of subarray){
  //     expect(value).toBe(array_values[i++]);
  //   }

  //   expect(subarray.equals(subarray_values)).toEqual(true);

  //   // Testing changes
  //   subarray.fill(5);
  //   var array_new_values: Array<number> = [0, 5, 2, 
  //                                          3, 5, 5, 
  //                                          6, 5, 8];
  //   expect(array.equals(array_new_values)).toEqual(true);

  // });
});