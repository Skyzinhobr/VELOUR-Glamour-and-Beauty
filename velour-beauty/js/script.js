// ============================================================
//  VELOUR BEAUTY — JavaScript principal
//  Responsável por: dados, estado, carrinho, filtros,
//  wishlist, ticker, categorias e notificações (toast).
// ============================================================


// ─── DADOS: CATEGORIAS ───────────────────────────────────────
// Array de objetos representando cada categoria de produto.
// Cada objeto contém: ícone emoji, nome exibido, quantidade
// de produtos disponíveis e a classe CSS de cor do card.
const categories = [
  { icon: '💄', name: 'Batons',      count: 48, cls: 'c1' },
  { icon: '👁️', name: 'Olhos',       count: 63, cls: 'c2' },
  { icon: '✨', name: 'Iluminador',  count: 29, cls: 'c3' },
  { icon: '🌸', name: 'Blush',       count: 35, cls: 'c4' },
  { icon: '🎨', name: 'Base',        count: 52, cls: 'c5' },
  { icon: '💅', name: 'Skincare',    count: 41, cls: 'c6' },
];

// ─── DADOS: FILTROS ──────────────────────────────────────────
// Lista de categorias que aparecem como abas de filtro
// na seção de produtos. "Todos" exibe todos os produtos.
const filters = ['Todos', 'Rosto', 'Olhos', 'Lábios', 'Glow'];

// ─── DADOS: PRODUTOS ─────────────────────────────────────────
// Catálogo de produtos da loja. Cada produto contém:
//   id      → identificador único (usado como chave no carrinho)
//   brand   → marca exibida no card
//   name    → nome do produto
//   shade   → tonalidade ou subtítulo
//   price   → preço atual (em R$)
//   old     → preço antigo para exibir desconto (null = sem desconto)
//   emoji   → representação visual do produto
//   badge   → etiqueta de destaque (null = sem etiqueta)
//   stars   → avaliação de 1 a 5 estrelas
//   cat     → categoria usada pelo filtro
//   bg      → gradiente CSS do fundo do card de imagem
const products = [
  { id:1, brand:'Velour Pro',  name:'Batom Líquido Matte Ultra',  shade:'Crimson Kiss',       price:89,  old:120, emoji:'💋', badge:'Mais Vendido', stars:5, cat:'Lábios', bg:'linear-gradient(135deg,#3B1060,#E8507A)' },
  { id:2, brand:'Velour Pro',  name:'Paleta de Sombras Nude',     shade:'12 tons aveludados', price:149, old:199, emoji:'🎨', badge:'Novo',         stars:5, cat:'Olhos',  bg:'linear-gradient(135deg,#1A0A2E,#9B4DCA)' },
  { id:3, brand:'Velour Glow', name:'Iluminador em Pó',           shade:'Golden Hour',        price:79,  old:null,emoji:'✨', badge:null,           stars:4, cat:'Glow',   bg:'linear-gradient(135deg,#2D1A0A,#D4A843)' },
  { id:4, brand:'Velour Skin', name:'Base Fluida Full Cover',     shade:'30 tonalidades',     price:129, old:159, emoji:'🌟', badge:'Top',          stars:5, cat:'Rosto',  bg:'linear-gradient(135deg,#0A2D1A,#4DCA9B)' },
  { id:5, brand:'Velour Pro',  name:'Blush em Creme Glow',        shade:'Coral Fever',        price:69,  old:null,emoji:'🌸', badge:'Lançamento',   stars:4, cat:'Rosto',  bg:'linear-gradient(135deg,#2D0A1E,#F4A26A)' },
  { id:6, brand:'Velour Eyes', name:'Delineador em Gel',          shade:'Midnight Black',     price:59,  old:79,  emoji:'👁️', badge:null,           stars:5, cat:'Olhos',  bg:'linear-gradient(135deg,#0A1A2D,#4D6BCA)' },
  { id:7, brand:'Velour Glow', name:'Contorno & Highlight Kit',   shade:'Duo Luminoso',       price:119, old:149, emoji:'🔦', badge:'Kit',          stars:4, cat:'Glow',   bg:'linear-gradient(135deg,#1A1A0A,#CAB84D)' },
  { id:8, brand:'Velour Lips', name:'Gloss Volumizador',          shade:'Rose Nude',          price:49,  old:null,emoji:'💗', badge:'Novo',         stars:5, cat:'Lábios', bg:'linear-gradient(135deg,#2D0A2A,#CA4D9B)' },
];


// ─── ESTADO GLOBAL ───────────────────────────────────────────
// cart: objeto onde cada chave é o id do produto e o valor
//       é o objeto do produto + a propriedade qty (quantidade).
//       Ex: { 1: { ...produto, qty: 2 }, 3: { ...produto, qty: 1 } }
let cart = {};

// wishlist: Set de ids de produtos marcados como favoritos.
//           Usamos Set para garantir unicidade e busca rápida.
let wishlist = new Set();

// activeFilter: guarda qual aba de filtro está selecionada no momento.
let activeFilter = 'Todos';


// ─── TICKER (FAIXA ANIMADA) ──────────────────────────────────
// Frases que aparecem na faixa animada de informações logo
// abaixo do hero. Duplicamos o conteúdo para o loop ser perfeito.
const tickerPhrases = [
  'Frete grátis acima de R$150',
  'Cruelty Free',
  'Vegano & Sustentável',
  '+50 mil clientes satisfeitas',
  'Entrega expressa disponível',
  'Parcele em até 6x sem juros',
];

const tickerEl = document.getElementById('ticker');

// Geramos o HTML de cada frase com um separador "✦" entre elas.
// O conteúdo é duplicado para que a animação CSS de scroll
// infinite não mostre espaço em branco no final do loop.
const tickerContent = [...tickerPhrases, ...tickerPhrases]
  .map(p => `<span>${p}</span><span class="ticker-dot">✦</span>`)
  .join('');

// Duplicamos mais uma vez para preencher a segunda metade da animação.
tickerEl.innerHTML = tickerContent + tickerContent;


// ─── RENDERIZAR CATEGORIAS ───────────────────────────────────
// Percorre o array de categorias e gera dinamicamente os cards HTML.
// Cada card exibe ícone, nome e contagem de produtos.
document.getElementById('catsGrid').innerHTML = categories.map(c => `
  <div class="cat-card ${c.cls}">
    <span class="cat-icon">${c.icon}</span>
    <div class="cat-name">${c.name}</div>
    <div class="cat-count">${c.count} produtos</div>
  </div>
`).join('');


// ─── RENDERIZAR ABAS DE FILTRO ───────────────────────────────
// Gera os botões de filtro dinamicamente a partir do array `filters`.
// O filtro ativo recebe a classe "active" via verificação condicional.
document.getElementById('filterTabs').innerHTML = filters.map(f => `
  <button class="filter-tab ${f === activeFilter ? 'active' : ''}" onclick="setFilter('${f}')">
    ${f}
  </button>
`).join('');

/**
 * Atualiza o filtro ativo e re-renderiza a grade de produtos.
 * @param {string} f - Nome do filtro selecionado (ex: 'Olhos', 'Todos').
 */
function setFilter(f) {
  activeFilter = f;

  // Percorre todos os botões de filtro e atualiza a classe "active"
  // apenas no botão cujo texto corresponde ao filtro clicado.
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === f);
  });

  // Atualiza os cards de produto com base no novo filtro.
  renderProducts();
}


// ─── RENDERIZAR PRODUTOS ─────────────────────────────────────
/**
 * Filtra os produtos pelo filtro ativo e redesenha toda a grade.
 * Para cada produto verifica se ele está no carrinho (inCart) e
 * nos favoritos (wished), alterando a aparência dos botões.
 */
function renderProducts() {
  // Se o filtro for "Todos", mostra tudo; caso contrário, filtra por categoria.
  const filtered = activeFilter === 'Todos'
    ? products
    : products.filter(p => p.cat === activeFilter);

  document.getElementById('productsGrid').innerHTML = filtered.map(p => {
    // Verifica se o produto já está no carrinho para exibir o botão correto.
    const inCart = !!cart[p.id];

    // Verifica se o produto está na wishlist para exibir o coração correto.
    const wished = wishlist.has(p.id);

    // Gera número aleatório de avaliações para simular dados reais.
    const reviewCount = Math.floor(Math.random() * 300 + 50);

    return `
    <div class="product-card">
      <div class="product-img" style="background:${p.bg}">
        <span style="filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4))">${p.emoji}</span>

        <!-- Badge de destaque (ex: "Novo", "Mais Vendido") — só renderiza se existir -->
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}

        <!-- Botão de favoritar: alterna entre coração cheio e vazio -->
        <button class="product-wish ${wished ? 'active' : ''}" onclick="toggleWish(${p.id})" title="Favoritar">
          ${wished ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-shade">${p.shade}</div>

        <!-- Estrelas preenchidas (★) e vazias (☆) baseadas na nota do produto -->
        <div class="product-stars">
          ${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)} (${reviewCount})
        </div>

        <div class="product-foot">
          <div class="product-price">
            R$ ${p.price.toFixed(2).replace('.', ',')}
            <!-- Preço antigo só aparece se o produto tiver desconto -->
            ${p.old ? `<span class="old">R$ ${p.old.toFixed(2).replace('.', ',')}</span>` : ''}
          </div>

          <!-- Botão muda de aparência e texto se o produto já está na sacola -->
          <button class="add-btn ${inCart ? 'in-cart' : ''}" onclick="toggleCartItem(${p.id})">
            ${inCart ? '✓ Na sacola' : '+ Adicionar'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// Renderiza os produtos logo ao carregar a página.
renderProducts();


// ─── LÓGICA DO CARRINHO ──────────────────────────────────────

/**
 * Adiciona ou remove um produto da sacola (toggle).
 * Se o produto já estiver no carrinho, é removido.
 * Se não estiver, é adicionado com quantidade inicial 1.
 * @param {number} id - ID do produto a ser alternado.
 */
function toggleCartItem(id) {
  const p = products.find(x => x.id === id);

  if (cart[id]) {
    // Produto já está na sacola → remove a entrada do objeto carrinho.
    delete cart[id];
    showToast(`"${p.name}" removido da sacola`);
  } else {
    // Produto não está na sacola → adiciona com spread do objeto
    // e define a quantidade inicial como 1.
    cart[id] = { ...p, qty: 1 };
    showToast(`✨ "${p.name}" adicionado!`);
  }

  // Atualiza a interface da sacola e os cards de produto.
  updateCartUI();
  renderProducts();
}

/**
 * Incrementa ou decrementa a quantidade de um produto na sacola.
 * A quantidade mínima é 1 (não permite ir a zero por aqui).
 * @param {number} id    - ID do produto.
 * @param {number} delta - Valor a somar: +1 para aumentar, -1 para diminuir.
 */
function addQty(id, delta) {
  // Segurança: ignora se o produto não existe no carrinho.
  if (!cart[id]) return;

  // Garante que a quantidade nunca fique abaixo de 1.
  cart[id].qty = Math.max(1, cart[id].qty + delta);

  // Caso (hipotético) chegue a 0, remove o item do carrinho.
  if (cart[id].qty === 0) delete cart[id];

  // Redesenha apenas a sacola (não precisa re-renderizar os cards).
  updateCartUI();
}

/**
 * Remove completamente um produto da sacola via botão de lixeira.
 * Diferente de toggleCartItem, esta função sempre remove — nunca adiciona.
 * @param {number} id - ID do produto a ser removido.
 */
function removeFromCart(id) {
  const p = products.find(x => x.id === id);

  // Remove a chave do objeto carrinho diretamente.
  delete cart[id];
  showToast(`"${p.name}" removido da sacola`);

  // Atualiza a sacola e re-renderiza os cards para refletir o botão "Adicionar".
  updateCartUI();
  renderProducts();
}

/**
 * Re-renderiza toda a interface da sacola lateral (drawer).
 * Atualiza: contador da navbar, lista de itens, subtotal, frete e total.
 * Se o carrinho estiver vazio, exibe o estado vazio.
 */
function updateCartUI() {
  // Converte o objeto carrinho em array para facilitar iterações.
  const items = Object.values(cart);

  // Conta o total de unidades (soma das quantidades de todos os itens).
  const count = items.reduce((soma, item) => soma + item.qty, 0);

  // Atualiza o badge numérico no botão da sacola na navbar.
  document.getElementById('cartCount').textContent = count;

  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');

  // Estado vazio: nenhum item na sacola.
  if (items.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛍️</span>
        <div>
          <p style="font-weight:600;margin-bottom:.4rem">Sua sacola está vazia</p>
          <p style="font-size:.85rem">Adicione produtos incríveis para começar!</p>
        </div>
      </div>`;

    // Esconde o rodapé com totais quando a sacola está vazia.
    foot.style.display = 'none';
    return; // Encerra a função aqui para não continuar renderizando.
  }

  // Gera o HTML de cada item da sacola com controles de quantidade e remoção.
  body.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-name">${item.name}</div>

        <!-- Preço multiplicado pela quantidade do item -->
        <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>

        <!-- Controles de quantidade: decrementar / exibir / incrementar -->
        <div class="qty-row">
          <button class="qty-btn" onclick="addQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="addQty(${item.id}, +1)">+</button>
        </div>
      </div>

      <!-- Botão de remover item completamente da sacola -->
      <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remover">🗑️</button>
    </div>
  `).join('');

  // Calcula o subtotal somando (preço × quantidade) de cada item.
  const subtotal = items.reduce((soma, item) => soma + item.price * item.qty, 0);

  // Frete grátis para compras acima de R$ 150; caso contrário, R$ 19,90.
  const freight = subtotal >= 150 ? 0 : 19.9;

  // Total final = subtotal + frete.
  const total = subtotal + freight;

  // Atualiza os textos de subtotal, frete e total no rodapé da sacola.
  document.getElementById('subtotalVal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('freightVal').textContent  = freight === 0
    ? 'Grátis 🎉'
    : `R$ ${freight.toFixed(2).replace('.', ',')}`;
  document.getElementById('totalVal').textContent    = `R$ ${total.toFixed(2).replace('.', ',')}`;

  // Torna o rodapé com os valores visível.
  foot.style.display = 'block';
}

/**
 * Abre ou fecha o drawer lateral da sacola e o overlay escurecido.
 * A classe "open" é adicionada/removida via classList.toggle,
 * e o CSS cuida da animação de deslizamento.
 */
function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');

  // Sempre atualiza a UI ao abrir a sacola para refletir o estado atual.
  updateCartUI();
}


// ─── WISHLIST (FAVORITOS) ────────────────────────────────────

/**
 * Adiciona ou remove um produto dos favoritos.
 * Usa um Set para garantir que cada id apareça no máximo uma vez.
 * @param {number} id - ID do produto a ser favoritado ou desfavoritado.
 */
function toggleWish(id) {
  if (wishlist.has(id)) {
    // Produto já está nos favoritos → remove do Set.
    wishlist.delete(id);
  } else {
    // Produto não está nos favoritos → adiciona ao Set.
    wishlist.add(id);
  }

  // Re-renderiza os cards para atualizar o ícone do coração.
  renderProducts();
}


// ─── TOAST (NOTIFICAÇÃO TEMPORÁRIA) ─────────────────────────
// Variável para armazenar o timer do toast, permitindo
// que chamadas rápidas reiniciem o temporizador corretamente.
let toastTimer;

/**
 * Exibe uma notificação temporária na parte inferior da tela.
 * A notificação desaparece automaticamente após 2,5 segundos.
 * Se chamada novamente antes do tempo, reinicia o contador.
 * @param {string} msg - Texto a ser exibido na notificação.
 */
function showToast(msg) {
  const t = document.getElementById('toast');

  // Define o texto e adiciona a classe que dispara a animação CSS de entrada.
  t.textContent = msg;
  t.classList.add('show');

  // Cancela qualquer timer anterior para evitar sobreposição de timeouts.
  clearTimeout(toastTimer);

  // Agenda a remoção da classe "show" após 2,5 segundos,
  // o que dispara a animação de saída via CSS.
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}


// ─── INICIALIZAÇÃO ───────────────────────────────────────────
// Renderiza o estado inicial da sacola (vazia) ao carregar a página,
// garantindo que o contador e o drawer estejam corretos desde o início.
updateCartUI();
