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
  it("should have type Int32Array", function(){
    expect(emptyarray.dtype).toEqual(jasmine.any(Int32Array));
  });

  var data = [1, 2, 3, 4, 5, 6];
  var array_with_value = new NDArray([1,2,3,4,5,6], [2, 3]);
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
});