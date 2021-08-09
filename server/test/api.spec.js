const request = require('supertest');
const server = require('../server.js');


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

describe('API server', () => {
    let api;

    beforeAll(() => {
        api = server.listen(4000, () => console.log('Test server listening on port 4000'))
    });

    afterAll(done => {
        console.log('Stopping test server');
        api.close(done);
    });

    it('reponds to /posts with status 200', done => {
        request(api)
        .get('/posts')
        .expect(200, done)
    });

    it('reponds to /posts with status 201', async () => {
        const updatedCats = await request(api).get('/posts');
        expect(updatedCats.body).toStrictEqual(test_obj);
    });

    // it('reponds to /posts with status 200', done => {
    //     request(api)
    //     .post('/posts')
    //     .send(sendObj)
    //     .expect(201, done)
    // });

    it('reponds to /posts/1/commetns with status 200', done => {
        request(api)
        .put('/posts/1/comment')
        .expect(200, done)
    });

    it('reponds to /posts/2/likes with status 200', done => {
        request(api)
        .put('/posts/2/likes')
        .expect(200, done)
    });

});
