module at{
  export interface Shader{
    name: string;
  }
  export class ShaderWebGL implements Shader{
    name: string;
    id: WebGLShader;
    constructor(name:string, id:WebGLShader){
      this.name = name;
      this.id = id;
    }
  }
}