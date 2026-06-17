# 💄 VELOUR Beauty & Glamour

## 📖 Sobre o Projeto

O **VELOUR Beauty & Glamour** é um projeto desenvolvido para a disciplina de **Programação Web**, com o objetivo de aplicar conceitos fundamentais de desenvolvimento Front-End utilizando **HTML5**, **CSS3** e **JavaScript**.

A aplicação simula uma loja virtual de cosméticos e produtos de beleza, oferecendo uma experiência moderna e interativa para os usuários. O projeto foi desenvolvido sem o uso de frameworks, permitindo explorar na prática conceitos como manipulação do DOM, eventos, gerenciamento de estado e responsividade.

---

## 🎯 Objetivos do Projeto

- Aplicar conceitos de Programação Web.
- Desenvolver uma interface moderna e responsiva.
- Trabalhar com manipulação dinâmica de elementos HTML.
- Implementar funcionalidades comuns em e-commerces.
- Praticar organização de código e boas práticas de desenvolvimento Front-End.

---

## 🚀 Funcionalidades

### 🛍️ Catálogo de Produtos
- Exibição dinâmica dos produtos.
- Informações como:
  - Nome
  - Marca
  - Preço
  - Avaliação
  - Categoria

### 🔍 Filtros de Categoria
O usuário pode filtrar produtos por:

- Todos
- Rosto
- Olhos
- Lábios
- Glow

### ❤️ Lista de Favoritos (Wishlist)
- Adicionar produtos aos favoritos.
- Remover produtos dos favoritos.
- Alteração visual do botão de coração.

### 🛒 Carrinho de Compras
- Adicionar produtos.
- Remover produtos.
- Alterar quantidade.
- Cálculo automático do subtotal.
- Cálculo de frete.
- Cálculo do valor total.

### 🔔 Sistema de Notificações
- Exibe mensagens quando:
  - Um produto é adicionado.
  - Um produto é removido.
  - Outras ações importantes acontecem.

### 📱 Responsividade
- Layout adaptado para:
  - Computadores
  - Tablets
  - Smartphones

### ✨ Animações e Efeitos Visuais
- Hover em botões.
- Cards interativos.
- Drawer lateral para o carrinho.
- Toasts animados.
- Gradientes modernos.

---

# 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|------------|---------|
| HTML5 | Estrutura da página |
| CSS3 | Estilização e responsividade |
| JavaScript (Vanilla JS) | Interatividade e lógica da aplicação |
| Google Fonts | Tipografia personalizada |

---

# 📂 Estrutura do Projeto

```text
VELOUR/
│
├── index.html
│
└── (CSS e JavaScript incorporados no mesmo arquivo)
```

---

# ⚙️ Como Funciona o Projeto

## 1. Estrutura HTML

O HTML é responsável pela construção dos componentes da página:

- Navbar
- Hero Section
- Categorias
- Produtos
- Banner promocional
- Footer
- Carrinho lateral
- Sistema de notificações

Exemplo:

```html
<nav>
  <span class="nav-logo">VELOUR</span>
</nav>
```

---

## 2. Estilização com CSS

O CSS define:

- Paleta de cores
- Gradientes
- Layout responsivo
- Animações
- Efeitos visuais

Exemplo:

```css
:root {
  --rose: #E8507A;
  --violet: #9B4DCA;
  --deep: #1A0A2E;
}
```

---

## 3. Dados do Sistema

Os produtos e categorias são armazenados em arrays JavaScript.

### Categorias

```javascript
const categories = [
  {
    icon: '💄',
    name: 'Batons',
    count: 48
  }
];
```

### Produtos

```javascript
const products = [
  {
    id: 1,
    name: 'Batom Líquido Matte Ultra',
    price: 89
  }
];
```

---

## 4. Renderização Dinâmica

Ao carregar a página, o JavaScript cria automaticamente:

- Categorias
- Produtos
- Filtros

Função principal:

```javascript
renderProducts();
```

Essa função percorre os produtos e gera os cards dinamicamente.

---

## 5. Sistema de Filtros

Quando o usuário seleciona uma categoria:

```javascript
setFilter('Olhos');
```

O sistema:

1. Atualiza o filtro ativo.
2. Filtra os produtos.
3. Atualiza a interface.

---

## 6. Sistema de Favoritos

Os favoritos são armazenados utilizando um **Set**.

```javascript
let wishlist = new Set();
```

Ao clicar no coração:

```javascript
toggleWish(id);
```

O produto é adicionado ou removido da lista.

---

## 7. Sistema de Carrinho

O carrinho é armazenado em um objeto JavaScript:

```javascript
let cart = {};
```

Exemplo:

```javascript
{
  1: {
    id: 1,
    name: "Batom",
    qty: 2
  }
}
```

---

## 8. Adicionar Produto

Quando o usuário clica em:

```javascript
toggleCartItem(id);
```

O sistema:

- Localiza o produto.
- Adiciona ao carrinho.
- Atualiza a interface.
- Exibe uma notificação.

---

## 9. Alteração de Quantidade

Botões:

```javascript
addQty(id, +1);
addQty(id, -1);
```

Permitem:

- Aumentar quantidade.
- Diminuir quantidade.
- Atualizar total automaticamente.

---

## 10. Cálculo de Valores

### Subtotal

```javascript
subtotal = preço × quantidade
```

### Frete

```javascript
subtotal >= 150
? Frete grátis
: R$ 19,90
```

### Total

```javascript
total = subtotal + frete
```

---

## 11. Carrinho Lateral (Drawer)

O carrinho é aberto através da função:

```javascript
toggleCart();
```

Ela adiciona ou remove a classe:

```css
.open
```

Criando a animação de abertura lateral.

---

## 12. Sistema de Toast

As notificações são exibidas pela função:

```javascript
showToast("Produto adicionado!");
```

Exemplo:

```javascript
showToast(`✨ Produto adicionado!`);
```

As mensagens desaparecem automaticamente após alguns segundos.

---

# 📚 Conceitos de Programação Web Aplicados

Durante o desenvolvimento foram utilizados conceitos como:

- HTML Semântico
- CSS Responsivo
- Flexbox
- Grid Layout
- Manipulação do DOM
- Eventos JavaScript
- Arrays
- Objetos
- Sets
- Funções
- Template Literals
- Arrow Functions
- Renderização Dinâmica
- Estado Global da Aplicação

---

# 🎨 Design

A identidade visual foi inspirada em marcas modernas de beleza e maquiagem.

Características:

- Tons de rosa e violeta
- Gradientes vibrantes
- Tipografia elegante
- Interface minimalista
- Experiência premium

---

# ▶️ Como Executar

1. Faça o download do projeto.
2. Extraia os arquivos.
3. Abra o arquivo:

```text
index.html
```

4. O projeto será executado diretamente no navegador.

Não é necessário instalar dependências ou utilizar servidor local.

---

# 👨‍💻 Autor

Projeto desenvolvido por **[Seu Nome]** para a disciplina de **Programação Web**.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e acadêmicos.
