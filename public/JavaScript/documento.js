import { emitirExcluirDocumento, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search)//pegando os parametros da url
const nomeDocumento = parametros.get("nome")

const textoEditor = document.getElementById("editor-texto")
const tituloDocumento = document.getElementById("titulo-documento")
const botaoExcluir = document.getElementById("excluir-documento")

tituloDocumento.textContent = nomeDocumento || "Documento sem titulo"

selecionarDocumento(nomeDocumento)

textoEditor.addEventListener("keyup", () => {
    //console.log(textoEditor.value)//adicionanado um evento para quando um tecla for precionada 
    emitirTextoEditor({
        texto : textoEditor.value, 
        nomeDocumento
    })
})

function atualizaTextoEditor(texto){
    textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
    emitirExcluirDocumento(nomeDocumento)
})

function alertaERedireciona(nome){
    if(nome === nomeDocumento){
        alert(`Dcumento ${nome} excluido`)
        window.location.href = "/"//redirecionando para a tela incial do projeto 
    }
}
    

export {atualizaTextoEditor, alertaERedireciona}