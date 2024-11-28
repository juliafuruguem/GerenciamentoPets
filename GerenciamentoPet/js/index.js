// Receber o botão cadastrar do HTML
const botaoSalvar = document.getElementById('cadastrar')
const botaoLimpar = document.getElementById('limpar')

// Receber os dados do formulário
const getDadosPet = function() {
    let petJSON = {}
    let status = true

    // Recebe das caixas do HTML os dados a serem enviados para a API
    let nomePet = document.getElementById('nome')
    let corPet = document.getElementById('cor')
    let racaPet = document.getElementById('raca')
    let imagePet = document.getElementById('image')

    if (nomePet.value === '' || corPet.value === '' || racaPet.value === '' || imagePet.value === '') {
        alert('Todos os campos devem ser preenchidos.')
        status = false
    } else {
        // Criamos um objeto JSON com os atributos necessários
        petJSON.nome = nomePet.value
        petJSON.cor = corPet.value
        petJSON.raca = racaPet.value
        petJSON.image = imagePet.value
    }

    if (status) {
        return petJSON
    } else {
        return false
    }
};

// Função para salvar um pet
const postPet = async function(dadosPets) {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/novo/pet'

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosPets)
    })

    if (response.status == 201) {
        alert('Seu pet foi cadastrado com sucesso!');
        getPet()
    } else {
        alert('Não foi possível cadastrar o seu pet, verifique os dados.')
    }
};

// Função para alterar o cadastro do pet
const putPet = async function(dadosPets) {
    let id = sessionStorage.getItem('idPet');
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/atualizar/pet/${id}`

    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosPets)
    });

    if (response.status == 200) {
        alert('Registro do pet atualizado com sucesso!')
        getPet()
    } else {
        alert('Não foi possível atualizar os dados do seu pet, verifique os dados digitados.')
    }
}

// Função para excluir um pet
const deletePet = async function(id) {
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/excluir/pet/${id}`

    let response = await fetch(url, {
        method: 'DELETE'
    })

    if (response.status == 200) {
        alert('Registro do pet excluído com sucesso!')
        getPet();  // Atualiza a lista após exclusão
    } else {
        alert('Não foi possível excluir seu pet, verifique os dados digitados');
    }
}

// Função para listar todos os pets
const getPet = async function() {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/listar/pets'

    let response = await fetch(url)
    let dados = await response.json()
    setListItens(dados);//Chama a função para mostrar a lista   
};

// Função para criar a lista de pets no HTML
const setListItens = function(dadosPets) {
    let divListDados = document.getElementById('listDados')

    // Limpa a lista antes de carregar novamente
    divListDados.innerHTML = ''
console.log(dadosPets)
    // Adiciona cada item da lista na tela
    dadosPets.pets.forEach(function(item) {
        let divDados = document.createElement('div')
        let divNome = document.createElement('div')
        let divCor = document.createElement('div')
        let divRaca = document.createElement('div')        
        let divOpcoes = document.createElement('div')
        let spanEditar = document.createElement('span')
        let spanExcluir = document.createElement('span')
        let imgEditar = document.createElement('img')
        let imgExcluir = document.createElement('img')

        divNome.innerText = item.nome
        divCor.innerText = item.cor
        divRaca.innerText = item.raca        

        divDados.setAttribute('id', 'dados')
        divDados.setAttribute('class', 'linha dados')        
        imgEditar.setAttribute('src', 'image/editar.png')
        imgExcluir.setAttribute('src', 'image/excluir.png')

        imgEditar.setAttribute('idPet', item.id)
        imgExcluir.setAttribute('idPet', item.id)

        // Adiciona os elementos à estrutura de exibição
        divListDados.appendChild(divDados)
        divDados.appendChild(divNome)
        divDados.appendChild(divCor)
        divDados.appendChild(divRaca)        
        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        divOpcoes.appendChild(spanExcluir)
        spanEditar.appendChild(imgEditar)
        spanExcluir.appendChild(imgExcluir)

        // Ações para editar e excluir
        imgExcluir.addEventListener('click', function() {
            let id = imgExcluir.getAttribute('idPet')
            let resposta = confirm('Deseja realmente excluir seu pet?')
            if (resposta) {
                deletePet(id)
            }
        })

        imgEditar.addEventListener('click', function() {
            let id = imgEditar.getAttribute('idPet')
            getBuscarPet(id)
        })
    })
}

// Função para buscar um pet pelo ID
const getBuscarPet = async function(id) {
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/buscar/pet/${id}`

    let response = await fetch(url)
    let dados = await response.json()

    if (response.status == 200) {
        document.getElementById('nome').value = dados.pet[0].nome
        document.getElementById('cor').value = dados.pet[0].cor
        document.getElementById('image').value = dados.pet[0].image
        document.getElementById('raca').value = dados.pet[0].raca

        // Aqui altera o texto do botão para "Atualizar"
        document.getElementById('cadastrar').innerText = 'Atualizar';

        // Guardando o ID do pet na sessão
        sessionStorage.setItem('idPet', id);
    }
}

botaoSalvar.addEventListener('click', function() {
    let dados = getDadosPet();

    if (dados) {
        // Verifica se é um cadastro (POST) ou uma atualização (PUT)
        if (document.getElementById('cadastrar').innerText == 'Cadastrar') {
            postPet(dados);
        } else if (document.getElementById('cadastrar').innerText == 'Atualizar') {
            putPet(dados);
        }
    }
})

//Botão "Limpar"
botaoLimpar.addEventListener('click', function () {
    document.getElementById('nome').value = ""
    document.getElementById('cor').value = ""
    document.getElementById('image').value = ""
    document.getElementById('raca').value = ""
})

window.addEventListener('load', function() {
    getPet()// Carrega a lista de pets ao carregar a página
})
