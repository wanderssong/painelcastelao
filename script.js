const empresasDiv = document.getElementById('empresas');
const totalGeralDiv = document.getElementById('total-geral');
let totalGeralGastos = 0;

function formatarValor(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function carregarPainel() {
    // Atualiza a data
    document.getElementById("dataAtualizacao").textContent = `Última atualização: ${ ultimaAtualizacao }`;

    // Zera o total geral antes de começar
    totalGeralGastos = 0;
    empresasDiv.innerHTML = "";

    dadosEmpresas.forEach(empresa => {
        const div = document.createElement('div');
        div.className = 'empresa';

        const totalDepositos = empresa.depositos.reduce((acc, d) => acc + d.valor, 0);
        const totalGastos = empresa.gastos.reduce((acc, g) => acc + g.valor, 0);
        const saldo = totalDepositos - totalGastos;

        totalGeralGastos += totalGastos;

        div.innerHTML = `
          <h2>${empresa.nome}</h2>

          <section>
            <h3>Depósitos</h3>
            <table>
              <tr><th>Data</th><th>Valor (R$)</th></tr>
              ${empresa.depositos.map(dep => `
                <tr><td>${dep.data}</td><td>${formatarValor(dep.valor)}</td></tr>
              `).join('')}
            </table>
          </section>

          <section>
            <h3>Gastos</h3>
            <table>
              <tr><th>Data</th><th>Valor (R$)</th><th>Descrição</th></tr>
              ${empresa.gastos.map(g => `
                <tr><td>${g.data}</td><td>${formatarValor(g.valor)}</td><td>${g.descricao}</td></tr>
              `).join('')}
            </table>
          </section>

          <div class="resumo-financeiro">
            <div class="depositado">💵 Valor Adicionado: ${formatarValor(totalDepositos)}</div>
            <div class="total-empresa">💸 Total de Gastos: ${formatarValor(totalGastos)}</div>
            <div class="saldo">📊 Saldo Atual: ${formatarValor(saldo)}</div>
          </div>
        `;

        empresasDiv.appendChild(div);
    });

    totalGeralDiv.innerHTML = `💰 Total Geral de Gastos: ${ formatarValor(totalGeralGastos) }`;
}

// Login simples
function entrar() {
    const user = document.getElementById("userName").value.trim().toLowerCase();
    const pass = document.getElementById("password").value.trim();
    const erro = document.getElementById("erroLogin");

    if (user === "administrador" && pass === "2025") {
        document.getElementById("login").style.display = "none";
        document.getElementById("painel").style.display = "block";
        carregarPainel();
    } else {
        erro.textContent = "Usuário ou senha incorretos.";
    }
}

// Modo escuro
document.getElementById('toggle-dark').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
