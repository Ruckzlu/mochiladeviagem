const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []
const novoNomeAv = JSON.parse(localStorage.getItem("novoNomeAv"))

itens.forEach((elemento) => { /// leitor de array
    criarElemento(elemento)

});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value) ///verificando e existe itens com o nome informado

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value

    }

    if (existe) { /// se o item existir atualizará o elemento
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[existe.findIndex(elemento => elemento.id === existe.id)] = itemAtual /////SOBREESCREVENDO NO ARRY DE ITENS O ITEM ATUAL

    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0  //caso não será utulizaod o arry como contagem de itens/ o interrogação é ? se exeiste

        criarElemento(itemAtual)

        itens.push(itemAtual)  ///push utilizado para puxa oq ue esta dentro de uma variavel
    }



    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""

})




function criarElemento(item) { //// criando elemento


    const novoItem = document.createElement("Li")  //novo item dentro do formulario
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")  ///adicionando no strong (numeros)
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)   //criando um novo item

    novoItem.innerHTML += item.nome

    //criando a lista para aparecer no sistema
    lista.appendChild(novoItem)

    novoItem.appendChild(botaoDeleta(item.id))

    console.log(novoItem)


}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}


function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"


    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}


function deletaElemento(tag, id) {  ///apaganod o elemento
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)  ////splice apaga do array e o findIndex acha o index
    console.log(itens)

    localStorage.setItem("itens", JSON.stringify(itens))
}



document.querySelector(".mochila").addEventListener("click", inserirNome)


function inserirNome() { //função para colocar o nome inserido no titulo
    const nomeAv = prompt("Aventureiro digite seu nome!")
    const novoNomeAv = document.querySelector("title").innerHTML = "Mochila do " + nomeAv
    console.log(novoNomeAv)
    localStorage.setItem("novoNomeAv", JSON.stringify(novoNomeAv))


}

document.querySelector("title").innerHTML = novoNomeAv