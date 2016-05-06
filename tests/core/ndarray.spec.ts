/// <reference path="../../src/core/ndarray.ts"/>


import NDArray = at.NDArray;
import zeros   = at.zeros;
import ones    = at.ones;
import eye     = at.eye;
describe('NDArray tests', ()=>{
  var emptyarray = new NDArray(null,[2, 3]);
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
  it("should have 6 elements", function(){
    expect(emptyarray.num_elements).toBe(6);
  })
  it("should have type Int32Array", function(){
    expect(emptyarray.dtype).toEqual(jasmine.any(Int32Array));
    expect(emptyarray.elemsize).toBe(4);
  });

  var data = [1, 2, 3, 4, 5, 6];
  var array_with_value:NDArray = new NDArray([1, 2, 3, 4, 5, 6], [2, 3]);
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
    var numbers = [0, 1];
    var functions = [zeros, ones];
    for (let n of numbers) {
      var values = functions[n]([2, 3]);
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
    var identity:NDArray = eye(3);
    var values: Array<number> = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    for (let i = 0; i < values.length; i++){
      expect(identity.get(i)).toBe(values[i]);
    }
  });
  it("should get a substring", function(){
    var array_values: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var subarray_values: Array<number> = [1, 4, 7];
    var array_3d: NDArray = new NDArray(array_values,[3, 3]);
    // filter just first dimension (y in this case)
    var subarray: NDArray = array_3d.slice([1, 2]);
    var i = 0;
    for(let value of subarray){
      expect(value).toBe(array_values[i++]);
    }
  });
});