import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

const cliente = new MongoClient( `mongodb+srv://${process.env.NAME_DB}:${process.env.SENHA_DB}@aluracluster.5xtmjdd.mongodb.net/?retryWrites=true&w=majority`)

let documentosColecao

try{
    await cliente.connect()

    const db = cliente.db("alura-websockets")
    documentosColecao = db.collection("documentos")

    console.log("conectado ao banco de dados com sucesso")
}catch(error){
    console.log(error)
}

export {documentosColecao}