const CarrinhoModule = (() => {

    // Dados simulados do carrinho (futuramente serão obtidos do Spring Boot)
    let carrinhoItens = [
        // id_produto_fk, quantidade
        { id: 1, nome: "Smartwatch Pro A1", preco: 750.00, quantidade: 2 },
        { id: 3, nome: "Conjunto de Panelas Premium", preco: 499.90, quantidade: 1 },
    ];

    const calcularSubtotalItem = (preco, quantidade) => {
        return preco * quantidade;
    };

    /**
     * Cria o HTML para um único item na lista do carrinho.
     */
    const criarHtmlItem = (item) => {
        const subtotal = calcularSubtotalItem(item.preco, item.quantidade);
        const precoUnitarioFormatado = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const subtotalFormatado = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        return `
            <div class="item-card" data-produto-id="${item.id}">
                <img src="https://via.placeholder.com/80x80?text=Prod+${item.id}" alt="${item.nome}" class="item-imagem">
                <div class="item-detalhes">
                    <h3 class="item-nome">${item.nome}</h3>
                    <p class="item-preco-unitario">${precoUnitarioFormatado} (Unitário)</p>
                </div>
                
                <div class="item-quantidade">
                    <label for="qtd-produto-${item.id}">Qtd:</label>
                    <input type="number" id="qtd-produto-${item.id}" value="${item.quantidade}" min="1" class="input-quantidade">
                    <button class="btn-atualizar" data-produto-id="${item.id}">Atualizar</button>
                </div>

                <div class="item-subtotal">
                    ${subtotalFormatado}
                </div>

                <button class="btn-remover" data-produto-id="${item.id}">Remover</button>
            </div>
        `;
    };

    const renderizarResumo = () => {
        const subtotalElement = document.getElementById('subtotal');
        const totalGeralElement = document.getElementById('total-geral');
        const freteElement = document.getElementById('frete');
        
        let subtotal = 0;
        carrinhoItens.forEach(item => {
            subtotal += calcularSubtotalItem(item.preco, item.quantidade);
        });
        
        // Simulação do Frete (valor fixo por enquanto)
        const frete = carrinhoItens.length > 0 ? 50.00 : 0.00; 
        const totalGeral = subtotal + frete;

        const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        if (subtotalElement) subtotalElement.textContent = formatarMoeda(subtotal);
        if (freteElement) freteElement.textContent = formatarMoeda(frete);
        if (totalGeralElement) totalGeralElement.textContent = formatarMoeda(totalGeral);
    };

    const configurarEventListeners = () => {
        const listaContainer = document.getElementById('lista-carrinho');
        const btnFinalizar = document.querySelector('.btn-finalizar-compra');

        if (listaContainer) {
            listaContainer.addEventListener('click', (e) => {
                const produtoId = e.target.dataset.produtoId;
                
                if (e.target.classList.contains('btn-remover')) {
                    removerItem(parseInt(produtoId));
                }
                
                if (e.target.classList.contains('btn-atualizar')) {
                    const input = document.getElementById(`qtd-produto-${produtoId}`);
                    if (input) {
                        atualizarQuantidade(parseInt(produtoId), parseInt(input.value));
                    }
                }
            });
        }
        
        if (btnFinalizar) {
            btnFinalizar.addEventListener('click', () => {
                alert("Simulando Finalizar Compra! (Próxima etapa: Checkout)");
                // FUTURAMENTE: Redirecionar para a página de Checkout, enviando os dados do carrinho.
            });
        }
    };

    // ----------------------------------------------------
    // 3. FUNÇÕES PÚBLICAS
    // ----------------------------------------------------
    
    /**
     * Renderiza o carrinho completo na interface.
     */
    const renderizarCarrinho = () => {
        const container = document.getElementById('lista-carrinho');
        
        if (container) {
            if (carrinhoItens.length === 0) {
                container.innerHTML = '<p>Seu carrinho está vazio!</p>';
            } else {
                container.innerHTML = carrinhoItens.map(criarHtmlItem).join('');
            }
        }
        
        renderizarResumo();
        configurarEventListeners(); // Reconfigura após a renderização
    };
    
    /**
     * Remove um item do carrinho.
     */
    const removerItem = (produtoId) => {
        // FUTURAMENTE: Fazer requisição DELETE para o Spring Boot
        carrinhoItens = carrinhoItens.filter(item => item.id !== produtoId);
        console.log(`Produto ${produtoId} removido.`);
        renderizarCarrinho();
    };
    
    /**
     * Atualiza a quantidade de um item no carrinho.
     */
    const atualizarQuantidade = (produtoId, novaQuantidade) => {
        // FUTURAMENTE: Fazer requisição PUT para o Spring Boot
        const item = carrinhoItens.find(i => i.id === produtoId);
        if (item && novaQuantidade >= 1) {
            item.quantidade = novaQuantidade;
            console.log(`Quantidade do Produto ${produtoId} atualizada para ${novaQuantidade}.`);
            renderizarCarrinho();
        }
    };
    
    // Inicialização do módulo
    const init = () => {
        renderizarCarrinho();
        // Nota: O módulo de produtos deve ter uma função para chamar adicionarItem aqui
    };

    // Retorna a API pública
    return {
        init: init,
        remover: removerItem,
        atualizar: atualizarQuantidade,
        // AdicionarItem também seria exportada, mas por enquanto será apenas simulada no produtos.js
    };
})();

// Inicia o módulo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', CarrinhoModule.init);