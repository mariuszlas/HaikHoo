const requestHandlers = require('../static/js/requestHandlers.js');
global.fetch = require('jest-fetch-mock');   // create mock of the 'fetch' function as a global variable

describe('functionality of fuctions making fetch requests', () => {

    beforeEach( () => {
        fetch.resetMocks();
    });

    it('makes a fetch to haikhoo-server to create a new post', () => {
        requestHandlers.postPoem('newPost', 'textContent', '');
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('makes a fetch to giphy server with correct url', () => {
        const userInput = 'tree';
        requestHandlers.fetchGif(userInput);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('makes a fetch to haikhooo-server to send a new comment', async () => {
        const event = { preventDefault: jest.fn(), target: [0, {value: 'comment'}] };
        await requestHandlers.makeComment(event);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
})
