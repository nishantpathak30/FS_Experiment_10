import express from 'express';
import { body, validationResult } from 'express-validator';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email bio')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email bio');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('content').trim().notEmpty().withMessage('Content is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
      author: req.user._id
    });

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username email bio');

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private (only post author)
router.put('/:id', protect, [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('content').trim().notEmpty().withMessage('Content is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { title, content } = req.body;

    post.title = title;
    post.content = content;
    post.updatedAt = Date.now();

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('author', 'username email bio');

    res.json(updatedPost);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private (only post author)
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id });

    // Delete post
    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post and associated comments deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/user/:userId
// @desc    Get posts by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username email bio')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
