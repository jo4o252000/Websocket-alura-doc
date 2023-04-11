import { alertaERedireciona, atualizaTextoEditor } from "./documento.js";

const socket = io()

function selecionarDocumento(nome){
    socket.emit("selecionar_documento", nome, (texto) => {
        atualizaTextoEditor(texto)
    })
}

function emitirTextoEditor(dados){
    socket.emit("texto_editor", dados); //emitindo o evento com o conteudo do texto editor 
}
// socket.on("texto_documento", (texto) => {
//     atualizaTextoEditor(texto)
// })

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto)
})

function emitirExcluirDocumento(nome){
    socket.emit("excluir_documento", nome)
}

socket.on("excluir_documento_sucesso", (nome) => {
    alertaERedireciona(nome)
})
export {emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento}