import express from "express";
import multer from "multer";
import cors from "cors";
import { listar_posts, criar_posts, upload_img, atualizar_post } from "../controllers/post-controller.js";

const cors_options = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(cors_options));
    app.get('/posts', listar_posts);
    app.post('/posts', criar_posts);
    app.post('/upload', upload.single("imagem"), upload_img);
    app.put('/upload/:id', atualizar_post);
};

export default routes;
