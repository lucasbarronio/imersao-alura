import { get_posts, create_posts, update_posts } from "../models/post-model.js";
import fs from 'fs';
import gerarDescricaoComGemini from "../services/gemini-service.js";

export async function listar_posts(req, res) {
    const resultado = await get_posts();
    res.status(200).json(resultado);
};

export async function upload_img(req, res) {
    const novo_post = {
        descricao: "",
        img_url: req.file.originalname,
        alt: ""
    };
    try {
        const post_criado = await create_posts(novo_post);
        const imagem_att = `uploads/${post_criado.insertedId}.png`;
        fs.renameSync(req.file.path, imagem_att);
        res.status(200).json(post_criado);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 'Erro': 'Falha na request' });
    }
}

export async function criar_posts(req, res) {
    const novo_post = req.body;
    try {
        const post_criado = await create_posts(novo_post);
        res.status(200).json(post_criado);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 'Erro': 'Falha na request' });
    }
}

export async function atualizar_post(req, res) {
    const id = req.params.id;
    const url = `http://localhost:3000/${id}.png`;

    try {
        const img_buffer = fs.readFileSync(`uploads/${id}.png`);
        const desc = await gerarDescricaoComGemini(img_buffer);

        const post = {
            descricao: desc,
            img_url: url,
            alt: req.body.alt
        }

        const post_criado = await update_posts(id, post);
        res.status(200).json(post_criado);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 'Erro': 'Falha na request' });
    }
}