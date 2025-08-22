// == Base atual preservada e expandida ==
const empresasDiv = document.getElementById('empresas');
const totalGeralDiv = document.getElementById('total-geral');

const filtroMesEl = document.getElementById('filtroMes');
const filtroAnoEl = document.getElementById('filtroAno');
const filtroBuscaEl = document.getElementById('filtroBusca');
const toggleDepositosEl = document.getElementById('toggleDepositos');
const toggleGastosEl = document.getElementById('toggleGastos');

let totalGeralGastos = 0;

// paginação por empresa (armazenar índice da página de gastos)
const statePaginacao = new Map(); // key: nomeEmpresa, value: { page: 1, pageSize: 15 }

function formatarValor(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function parseDMY(str) {
  // "25-07-2025" -> Date(2025,06,25)
  const [dd, mm, yyyy] = str.split('-').map(s => parseInt(s, 10));
  return new Date(yyyy, mm - 1, dd);
}

function dmyMatchesFilters(dmyStr) {
  const mes = filtroMesEl.value;      // "08" ou ""
  const ano = (filtroAnoEl.value || '').trim(); // "2025" ou ""
  if (!mes && !ano) return true;

  const [dd, mm, yyyy] = dmyStr.split('-');
  if (mes && mm !== mes) return false;
  if (ano && yyyy !== ano) return false;
  return true;
}

function descricaoMatches(desc) {
  const q = (filtroBuscaEl.value || '').trim().toLowerCase();
  if (!q) return true;
  return (desc || '').toLowerCase().includes(q);
}

function agruparPorMes(gastosFiltrados) {
  // retorna [{mesKey:"2025-08", label:"Ago/2025", itens:[...]}]
  const meses = new Map();
  gastosFiltrados.forEach(g => {
    const [dd, mm, yyyy] = g.data.split('-');
    const key = `${yyyy}-${mm}`;
    const label = `${mm}/${yyyy}`;
    if (!meses.has(key)) meses.set(key, { mesKey: key, label, itens: [] });
    meses.get(key).itens.push(g);
  });
  // ordenar por data (mais recentes primeiro)
  const sorted = Array.from(meses.values()).sort((a, b) => b.mesKey.localeCompare(a.mesKey));
  sorted.forEach(grp => grp.itens.sort((a, b) => parseDMY(b.data) - parseDMY(a.data)));
  return sorted;
}

function filtrarDepositos(deps) {
  return deps.filter(d => dmyMatchesFilters(d.data));
}

function filtrarGastos(gastos) {
  return gastos.filter(g => dmyMatchesFilters(g.data) && descricaoMatches(g.descricao));
}

function atualizarResumoSticky(totalEmpresas, totalGastosFiltrados, totalDepositosFiltrados) {
  const el = document.getElementById('resumoSticky');
  const msg = [
    `Empresas: ${totalEmpresas}`,
    `Gastos : ${formatarValor(totalGastosFiltrados)}`,
    `Depósitos : ${formatarValor(totalDepositosFiltrados)}`
  ].join(' • ');
  el.textContent = msg;
}

function renderEmpresa(empresa) {
  const div = document.createElement('div');
  div.className = 'empresa';

  // paginação inicial por empresa
  if (!statePaginacao.has(empresa.nome)) statePaginacao.set(empresa.nome, { page: 1, pageSize: 15 });

  const depsFiltrados = filtrarDepositos(empresa.depositos);
  const gastosFiltrados = filtrarGastos(empresa.gastos);

  const totalDepositos = depsFiltrados.reduce((acc, d) => acc + d.valor, 0);
  const totalGastos = gastosFiltrados.reduce((acc, g) => acc + g.valor, 0);
  const saldo = totalDepositos - totalGastos;

  // seção depósitos (colapsável)
  const depsSec = document.createElement('section');
  const depsHead = document.createElement('div');
  depsHead.className = 'section-head';
  depsHead.innerHTML = `<h3>Depósitos (${depsFiltrados.length})</h3>`;
  const btnDepToggle = document.createElement('button');
  btnDepToggle.textContent = 'Ocultar';
  depsHead.appendChild(btnDepToggle);

  const depsTable = document.createElement('table');
  depsTable.innerHTML = `
    <tr><th>Data</th><th>Valor (R$)</th></tr>
    ${depsFiltrados
      .sort((a, b) => parseDMY(b.data) - parseDMY(a.data))
      .map(dep => `<tr><td>${dep.data}</td><td>${formatarValor(dep.valor)}</td></tr>`)
      .join('')}
  `;
  depsSec.appendChild(depsHead);
  depsSec.appendChild(depsTable);

  btnDepToggle.addEventListener('click', () => {
    const vis = depsTable.style.display !== 'none';
    depsTable.style.display = vis ? 'none' : '';
    btnDepToggle.textContent = vis ? 'Mostrar' : 'Ocultar';
  });

  // seção gastos (colapsável + paginação + agrupamento por mês)
  const gastosSec = document.createElement('section');
  const gastosHead = document.createElement('div');
  gastosHead.className = 'section-head';
  gastosHead.innerHTML = `<h3>Gastos (${gastosFiltrados.length})</h3>`;
  const btnGasToggle = document.createElement('button');
  btnGasToggle.textContent = 'Ocultar';
  gastosHead.appendChild(btnGasToggle);

  const gastosWrap = document.createElement('div');
  const tabelaGastos = document.createElement('table');

  function renderGastosPaginados() {
    const { page, pageSize } = statePaginacao.get(empresa.nome);
    const limite = page * pageSize;

    const grupos = agruparPorMes(gastosFiltrados);
    const rows = [];
    let count = 0;

    grupos.forEach(grp => {
      // inserir cabeçalho de mês somente se houver pelo menos um item dentro do limite
      const itensGrupo = [];
      for (const g of grp.itens) {
        if (count >= limite) break;
        itensGrupo.push(`<tr><td>${g.data}</td><td>${formatarValor(g.valor)}</td><td>${g.descricao}</td></tr>`);
        count++;
      }
      if (itensGrupo.length) {
        rows.push(`<tr class="mes-header"><td colspan="3">Mês: ${grp.label}</td></tr>`);
        rows.push(...itensGrupo);
      }
    });

    tabelaGastos.innerHTML = `
      <tr><th>Data</th><th>Valor (R$)</th><th>Descrição</th></tr>
      ${rows.join('')}
    `;

    // botão ver mais
    verMaisBtn.style.display = (gastosFiltrados.length > count) ? 'block' : 'none';
  }

  const verMaisBtn = document.createElement('button');
  verMaisBtn.className = 'ver-mais';
  verMaisBtn.textContent = 'Ver mais gastos';
  verMaisBtn.addEventListener('click', () => {
    const st = statePaginacao.get(empresa.nome);
    st.page += 1;
    statePaginacao.set(empresa.nome, st);
    renderGastosPaginados();
  });

  gastosWrap.appendChild(tabelaGastos);
  gastosWrap.appendChild(verMaisBtn);

  gastosSec.appendChild(gastosHead);
  gastosSec.appendChild(gastosWrap);

  btnGasToggle.addEventListener('click', () => {
    const vis = gastosWrap.style.display !== 'none';
    gastosWrap.style.display = vis ? 'none' : '';
    btnGasToggle.textContent = vis ? 'Mostrar' : 'Ocultar';
  });

  // header empresa + resumo
  div.innerHTML = `<h2>${empresa.nome}</h2>`;
  const resumo = document.createElement('div');
  resumo.className = 'resumo-financeiro';
  resumo.innerHTML = `
    <div class="depositado">💵 Valor Adicionado : ${formatarValor(totalDepositos)}</div>
    <div class="total-empresa">💸 Total de Gastos : ${formatarValor(totalGastos)}</div>
    <div class="saldo">📊 Saldo Atual: ${formatarValor(saldo)}</div>
  `;

  // aplica toggles de visibilidade globais
  depsSec.style.display = toggleDepositosEl.checked ? '' : 'none';
  gastosSec.style.display = toggleGastosEl.checked ? '' : 'none';

  // monta
  div.appendChild(depsSec);
  div.appendChild(gastosSec);
  div.appendChild(resumo);

  // render inicial dos gastos paginados
  renderGastosPaginados();
  return { div, totalGastos, totalDepositos };
}

function carregarPainel() {
  document.getElementById("dataAtualizacao").textContent = `Última atualização: ${ultimaAtualizacao}`;
  totalGeralGastos = 0;
  empresasDiv.innerHTML = "";

  const frag = document.createDocumentFragment();

  let somaGastosFiltro = 0;
  let somaDepositosFiltro = 0;

  // ordena empresas por nome para leitura consistente
  const lista = [...dadosEmpresas].sort((a, b) => a.nome.localeCompare(b.nome));

  lista.forEach(empresa => {
    const { div, totalGastos, totalDepositos } = renderEmpresa(empresa);
    somaGastosFiltro += totalGastos;
    somaDepositosFiltro += totalDepositos;
    totalGeralGastos += totalGastos; // mantém compatibilidade com seu total geral
    frag.appendChild(div);
  });

  empresasDiv.appendChild(frag);
  totalGeralDiv.innerHTML = `💰 Total Geral de Gastos : ${formatarValor(totalGeralGastos)}`;

  atualizarResumoSticky(lista.length, somaGastosFiltro, somaDepositosFiltro);
}

// ---- Login simples (preserva sua lógica) ----
function entrar() {
  const user = document.getElementById("userName").value.trim().toLowerCase();
  const pass = document.getElementById("password").value.trim();
  const erro = document.getElementById("erroLogin");

  if (user === "administrador" && pass === "2025") {
    document.getElementById("login").style.display = "none";
    document.getElementById("painel").style.display = "block";
    // preferencia de tema
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
    carregarPainel();
  } else {
    erro.textContent = "Usuário ou senha incorretos.";
  }
}

// ---- Modo escuro com persistência ----
document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// ---- Reagir aos filtros globais ----
[filtroMesEl, filtroAnoEl, filtroBuscaEl].forEach(el => {
  el.addEventListener('input', () => {
    // resetar paginação de todas as empresas ao aplicar filtros
    statePaginacao.clear();
    carregarPainel();
  });
});

[toggleDepositosEl, toggleGastosEl].forEach(el => {
  el.addEventListener('change', () => carregarPainel());
});
