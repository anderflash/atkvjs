module at{
  function requestAnimFrameFallback(callback:Function){
    window.setTimeout(callback, 1000 / 60);
  }
  var requestAnimFrameFunc: Function = window["requestAnimationFrame"] ||
    window["webkitRequestAnimationFrame"] ||
    window["mozRequestAnimationFrame"] ||
    requestAnimFrameFallback;
  /**
   * Agendar a execução de uma função tão logo durante
   *         um redesenho da tela. 
   * API: requestAnimFrame(funcao). Execute-a dentro da propria 
   *      `funcao` e você fará animação na página
   *
   * @param funcao Função que será executada no próximo redesenho
   *               da tela.
   * Chamando 
   */
  export function requestAnimFrame(callback: Function) {
    requestAnimFrameFunc(callback);
  }
}