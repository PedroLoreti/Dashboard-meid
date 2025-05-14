export const useFilterFind = (dataFiltred = [], pedidoFinalizado = []) => {
  const pedidosIniciais = [];

  dataFiltred = Array.isArray(dataFiltred) ? dataFiltred : [];
  pedidoFinalizado = Array.isArray(pedidoFinalizado) ? pedidoFinalizado : [];

  dataFiltred.forEach((pedido) => {
    const nome = pedido[1];
    const dataInicio = pedido[0];

    for (let i = 2; i < pedido.length; i++) {
      const codigo = pedido[i];
      if (codigo) {
        pedidosIniciais.push({ codigo, nome, dataInicio });
      }
    }
  });

  const parseDataHora = (dataStr) => {
    const [data, hora] = dataStr.split(" ");
    const [dia, mes, ano] = data.split("/");
    return new Date(`${ano}-${mes}-${dia}T${hora}`);
  };

  const finalizados = [];

  pedidoFinalizado.forEach((pedido) => {
    const dataFinal = pedido[0];
    const nome = pedido[1];

    for (let i = 2; i < pedido.length; i++) {
      const codigo = pedido[i];
      if (codigo) {
        finalizados.push({ codigo, nome, dataFinal });
      }
    }
  });

  const resultado = [];

  pedidosIniciais.forEach((pedidoInicial) => {
    const index = finalizados.findIndex(
      (f) => f.codigo === pedidoInicial.codigo && f.nome === pedidoInicial.nome
    );

    const dataFinal = index !== -1 ? finalizados[index].dataFinal : null;

    let total = null;

    if (dataFinal) {
      const inicio = parseDataHora(pedidoInicial.dataInicio);
      const fim = parseDataHora(dataFinal);
      const diffMs = fim - inicio;
      const diffMinutos = Math.round(diffMs / (1000 * 60));
      total = `${diffMinutos} Min`;

      finalizados.splice(index, 1);
    }

    resultado.push({
      codigo: pedidoInicial.codigo,
      nome: pedidoInicial.nome,
      dataInicio: pedidoInicial.dataInicio,
      dataFinal,
      total,
    });
  });

  return resultado;
};

export const calcularMediaMinutos = (pedidos) => {
  if (!pedidos.length) return "0min";

  const totais = pedidos.map((p) => {
    if (!p.total) return 0;
    const match = p.total.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  });

  const soma = totais.reduce((acc, min) => acc + min, 0);
  const media = soma / pedidos.length;

  const horas = Math.floor(media / 60);
  const minutos = Math.round(media % 60);

  return horas > 0 ? `${horas}h ${minutos}min` : `${minutos}min`;
};

export const pedidoMaisDemorado = (pedidos) => {
  if (!pedidos || pedidos.length === 0) return null;

  return pedidos.reduce((maior, atual) => {
    const duracaoMaior = parseInt(maior.total?.trim()) || 0;
    const duracaoAtual = parseInt(atual.total?.trim()) || 0;

    return duracaoAtual > duracaoMaior ? atual : maior;
  });
};
