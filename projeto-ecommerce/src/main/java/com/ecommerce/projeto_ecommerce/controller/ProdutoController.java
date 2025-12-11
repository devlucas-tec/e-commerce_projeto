package com.ecommerce.projeto_ecommerce.controller;

import com.ecommerce.projeto_ecommerce.model.Produto;
import com.ecommerce.projeto_ecommerce.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*") 
public class ProdutoController {

    private final ProdutoService produtoService;

    @Autowired
    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    // ----------------------------------------------------
    // ENDPOINTS CRUD
    // ----------------------------------------------------


    @GetMapping
    public List<Produto> getAllProdutos() {
        return produtoService.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
        return produtoService.findById(id)
                .map(ResponseEntity::ok) 
                .orElse(ResponseEntity.notFound().build()); 
    }

    @PostMapping
    public Produto createProduto(@RequestBody Produto produto) {
        return produtoService.save(produto);
    }
    
    // FUTURAMENTE: Adicionaremos PUT e DELETE
}