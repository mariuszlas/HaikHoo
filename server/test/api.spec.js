const request = require('supertest');
const server = require('../server.js');
const fs = require('fs');

let test_obj = [
        {
            "id":"1",
            "author":"Jon Snow",
            "title":"Title 1",
            "date":"282021","text":
            "Text content of the post",
            "gifUrl":"http://giphy",
            "comments":["Comment 1","Comment 2"],
            "reactions":{"likes":"1","hearts":"7","smiles":"2"}
        },
        {
            "id":"2",
            "author":"Jonny Snowy",
            "title":"Title 2",
            "date":"392021",
            "text":"Text content of the post",
            "gifUrl":"",
            "comments":["Comment 1","Comment 2"],
            "reactions":{"likes":"4","hearts":"8","smiles":"1"}
        }
];

let sendObj = {
    "author":"Jonny Snowy",
    "title":"Title 2",
    "date":"392021",
    "text":"Text content of the post",
    "gifUrl":""
}

let putOpt = { method: "PUT",
                body: JSON.stringify({ "comment": "New comment" }),
                headers: {'Content-Type': 'application/json'}
            }

let test_od = fs.readFileSync("./data/posts.json");
let test_o = JSON.parse(test_od);

describe('API server', () => {
    let api;
    let testObj;

    beforeAll(() => {
        api = server.listen(4000, () => console.log('Test server listening on port 4000'));
        let data = fs.readFileSync("./data/posts.json");
        testObj = JSON.parse(data);
    });

    afterAll(done => {
        console.log('Stopping test server');
        api.close(done);
    });

    it('reponds to GET /posts with status 200', done => {
        request(api)
        .get('/posts')
        .expect(200, done)
    });

    it('reponds to GET /posts with correct array of objects', async () => {
        const updatedCats = await request(api).get('/posts');
        expect(updatedCats.body).toStrictEqual(testObj);
    });


    // it('reponds to PUT /posts/1/comment with status 200', done => {
    //     request(api)
    //     .put('/posts/1/comment')
    //     .send({ "comment": "New comment" })
    //     .expect(200, done)
    // });

    it('reponds to PUT /posts/2/likes with status 200', done => {
        request(api)
        .put('/posts/2/likes')
        .expect(200, done)
    });

    it('reponds to POST /posts with status 201', done => {
            request(api)
            .post('/posts')
            .send(sendObj)
            .expect(201, done)
        });
});
