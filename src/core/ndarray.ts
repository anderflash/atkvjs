class NDArray{
  dim:number;
  size:Array<number>;
  step:Array<number>;
  data:ArrayBuffer;
  dtype: ArrayLike<number>;
  num_elements: number;
  elemsize: number;
  constructor(data_array:ArrayLike<number>|Iterable<number>, data_size:Array<number>, dtype:any = null){
    this.dim = data_size.length;
    this.size = data_size;
    this.step = Array<number>(this.dim);
    this.step[this.dim-1] = 1;
    for (let i = 1; i < this.dim; i++)
      this.step[this.dim-i-1] = this.step[this.dim-i]*
                                this.size[this.dim-i];
    if(data_array === null){
      this.data = data_array;
    }else if(data_array instanceof ArrayLike<number>){
      
    }
    
    if(dtype === undefined){
      this.dtype = new Uint32Array(this.data);
    }
  }
  get(...items):number
  {
    let index:number = 0;
    for (let i = 0; i < items.length; i++){
      index += this.step[i] * items[i];
    }
    return this.dtype[index];
  }
}