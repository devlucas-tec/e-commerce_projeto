package com.ecommerce.projeto_ecommerce.service;

import com.ecommerce.projeto_ecommerce.model.Cliente;
import com.ecommerce.projeto_ecommerce.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service 
public class ClienteService {

    @Autowired 
    private ClienteRepository clienteRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; 

    public Cliente salvarCliente(Cliente cliente) {
        
        Optional<Cliente> clienteExistente = clienteRepository.findByEmail(cliente.getEmail());
        if (clienteExistente.isPresent()) {
            throw new RuntimeException("E-mail já cadastrado: " + cliente.getEmail());
        }

        String senhaCriptografada = passwordEncoder.encode(cliente.getSenha());
        cliente.setSenha(senhaCriptografada);

        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> buscarClientePorEmail(String email) {
        return clienteRepository.findByEmail(email);
    }
}