
import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "./documentosDb.js"
import io from "./servidor.js"

io.on("connection", (socket) => {
    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos()
        devolverDocumentos(documentos)
    })
    socket.on("adicionar_documento", async (nome) => {
        const documentoExiste = (await encontrarDocumento(nome)) !== null

        if(documentoExiste){
            socket.emit("documento_existe", nome)
        }else{
            const resultado = await adicionarDocumento(nome)
        
            if(resultado.acknowledged){
                io.emit("adicionar_documento_interface", nome)
            }
        }        
    })
    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento)

        const documento = await encontrarDocumento(nomeDocumento)
        if(documento){
            // socket.emit("texto_documento", documento.texto)
            devolverTexto(documento.texto)//retronando para o front o texto do documento
        }
    })
    socket.on("texto_editor", async ({texto, nomeDocumento}) => { //recendo o evento que está sendo emitido pelo front
        // socket.broadcast.emit("texto_editor_clientes", texto)

        const atualizacao = await atualizaDocumento(nomeDocumento, texto)
        console.log(atualizacao)
        if(atualizacao.modifiedCount){
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto)
        } 
    })

    socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome)
        
        if(resultado.deletedCount){
            io.emit("excluir_documento_sucesso", nome )
        }
    })
})