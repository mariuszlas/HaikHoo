const { checkPoem, postPoem, fetchGif, postValidity } = require("../static/js/formHandlers")
const helpers = require('../static/js/helpers');
global.fetch = require('jest-fetch-mock').enableMocks()

describe('post poem', () => {
    beforeEach(() => {
        document.documentElement.innerHTML =
            `<body>
                <form>
                <input id="userPoem" type="text" value="">
                <input id="postPoem" type="submit">
                </form>
            </body>`
        fetchMock.resetMocks()
    })

    test('is fetch post being called', () => {
        let stubEvent = { target: { poemTitle: 'title', userPoem: 'poem' } }
        stubEvent.preventDefault = jest.fn()
        fetchMock.mockResponse(JSON.stringify(stubEvent))
        checkPoem(stubEvent)
        expect(fetch).toHaveBeenCalled()
    })

    // test('do we get a success response from the server side', () => {
    //     let uploadPost = jest.fn();
    //     expect(uploadPost()).toBeTruthy()
    // })

})
