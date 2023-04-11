import { emitirAdicionarDocumento } from "./socket-front-index.js"

const listaDocumentos = document.getElementById("lista-documentos")
const form = document.getElementById("form-adiciona-documento")
const inputDocumento = document.getElementById("input-documento")


form.addEventListener("submit", (event) => {
    event.preventDefault()
    emitirAdicionarDocumento(inputDocumento.value)
    inputDocumento.value = "" //limpando o inpu depois de enviar os arquivos 
})

function inserirLinkDocumento(nome){//inserindo um elemento no html
    listaDocumentos.innerHTML += `
        <a href="documento.html?nome=${nome}" class="list-group-item list-group-item-action" id="documento-${nome}">
        ${nome}
        </a>
    `
}
function removerLinkDocumento(nomeDocumento){//removendo o elemento html em tempo real
    const documento = document.getElementById(`documento-${nomeDocumento}`)
    listaDocumentos.removeChild(documento)
}

export {inserirLinkDocumento, removerLinkDocumento}
