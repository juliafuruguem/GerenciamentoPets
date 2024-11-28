/********************************************************************************************************
 * Objetivo: Manipular dados de um array, utilizando concieto de API
 * Data: 13/11/2024
 * Autor: Julia / David 
 * Versão: 1.0
 ********************************************************************************************************/

//Aqui criamos um botão cadastrar e buscar do HTML
const botaoSalvar = document.getElementById('cadastrar')

//Aqui vamos criar uma função para a lista dos pets no HTML
const setCardItens = function(dadosPets){

    //Aqui recebe a caixa principal onde criamos a lista de pets
    let divCards = document.getElementById('cards')

    //Limpa a lista antes de carregar de novo 
    divCards.innerText = ''

    //Criando o forEach para percorrer aos pets cadastrados
    dadosPets.pets.forEach(function(item){

        //Criando  os elementos do HTML
        let divCardsPets = document.createElement('div')
        let pNome = document.createElement('p')
        let figurePets = document.createElement('figure')
        let img = document.createElement('img')
        let pCor = document.createElement('p')
        let pRaca = document.createElement('p')

        //Escrevendo os dados do array de pets
        pNome.innerText = item.nome
        pCor.innerText = item.cor
        pRaca.innerText = item.raca

        //Criando atributos nas tags HTML
        divCardsPets.setAttribute('class', 'cards-pets')
        pNome.setAttribute('id', 'nome-principal')
        img.setAttribute('src', item.image)

        //Associando um elementro ao elemento pai
        divCards.appendChild(divCardsPets)
        divCardsPets.appendChild(pNome)
        divCardsPets.appendChild(figurePets)
        figurePets.appendChild(img)
        divCardsPets.appendChild(pCor)
        divCardsPets.appendChild(pRaca)

    })
}

//Aqui criamos uma função para listar todos os pets e retornar os dados API
const getPet = async function(){
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/listar/pets'

    let response = await fetch(url)
    let dados = await response.json()
    setCardItens(dados)
}

//Criando evento load(carregar)
window.addEventListener('load', function(){
    getPet()
})
