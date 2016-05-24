/// <reference path="../core/typedarray.ts"/>
/// <reference path="../core/ndarray.ts"/>
/// /// <reference path="../core/ndarraybucketqueue.ts"/>

module at{
  export enum Optimization{
    MAXIMIZATION,
    MINIMIZATION
  };

  export function f_min(){

  }
  export function f_max() {

  }
  export function f_sum() {

  }
  export function f_euc() {
    
  }
  export function w_diff_abs(){

  }
  export function seeds_from_data(seeds_data:Array<number>):NDArray<Int32Array>{
    return new NDArray(Int32Array, 
                       seeds_data, 
                       [seeds_data.length >> 1, 2]);
  }

  export class IFT<T extends TypedArray<T>>{
    // Will be delivered
    connectivities:NDArray<Float64Array>;
    roots         :NDArray<Int32Array>;
    predecessors  :NDArray<Int32Array>;
    labels        :NDArray<Uint16Array>;

    // Will be received
    optimization  :Optimization;
    f             :Function;
    w             :Function;
    array         :NDArray<T>;

    // Auxiliars
    graph: NDArrayGraphWeighted;
    is_seed: NDArray<Uint8Array>;

    constructor(private ctor:TypedArrayConstructor<TypedArray<T>>){
      this.connectivities = null;
      this.roots          = null;
      this.predecessors   = null;
      this.labels         = null;
    }
    /**
     * @brief      Apply an IFT
     *
     * @param      array         The array
     * @param      neighboring   The neighboring
     * @param      optimization  The optimization
     * @param      weight        The weight
     * @param      connectivity  The connectivity
     * @param      seeds         The seeds
     *
     * @return     { description_of_the_return_value }
     */
    apply(array:NDArray<T>, 
          neighboring:Neighboring, 
          optimization:Optimization,
          weight:Function,
          connectivity:Function,
          seeds:NDArray<Int32Array>
    ):void{
      // Getting the parameters
      this.connectivities = zeros(Float64Array,null,array.size);
      this.roots          = zeros(Int32Array, null, array.size);
      this.predecessors   = zeros(Int32Array, null, array.size);
      this.labels         = zeros(Uint16Array, null, array.size);
      this.is_seed        = zeros(Uint8Array, null, array.size);
      this.f              = connectivity;
      this.w              = weight;
      this.optimization   = optimization;
      this.array          = array;

      // Filling the maps
      var num_seeds: number = seeds.num_elements >> 1;
      var seeds_list: Array<NDArray<Int32Array>> = seeds.clone().split(2,1).reshape(num_seeds);
      var seeds_buckets: NDArray<Int32Array> = seeds_list[0];
      var seeds_indices: NDArray<Int32Array> = seeds_list[1];
      for (let i:number = 0; i < num_seeds; i++){
        let index: number = i << 1;
        this.labels.set([seeds.get(index)], seeds.get(index + 1));
        this.is_seed.set([seeds.get(index)], 1);
        seeds_buckets.set(i,);
      }
      for (let i: number = 0; i < this.connectivities.num_elements; i++){
        this.predecessors.set([i],i);
        this.roots.set([i], i);
        this.connectivities.set([i],this.f(i,i));
      }

      // Creating the weighted array graph
      this.graph = new NDArrayGraphWeighted(this.ctor,array,neighboring,this.w);
      
      // Creating and initializing the bucket
      let queue: NDArrayBucketQueue<Int32Array> = new NDArrayBucketQueue(Int32Array,this.graph.weight_max+1,this.array.num_elements,this.optimization);
      //bucket = seed_connectivity_uint64_t % at_bucketqueue_get_nbuckets(priv ->bucket_queue);
      for (let i: number = 0; i < seeds.num_elements; i++)
      queue.insert(seeds_buckets, seeds_indices);
      
      // Start loop
      while(!queue.is_empty()){
        let current_index: number = queue.remove();
        for(let neighbor_index:number of this.graph.neighbors_of(current_index)){
          if(!queue.is_removed(neighbor_index)){
            let connectivity_extended:number = this.f(current_index, neighbor_index);
            let connectivity_current:number = this.connectivities.get(neighbor_index);
            let is_best: boolean;
            if(this.optimization === Optimization.MAXIMIZATION)
              is_best = connectivity_extended > connectivity_current;
            else
              is_best = connectivity_extended < connectivity_current;
            if(is_best){
              if(!queue.is_inserted(neighbor_index))
                queue.insert(connectivity_extended % queue.num_buckets, neighbor_index);
              else
                queue.update(connectivity_current % queue.num_buckets, neighbor_index);
              this.connectivities.set(neighbor_index, connectivity_extended);
              this.predecessors.set(neighbor_index, current_index);
              this.labels.set(neighbor_index, this.labels.get(current_index));
              this.roots.set(neighbor_index, this.roots.get(current_index));
            }
          }
        }
      }
    }
  }
}