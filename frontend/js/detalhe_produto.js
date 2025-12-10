const DetalheProdutoModule = (() => {
    // Dados de produto simulados (futuramente virão das tabelas Produto e Vendedor)
    const mockProduto = {
        id: 101,
        nome: "Smartphone XYZ Ultra (256GB, Preto)",
        preco: 2999.00,
        descricao: "O mais novo lançamento com câmera tripla, bateria de longa duração e design ergonômico. Perfeito para fotos profissionais e uso diário intenso.",
        estoque: 25,
        vendedorNome: "Tech Vendas",
        vendedorId: 5,
        imagemPrincipal: "https://via.placeholder.com/600x600?text=Smartphone+Principal"
    };

    // Dados de avaliações simulados (futuramente virão da tabela Avaliacao e Cliente)
    let mockAvaliacoes = [
        { id: 1, nota: 5, comentario: "Produto chegou super rápido e a qualidade da câmera é impressionante!", autor: "João M.", data: "05/12/2025" },
        { id: 2, nota: 4, comentario: "Muito bom, apenas achei a bateria um pouco menor do que o esperado. Mas vale o preço.", autor: "Maria S.", data: "01/12/2025" },
        { id: 3, nota: 5, comentario: "Exatamente como descrito, ótima performance!", autor: "Carlos A.", data: "28/11/2025" },
    ];
    
    const calcularMediaAvaliacoes = () => {
        if (mockAvaliacoes.length === 0) return { media: 0, total: 0 };
        
        const somaNotas = mockAvaliacoes.reduce((acc, avaliacao) => acc + avaliacao.nota, 0);
        const media = (somaNotas / mockAvaliacoes.length).toFixed(1);
        
        return { media: media, total: mockAvaliacoes.length };
    };
    
    const criarHtmlAvaliacao = (avaliacao) => {
        return `
            <article class="avaliacao-card">
                <p class="avaliacao-autor">Por: ${avaliacao.autor}</p>
                <p class="avaliacao-nota">Nota: <strong class="nota-destaque">${avaliacao.nota}/5</strong></p>
                <p class="avaliacao-comentario">"${avaliacao.comentario}"</p>
                <span class="avaliacao-data">Publicado em: ${avaliacao.data}</span>
            </article>
        `;
    };

    const configurarEventListeners = () => {
        const btnComprar = document.querySelector('.btn-comprar');
        const btnAddCarrinho = document.querySelector('.btn-carrinho-add');
        const inputQuantidade = document.getElementById('quantidade');

        if (btnAddCarrinho) {
            btnAddCarrinho.addEventListener('click', () => {
                const quantidade = parseInt(inputQuantidade.value);
                // FUTURAMENTE: Chamar CarrinhoModule.adicionar(mockProduto.id, quantidade)
                alert(`SIMULADO: ${quantidade}x ${mockProduto.nome} adicionado ao carrinho!`);
            });
        }
        
        if (btnComprar) {
            btnComprar.addEventListener('click', () => {
                const quantidade = parseInt(inputQuantidade.value);
                alert(`SIMULADO: Comprando ${quantidade}x ${mockProduto.nome} agora!`);
            });
        }
    };
    
    const renderizarProduto = () => {
        const precoFormatado = mockProduto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        document.getElementById('imagem-principal').src = mockProduto.imagemPrincipal;
        document.getElementById('produto-nome').textContent = mockProduto.nome;
        document.getElementById('produto-preco').textContent = precoFormatado;
        document.getElementById('produto-descricao').textContent = mockProduto.descricao;
        document.getElementById('produto-estoque').innerHTML = `Em estoque (${mockProduto.estoque} unidades)`;
        document.getElementById('link-vendedor').textContent = mockProduto.vendedorNome;
        document.getElementById('link-vendedor').href = `/vendedor/${mockProduto.vendedorId}`;
    };

    const renderizarAvaliacoes = () => {
        const listaAvaliacoesContainer = document.getElementById('lista-avaliacoes');
        const resumoMedia = calcularMediaAvaliacoes();
        
        if (listaAvaliacoesContainer) {
            listaAvaliacoesContainer.innerHTML = mockAvaliacoes.map(criarHtmlAvaliacao).join('');
        }
        
        const mediaElement = document.querySelector('.nota-media');
        const destaqueElement = document.querySelector('.nota-media-destaque');
        const linkAvaliacoes = document.querySelector('.produto-avaliacao-resumo a');
        
        if (mediaElement) mediaElement.textContent = `${resumoMedia.media} / 5.0`;
        if (destaqueElement) destaqueElement.textContent = resumoMedia.media;
        if (linkAvaliacoes) linkAvaliacoes.textContent = `(Ver ${resumoMedia.total} avaliações)`;
    };

    const init = () => {
        renderizarProduto();
        renderizarAvaliacoes();
        configurarEventListeners();
    };

    // Retorna a API pública
    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', DetalheProdutoModule.init);