export const useFilterFind = (dataFiltred, pedidoFinalizado) => {
  const pedidosIniciais = {};

  // Indexa os pedidos iniciados
  dataFiltred.forEach((pedido) => {
    const nome = pedido[1];
    const dataInicio = pedido[0];

    for (let i = 2; i < pedido.length; i++) {
      const codigo = pedido[i];
      if (codigo && !pedidosIniciais[codigo]) {
        pedidosIniciais[codigo] = { nome, dataInicio };
      }
    }
  });

  const parseDataHora = (dataStr) => {
    const [data, hora] = dataStr.split(" ");
    const [dia, mes, ano] = data.split("/");
    return new Date(`${ano}-${mes}-${dia}T${hora}`);
  };

  const finalizadosMap = {};

  // Indexa os pedidos finalizados
  pedidoFinalizado.forEach((pedido) => {
    const finalData = pedido[0];
    for (let i = 2; i < pedido.length; i++) {
      const codigo = pedido[i];
      if (codigo) {
        finalizadosMap[codigo] = finalData;
      }
    }
  });

  const resultado = [];

  // Cria o array final combinando os dados
  for (const codigo in pedidosIniciais) {
    const { nome, dataInicio } = pedidosIniciais[codigo];
    const dataFinal = finalizadosMap[codigo] || null;

    let total = null;

    if (dataFinal) {
      const inicio = parseDataHora(dataInicio);
      const fim = parseDataHora(dataFinal);
      const diffMs = fim - inicio;
      const diffMinutos = Math.round(diffMs / (1000 * 60));
      total = `${diffMinutos} Min`;
    }

    resultado.push({
      codigo,
      nome,
      dataInicio,
      dataFinal,
      total,
    });
  }

  console.log(resultado);
  return resultado;
};
