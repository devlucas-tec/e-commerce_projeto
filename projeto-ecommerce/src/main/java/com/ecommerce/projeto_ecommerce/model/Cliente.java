package com.ecommerce.projeto_ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data // Gera Getters, Setters, toString, hashCode, equals (Lombok)
@NoArgsConstructor // Construtor sem argumentos (Lombok)
@AllArgsConstructor // Construtor com todos os argumentos (Lombok)
@Entity // Marca como Entidade JPA
@Table(name = "cliente") // Nome da tabela no banco
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    // O email deve ser único no banco de dados
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    // A senha será criptografada (hash) antes de ser salva
    @Column(nullable = false, length = 255, name = "senha_hash") 
    private String senha;

    @Column(length = 20)
    private String telefone;

    @Column(name = "data_cadastro", nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "data_atualizacao", nullable = false)
    private LocalDateTime dataAtualizacao;

    // Métodos de Callback do JPA para gerenciar datas automaticamente
    @PrePersist
    protected void onCreate() {
        this.dataCadastro = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.dataAtualizacao = LocalDateTime.now();
    }
}