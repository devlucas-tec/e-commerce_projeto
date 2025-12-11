package com.ecommerce.projeto_ecommerce.repository;

import com.ecommerce.projeto_ecommerce.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository 
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    // Exemplo de Query Method: Spring gera a query SQL automaticamente
    // Futuramente, podemos usar para buscar produtos para a página inicial (index.html)
    List<Produto> findByEstoqueGreaterThan(Integer estoqueMinimo);
    
    // Podemos adicionar outros métodos de busca aqui, se necessário.
}