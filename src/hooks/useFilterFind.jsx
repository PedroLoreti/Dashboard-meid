export const useFilterFind = (dataFiltred, pedidoFinalizado) => {
  const pedidosIniciais = {};

  // Junta todos os códigos dos pedidos (de [2] até o final da linha)
  dataFiltred.forEach(pedido => {
    const nome = pedido[1];
    const dataInicio = pedido[0];

    for (let i = 2; i < pedido.length; i++) {
      const codigo = pedido[i];
      // Salva só se ainda não tiver sido salvo
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

  const resultado = [];

  // Mesma lógica para os finalizados
  pedidoFinalizado.forEach(pedido => {
    const finalData = pedido[0];

    for (let i = 2; i < pedido.length; i++) {
      const codigo = pedido[i];
      if (codigo && pedidosIniciais[codigo]) {
        const { nome, dataInicio } = pedidosIniciais[codigo];

        const inicio = parseDataHora(dataInicio);
        const fim = parseDataHora(finalData);

        const diffMs = fim - inicio;
        const diffMinutos = Math.round(diffMs / (1000 * 60));

        resultado.push({
          codigo,
          nome,
          dataInicio,
          dataFinal: finalData,
          total: `${diffMinutos} Min`
        });
      }
    }
  });

  console.log(resultado);
  return resultado;
};


export const calcularMediaMinutos = (pedidos) => {
  if (!pedidos.length) return "0min";

  const totais = pedidos.map(p => {
    const match = p.total.match(/\d+/); // pega só os números
    return match ? parseInt(match[0]) : 0;
  });

  const soma = totais.reduce((acc, min) => acc + min, 0);
  const media = soma / pedidos.length;

  const horas = Math.floor(media / 60);
  const minutos = Math.round(media % 60);

  return horas > 0 ? `${horas}h ${minutos}min` : `${minutos}min`;
};