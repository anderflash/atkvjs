module at{
  export class ShaderProgram{
    vertexShader: Shader;
    fragmentShader: Shader;
    name: string;
    constructor(programName:string,vertexShader:Shader, fragmentShader:Shader){
      this.name = programName;
      this.vertexShader = vertexShader;
      this.fragmentShader = fragmentShader;
    }
  }
  export class ShaderProgramWebGL extends ShaderProgram{
    id: WebGLProgram;
    constructor(programName: string, vertexShader: ShaderWebGL, fragmentShader: ShaderWebGL) {
      super(programName, vertexShader, fragmentShader);
    }
  }
}