export const useFilterFind = (dataFiltred, pedidoFinalizado) => {
  const pedidosIniciais = {};

  dataFiltred.forEach(pedido => {
    const codigo = pedido[2];
    pedidosIniciais[codigo] = {
      nome: pedido[1],
      dataInicio: pedido[0]
    };
  });

  const parseDataHora = (dataStr) => {
    const [data, hora] = dataStr.split(" ");
    const [dia, mes, ano] = data.split("/");
    return new Date(`${ano}-${mes}-${dia}T${hora}`);
  };

  const resultado = pedidoFinalizado
    .filter(pedido => pedidosIniciais[pedido[2]])
    .map(pedido => {
      const codigo = pedido[2];
      const finalData = pedido[0];
      const { nome, dataInicio } = pedidosIniciais[codigo];

      const inicio = parseDataHora(dataInicio);
      const fim = parseDataHora(finalData);

      const diffMs = fim - inicio;
      const diffMinutos = Math.round(diffMs / (1000 * 60));

      return {
        codigo,
        nome,
        dataInicio,
        dataFinal: finalData,
        total: `${diffMinutos} Min`
      };
    });

  console.log(resultado);
  return resultado;
};
