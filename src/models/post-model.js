import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/db-config.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function get_posts() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

export async function create_posts(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function update_posts(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const obj_id = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(obj_id)}, {$set: novoPost});
}