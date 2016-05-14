module at{
  export class Material{
    
  }
  interface HashTable<T>{
    [key: string]: T;
  }
  export var materials: HashTable<Material> = {};
}

at.materials.