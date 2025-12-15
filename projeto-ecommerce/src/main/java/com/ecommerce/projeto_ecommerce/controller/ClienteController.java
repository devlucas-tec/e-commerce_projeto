package com.ecommerce.projeto_ecommerce.controller;

import com.ecommerce.projeto_ecommerce.model.Cliente;
import com.ecommerce.projeto_ecommerce.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    // Garante que o Spring injete o ClienteService
    @Autowired 
    private ClienteService clienteService; 

    // Mapeamento para POST /api/clientes/cadastro
    @PostMapping("/cadastro")
    public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente cliente) {
        
        // Verifica se a senha e o email foram fornecidos no corpo da requisição
        if (cliente.getEmail() == null || cliente.getSenha() == null) {
             // Se faltar algum dado essencial, retorna um erro 400 Bad Request
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
        }
        
        try {
            // Chama o Service para criptografar e salvar
            Cliente novoCliente = clienteService.salvarCliente(cliente);
            return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
        } catch (Exception e) {
            // Em caso de exceção (ex: email já existe), retorna 500
            // O log exato aparecerá no seu console.
            System.err.println("Erro ao salvar cliente: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}