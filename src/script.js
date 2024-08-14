// GLOBAL

function logar() {
    let emailInput = document.querySelector('#txtemail')
    let senhaInput = document.querySelector('#txtsenha')

    let usuarios = JSON.parse(localStorage.getItem('users'))
    let emailData = usuarios.email
    let senhaData = usuarios.password

    if (emailInput.value !== emailData || senhaInput.value !== senhaData) {
        alert('E-mail ou senha inválidos!')
    } else {
        let v = 'true'
        localStorage.setItem("log", JSON.stringify(v))

        window.location.href = "perfil.html"
    }
}

function isLogged() {
    let log = JSON.parse(localStorage.getItem("log"))

    if (log == 'true') {
        return true
    } else {
        return false
    }
}

function logP() {
    if (isLogged()) {
        window.location.href = "perfil.html"
    } else {
        window.alert('Você não está logado!')
        window.location.href = "login.html"
    }
}

function logL() {
    if (isLogged()) {
        alert('Você já está logado!')
        window.location.href = "perfil.html"
    } else {
        window.location.href = "login.html"
    }
}

function logC() {
    if (isLogged()) {
        alert('Você já está logado!')
        window.location.href = "perfil.html"
    } else {
        window.location.href = "cadastro.html"
    }
}



// CADASTRO

let nome = document.querySelector('#nome')
let sobrenome = document.querySelector('#sobrenome')
let bday = document.querySelector('#nascimento')
let cpf = document.querySelector('#cpf')
let email = document.querySelector('#email')
let senha = document.querySelector('#senha1')
let cSenha = document.querySelector('#senha2')
let rua = document.querySelector('#rua')
let bairro = document.querySelector('#bairro')
let complemento = document.querySelector('#complemento')
let numero = document.querySelector('#numero')
let cidade = document.querySelector('#cidade')
let ref = document.querySelector('#ref')
let presCon = document.getElementsByName('prescon')
let funcao = ''
let inp = document.getElementsByTagName('input')
let main = document.querySelector('#formulario')

function cadastrar() {

    let campos = [
        document.querySelector('#nome').value,
        document.querySelector('#sobrenome').value,
        document.querySelector('#nascimento').value,
        document.querySelector('#cpf').value,
        document.querySelector('#email').value,
        document.querySelector('#senha1').value,
        document.querySelector('#senha2').value,
        document.querySelector('#rua').value,
        document.querySelector('#bairro').value,
        document.querySelector('#complemento').value,
        document.querySelector('#numero').value,
        document.querySelector('#cidade').value,
        document.querySelector('#ref').value,
        document.getElementsByName('prescon').value
    ]

    let passwordIsValid = campos[5] === campos[6] ? true : false

    function isNull(element, index, array) {
        return element == ""
    }


    if (campos.some(isNull)) {
        alert("Há campos vazios!");
    } else if (!passwordIsValid) {
        alert("Senha não confere! Tente novamente.");
    } else {

        let user = {
            name: campos[0],
            lastName: campos[1],
            bday: campos[2],
            cpf: campos[3],
            email: campos[4],
            password: campos[5],
            rua: campos[7],
            bairro: campos[8],
            complemento: campos[9],
            numero: campos[10],
            cidade: campos[11],
            ref: campos[12],
            function: ''
        }


        if (presCon[0].checked) {
            user.function = "Prestar";
        } else if (presCon[1].checked) {
            user.function = "Contratar";
        }
        localStorage.setItem("users", JSON.stringify(user));
        main.innerHTML = `
            <div style="text-align: center;" >
                <h1>Cadastro concluído!</h1>
                <p>Clique no botão abaixo para concluir a criação de seu perfil</p>
                <a href="concluirPerfil.html"><button type="button">Próximo</button></a> 
            </div>
        `
    }

}


// CONCLUIR PERFIL


function fProfile() {

    let uName = document.querySelector('#username')
    let desc = document.querySelector('#desc')

    let res = document.querySelector('.perfil')


    if (uName.value.length == 0 || desc.value.length == 0) {
        alert('Preencha todos os campos!')
    } else {
        let prof = {
            username: '@'+uName.value,
            descricao: desc.value
        }
        localStorage.setItem("profile", JSON.stringify(prof))

        res.innerHTML = `
            <div style="text-align: center;">
                <h1>Perfil concluído!</h1>
                <br>
                <p>Faça login para acessar seu perfil.</p>
                <a href="login.html"><button type="button" class="button">Fazer login</button></a>
            </div>
        `
    }
}

// PERFIL



function loadProfile() {
    let userData = JSON.parse(localStorage.getItem("users"))
    let profileData = JSON.parse(localStorage.getItem("profile"))


    let profile = document.querySelector('.pessoal') 

    profile.innerHTML = `
        <h1 id="profileName">${userData.name} ${userData.lastName}</h1>
        <br>
        <h2 id="profileUsername">${profileData.username}</h2>
        <br>
        <h3 id="profileEmail">${userData.email}</h3>
        <br>
        <p id="profileDesc">${profileData.descricao}</p>
    `  
}
loadProfile()



function logout() {
    localStorage.removeItem("log")
    window.location.href = "index.html"
}


// CONSOLE FUNCTIONS

function slogin() {
    let userData = JSON.parse(localStorage.getItem("users"))
    console.log(`E-mail: ${userData.email}\nSenha: ${userData.password}`)
}

function cldb() {
    localStorage.removeItem("users")
    localStorage.removeItem("profile")
    localStorage.removeItem("log")
}

function isSupValid() {
    let field = {
        name: document.querySelector("#name").value.trim(),
        email: document.querySelector("#email").value.trim(),
        phone: document.querySelector("#phone").value.trim(),
        message: document.querySelector("#message").value.trim(),
    };
    

    if (field.name == 0 || field.email == 0 || field.phone == 0 || field.message == 0) {
        return false
    } else {
        return true
    }
}

function sendMail() {
    // Coleta os valores dos campos do formulário
    
    if (isSupValid() == false) {
        alert('Preencha todos os campos!')
    } else if (isSupValid() == true) {
        let params = {
        name: document.querySelector("#name").value.trim(),
        email: document.querySelector("#email").value.trim(),
        phone: document.querySelector("#phone").value.trim(),
        message: document.querySelector("#message").value.trim(),
        };
        
        emailjs.send("service_yucntkr", "template_gdq9hum", params)
            .then(function(response) {
                // E-mail enviado com sucesso
                alert('E-mail enviado com sucesso!');
                window.location.href = "suporte.html";
            }, function(error) {
                // Erro ao enviar o e-mail
                alert('[ERRO] Algo deu errado! Por favor, tente novamente.');
                window.location.href = "suporte.html";
            });

    } else {
        alert('[ERRO] Algo deu errado! Por favor, tente novamente.')
        window.location.href = "suporte.html"
    }

    
  }