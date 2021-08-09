const fs = require('fs');
const database = './data/posts.json';

class Post {
    constructor(data) {
        this.id = data.id;
        this.author = data.author;
        this.title = data.title;
        this.date = data.date;
        this.text = data.text;
        this.gifUrl = data.gifUrl;
        this.comments = data.comments || [];
        this.reactions = data.reactions || {};
    }

    static get allPosts() {
        let data = fs.readFileSync(database);
        let json = JSON.parse(data);
        let posts = json.map(postEntry => new Post(postEntry));
        return posts;
        // fs.readFile(database, (err, data) => {
        //      let parse = JSON.parse(data);
        //      let posts = parse.map(postEntry => new Post(postEntry));
        //      return parse;
        //  });
    }

    static createPost(body) {
        fs.readFile(database, (err, data) => {
            let posts = JSON.parse(data);
            const newPost = new Post(body);
            newPost.id = `${posts.length + 1}`;
            posts.push(newPost);

            fs.writeFile(database, JSON.stringify(posts), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
             });
        });
    }

    static update(id, path, req) {
        fs.readFile(database, (err, data) => {
            let posts = JSON.parse(data);
            let findPost = posts.filter(post => post.id === id);
            let updatedPost = new Post(findPost[0]);

            if (path === "comment") {
                updatedPost.comments.push(req.body.comment);
            } else {
                updatedPost.reactions[path] ++;
            }

            posts.map(post => {post.id === id ? post = updatedPost: post})
            fs.writeFile(database, JSON.stringify(posts), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
        });
    }
}

module.exports = Post;
