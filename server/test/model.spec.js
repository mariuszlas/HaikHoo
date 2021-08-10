const Post = require('../models/post.js');

describe('Post model', () => {
    const testPost = {
        "author":"Jon Snow",
        "title":"Title 1",
        "date":"282021","text":
        "Text content of the post",
        "gifUrl":"http://giphy",
    };

    it('makes an instance of a post', () => {
        const post = new Post(testPost);
        expect(post.author).toBe('Jon Snow');
        expect(post.title).toBe('Title 1');
        expect(post.comments).toStrictEqual([]);
    });

    it('returns all posts', () => {
        const allPosts = Post.allPosts;
        expect(allPosts).toBeTruthy();
    });

    // it('creates a new post', () => {
    //     const newPost = Post.createPost(testPost);
    //     expect(newPost.id).toBeTruthy();
    //     exect(newPost.reactions).toStrictEqual({});
    // })
});
