const AuthModule = (() => {
    
    const handleLogin = async (event) => {
        event.preventDefault(); 

        const form = event.target;
        const email = form.querySelector('#email').value;
        const senha = form.querySelector('#senha').value;
        
        console.log(`Tentativa de Login para: ${email}`);

        // FUTURAMENTE: Aqui seria realizada a requisição fetch() para o Spring Boot
        
        // SIMULAÇÃO:
        if (email === "teste@email.com" && senha === "123456") {
             alert("Login SIMULADO bem-sucedido! Redirecionando...");
             window.location.href = 'index.html';
        } else {
             alert("Login SIMULADO falhou. E-mail ou senha incorretos.");
        }
    };
    
    const handleCadastro = async (event) => {
        event.preventDefault(); 

        const form = event.target;
        const nome = form.querySelector('#nome').value;
        const email = form.querySelector('#email-cadastro').value;
        const senha = form.querySelector('#senha-cadastro').value;
        const telefone = form.querySelector('#telefone').value; 
        
        console.log(`Tentativa de Cadastro para: ${nome} (${email})`);
        
        // FUTURAMENTE: Aqui seria realizada a requisição fetch() para o Spring Boot
        
        // SIMULAÇÃO:
        alert(`Cadastro SIMULADO concluído para ${nome}! Redirecionando para o login...`);
        window.location.href = 'login.html';
    };

    const configurarEventListeners = () => {
        const loginForm = document.getElementById('login-form');
        const cadastroForm = document.getElementById('cadastro-form');
        
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        if (cadastroForm) {
            cadastroForm.addEventListener('submit', handleCadastro);
        }
    };

    const init = () => {
        configurarEventListeners();
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', AuthModule.init);