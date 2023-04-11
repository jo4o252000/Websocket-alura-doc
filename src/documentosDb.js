import { documentosColecao } from "./dbConfig/dbconnect.js"
function obterDocumentos(){
    const documentos = documentosColecao.find().toArray()
    return documentos
}
function encontrarDocumento(nome){
    const documento = documentosColecao.findOne({
        nome: nome
    })
    return documento
}

function atualizaDocumento(nome, texto){
    const atualizacao = documentosColecao.updateOne({
        nome: nome,   
    }, {
        $set: {//ira atualizar apenas o testo
            texto: texto
        }
    })
    return atualizacao
}

function adicionarDocumento(nome){
    const resultado = documentosColecao.insertOne({
        nome: nome,
        texto: ""
    })
    return resultado
}
function excluirDocumento(nome){
    const resultado = documentosColecao.deleteOne({
        nome: nome
    })
    return resultado
}

export {encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento,  excluirDocumento}