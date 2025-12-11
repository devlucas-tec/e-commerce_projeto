package com.ecommerce.projeto_ecommerce.service;

import com.ecommerce.projeto_ecommerce.model.Produto;
import com.ecommerce.projeto_ecommerce.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service 
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> findAll() {
        // FUTURAMENTE: Adicionar lógica de paginação ou ordenação.
        return produtoRepository.findAll();
    }


    public Optional<Produto> findById(Long id) {
        return produtoRepository.findById(id);
    }

    public Produto save(Produto produto) {

        return produtoRepository.save(produto);
    }


    public void deleteById(Long id) {
        produtoRepository.deleteById(id);
    }
}