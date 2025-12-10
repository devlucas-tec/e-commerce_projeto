const ProductsModule = (() => {
    const mockProducts = [
        { id: 1, nome: "Smartwatch Pro A1", preco: 750.00, vendedor: "Tech Gadgets", imagem: "https://via.placeholder.com/250x200?text=Smartwatch" },
        { id: 2, nome: "Tênis Esportivo Runner 2.0", preco: 320.50, vendedor: "Moda Ativa", imagem: "https://via.placeholder.com/250x200?text=Tenis" },
        { id: 3, nome: "Conjunto de Panelas Premium", preco: 499.90, vendedor: "Casa & Conforto", imagem: "https://via.placeholder.com/250x200?text=Panelas" },
        { id: 4, nome: "Fone Bluetooth Cancelamento de Ruído", preco: 980.00, vendedor: "Audio Max", imagem: "https://via.placeholder.com/250x200?text=Fone" },
    ];

    const createProductCard = (produto) => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        return `
            <div class="produto-card">
                <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
                <div class="produto-info">
                    <h3 class="produto-nome">${produto.nome}</h3>
                    <p class="produto-preco">${precoFormatado}</p>
                    <span class="produto-vendedor">Vendido por: ${produto.vendedor}</span>
                </div>
                <button class="btn-carrinho" data-produto-id="${produto.id}">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
    };

    const handleAddToCart = (event) => {
        const produtoId = parseInt(event.target.dataset.produtoId);
        
        if (typeof CarrinhoModule !== 'undefined' && CarrinhoModule.adicionar) {
            CarrinhoModule.adicionar(produtoId, 1); 
            alert(`Produto ID ${produtoId} adicionado ao carrinho!`);
        } else {
            console.error("CarrinhoModule não encontrado. Verifique a ordem dos scripts no index.html.");
            alert("Erro: Módulo do Carrinho indisponível.");
        }
    };
    
    const addCartButtonListeners = () => {
        const buttons = document.querySelectorAll('.btn-carrinho');
        buttons.forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });
    };
    
    const loadProducts = () => {
        const container = document.getElementById('lista-produtos');
        if (container) {
            container.innerHTML = mockProducts.map(createProductCard).join('');
            addCartButtonListeners();
        }
    };

    const init = () => {
        loadProducts();
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', ProductsModule.init);