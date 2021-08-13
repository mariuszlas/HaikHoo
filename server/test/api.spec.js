const request = require('supertest');
const server = require('../server.js');
const fs = require('fs');
const { testData } = require('./testData.js');

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


describe('API server', () => {
    let api;
    let testObj;

    beforeAll(() => {
        api = server.listen(4000, () => console.log('Test server listening on port 4000'));
        let data = fs.readFileSync("./data/posts.json");
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
        let posts = await request(api).get('/posts');
        expect(posts.body).toStrictEqual(testData);
    });

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
