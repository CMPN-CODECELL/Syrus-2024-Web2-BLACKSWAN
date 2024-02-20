// post.controller.js
const Post=require("../models/Post.model");

const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.userId;

        const newPost = await Post.create({
            user: userId,
            content,
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getPosts = async (req, res) => {

    try {
        const userId = req.userId

        const posts = await Post.find()
            .populate('user', '-password')

        // to check if liked by user
        
        // Calculate the number of likes and replies for each post
        const postsWithCounts = posts.map(post => ({
            _id: post._id,
            user: post.user,
            content: post.content,
            likesCount: post.likes.length,
            repliesCount: post.replies.length,
            isLiked: post.likes.some(user => user.toString() === userId) 
        }));

        res.status(200).json(postsWithCounts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ error: 'You have already liked this post' });
        }

        // Add the user's ID to the likes array
        post.likes.push(userId);
        await post.save();

        res.status(200).json({ message: 'Post liked successfully' });
    } catch (error) {
        console.error('Error liking post:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports = {createPost, getPosts,likePost};
