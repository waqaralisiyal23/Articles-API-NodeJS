import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// Create a new article
router.post('/', async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single article
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update article
router.put('/:id', async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        if (!updatedArticle) return res.status(404).json({ error: 'Article not found' });
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Article
router.delete('/:id', async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) return res.status(404).json({ error: 'Article not found' });
        res.status(200).json(deletedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;