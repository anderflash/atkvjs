class NDArray<T extends ArrayLike<number>>{
  dim:number;
  size:Array<number>;
  step:Array<number>;
  data:T;
  
}