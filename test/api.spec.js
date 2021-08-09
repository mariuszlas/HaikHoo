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

describe('API server', () => {
    let api;

    beforeAll(() => {
        api = server.listen(4000, () => console.log('Test server listening on port 4000'))
    });

    afterAll(done => {
        console.log('Stopping test server');
        api.close(done);
    });

    it('reponds to /posts page with status 200', done => {
        request(api)
        .get('/posts')
        .expect(200, done)
    });

    it('reponds to /posts page with status 200', async () => {
        const updatedCats = await request(api).get('/posts');
        expect(updatedCats.body).toStrictEqual(test_obj);
    });
});
