const { Post } = require('../models/post.js');

describe('Post model', () => {
    const testPost = {
        "title":"Title 1",
        "date":"282021","text":
        "Text content of the post",
        "gifUrl":"",
    };

    it('makes an instance of a post', () => {
        const post = new Post(testPost);
        expect(post.title).toBe('Title 1');
        expect(post.comments).toStrictEqual([]);
    });
});
