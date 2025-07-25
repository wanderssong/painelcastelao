const container = document.getElementById('empresas');

dadosEmpresas.forEach(empresa => {
    const div = document.createElement('div');
    div.className = 'empresa';

    // Calcular valores
    const totalDepositos = empresa.depositos.reduce((acc, d) => acc + d.valor, 0);
    const totalGastos = empresa.gastos.reduce((acc, g) => acc + g.valor, 0);
    const saldo = totalDepositos - totalGastos;

    div.innerHTML = `
    <h2>${empresa.nome}</h2>

    <section>
      <h3>Depósitos</h3>
      <table>
        <tr><th>Data</th><th>Valor (R$)</th></tr>
        ${empresa.depositos.map(dep => `
          <tr><td>${dep.data}</td><td>R$ ${dep.valor.toFixed(2)}</td></tr>
        `).join('')}
      </table>
    </section>

    <section>
      <h3>Gastos</h3>
      <table>
        <tr><th>Data</th><th>Valor (R$)</th><th>Descrição</th></tr>
        ${empresa.gastos.map(g => `
          <tr><td>${g.data}</td><td>R$ ${g.valor.toFixed(2)}</td><td>${g.descricao}</td></tr>
        `).join('')}
      </table>
    </section>

    <div class="saldo">Saldo Atual: R$ ${saldo.toFixed(2)}</div>
  `;

    container.appendChild(div);
});