/// <reference path="typedarray.ts"/>
/// <reference path="ndarray.ts"/>

module at{
  export enum Neighboring{
    NEIGHBOR_4,
    NEIGHBOR_8,
    NEIGHBOR_6,
    NEIGHBOR_18,
    NEIGHBOR_26
  }
  export function neighboringValue(neighboring:Neighboring):number{
    switch(neighboring){
      case Neighboring.NEIGHBOR_4: return 4;
      case Neighboring.NEIGHBOR_6: return 6;
      case Neighboring.NEIGHBOR_8: return 8;
      case Neighboring.NEIGHBOR_18: return 18;
      case Neighboring.NEIGHBOR_26: return 26;
    }
  }
  var neighboring_indices_2D:Array<Array<number>> = [[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[-1,1],[1,-1],[1,1]];
  var neighboring_indices_3D: Array<Array<number>> = [[ 0, 0, -1], [0, 0, 1], [0, -1, 0], [0, 1, 0], [-1, 0, 0], [1, 0, 0],
                                               [ 0,-1,-1], [ 0,-1, 1], [ 0, 1,-1], [ 0, 1, 1],
                                               [-1,-1, 0], [-1, 1, 0], [ 1,-1, 0], [ 1, 1, 0],
                                               [-1, 0,-1], [-1, 0, 1], [ 1, 0,-1], [ 1, 0, 1],
                                               [-1,-1,-1], [-1,-1, 1], [-1, 1,-1], [-1, 1, 1],
                                               [ 1,-1,-1], [ 1,-1, 1], [ 1, 1,-1], [ 1, 1, 1]];
  export class NDArrayGraph<T extends TypedArray<T>>{
    array:     NDArray<T>;
    neighbors: NDArray<Int32Array>;
    edges:     NDArray<Uint8Array>;
    num_neighbors: number;
    constructor(private ctor:TypedArrayConstructor<TypedArray<T>>,
                array:NDArray<T>,
                neighboring:Neighboring = Neighboring.NEIGHBOR_4)
    {
      this.array = array;
      this.buildNeighbors(neighboring);
    }


    neighbors_of(indices: Array<number>): Array<number>;
    neighbors_of(index: number):Array<number>;
    neighbors_of(index_or_indices:number|Array<number>):Array<number>{
      var neighbors_of_node: Array<number> = [];
      var index: number;
      if(typeof index_or_indices === 'number')
        index = index_or_indices * this.num_neighbors;
      else
        index = this.array.index(index_or_indices) * this.num_neighbors;
      

      for (let i: number = 0; i < this.num_neighbors; i++) {
        if (this.edges.get(index + i) == 1) {
          neighbors_of_node.push(this.neighbors.get(index + i));
        }
      }
      return neighbors_of_node;
    }
    are_neighbors(node1:number, node2:number):boolean{
      var index:number = node1 * this.num_neighbors;
      for (let i: number = 0; i < this.num_neighbors; i++) {
        if (this.edges.get(index + i) == 1) {
          if(this.neighbors.get(index+i) == node2){
            return true;
          }
        }
      }
      return false;
    }
    add_edge(node1:number, node2:number):void{
      this.add_arc(node1, node2);
      this.add_arc(node2, node1);
    }
    remove_edge(node1: number, node2: number): void {
      this.remove_arc(node1, node2);
      this.remove_arc(node2, node1);
    }
    add_arc(node1: number, node2: number): void {
      var index: number = node1 * this.num_neighbors;
      for (let i: number = 0; i < this.num_neighbors; i++) {
        if (this.neighbors.get(index + i) == node2) {
          this.edges.set([index + i], 1);
          break;
        }
      }
    }
    remove_arc(node1: number, node2: number): void {
      var index: number = node1 * this.num_neighbors;
      for (let i: number = 0; i < this.num_neighbors; i++) {
        if (this.neighbors.get(index + i) == node2) {
          this.edges.set([index + i], 0);
          break;
        }
      }
    }

    private buildNeighbors(neighboring:Neighboring){
      // Get size of array of neighbors and edges
      var size    : Array<number> = this.array.size.slice();
      var indices : Array<number> = Array(size.length);
      var indices2: Array<number> = Array(size.length);
      this.num_neighbors = neighboringValue(neighboring);
      var neighboring_indices:Array<Array<number>> = null;
      if (this.array.dim == 2)
        neighboring_indices = neighboring_indices_2D;
      else
        neighboring_indices = neighboring_indices_3D;
      size.push(this.num_neighbors);
      // Creating the arrays
      this.neighbors = new NDArray(Int32Array, null, size);
      this.edges     = new NDArray(Uint8Array, null, size); 
      // Filling the arrays
      let k:number = 0;
      let out_of_bounds: boolean;
      for (let i:number = 0; i < this.array.num_elements; i++){
        this.array.indices(i, indices);
        for (let n:number = 0; n < this.num_neighbors; n++, k++){
          out_of_bounds = false;
          for (let ni: number = 0; ni < this.array.dim; ni++) {
            indices2[ni] = indices[ni] + neighboring_indices[n][ni];
            if (indices2[ni] < 0 || indices2[ni] >= this.array.size[ni]) {
              out_of_bounds = true;
            }
          }
          this.edges.set([k], +!out_of_bounds);
          this.neighbors.set([k], this.array.index(indices2));
        }
      }
    }
  }
}
