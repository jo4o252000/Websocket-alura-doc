import express from "express"
import url from 'url'
import path from "path"
import http from "http"
import {Server} from "socket.io"
import "./dbConfig/dbconnect.js"

const app = express()
const porta = process.env.porta || 3000

const caminhoAtual = url.fileURLToPath(import.meta.url) //Pegando o caminha absoluto do arquivo servidor 
const diretorioPublico = path.join(caminhoAtual, "../../", "public") //Mostrando o caminho para a parta public aoartir do caminha atuak
app.use(express.static(diretorioPublico))//definindo todos os arquivos que estão dentro da pasta public como estatico (html,css,js)

const servidorHttp = http.createServer(app)

servidorHttp.listen(porta, () => console.log("Servidor rodando na porta 3000"))

const io = new Server(servidorHttp)

export default io