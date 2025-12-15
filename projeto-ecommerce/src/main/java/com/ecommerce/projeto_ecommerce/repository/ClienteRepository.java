package com.ecommerce.projeto_ecommerce.repository;

import com.ecommerce.projeto_ecommerce.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    /**
     * Método que busca um Cliente pelo seu email.
     * O Spring Data JPA cria a implementação deste método automaticamente
     * baseando-se no nome "findByEmail".
     *
     * @param email O email a ser buscado.
     * @return Um Optional contendo o objeto Cliente, se encontrado.
     */
    Optional<Cliente> findByEmail(String email);
}