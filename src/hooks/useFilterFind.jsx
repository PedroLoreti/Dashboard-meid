export const userFilterFind = (dataFiltred, pedidoFinalizado) => {
    const pedidosIniciais = {};
    dataFiltred.forEach(pedido => {
      const codigo = pedido[2];
      pedidosIniciais[codigo] = {
        nome: pedido[1],
        dataInicio: pedido[0]
      };
    });
  

    const resultado = pedidoFinalizado
      .filter(pedido => pedidosIniciais[pedido[2]])
      .map(pedido => {
        const codigo = pedido[2];
        const finalData = pedido[0];
        const { nome, dataInicio } = pedidosIniciais[codigo];
  
        return [codigo, nome, dataInicio, finalData];
      });
      
    console.log(resultado)
    return resultado;
}