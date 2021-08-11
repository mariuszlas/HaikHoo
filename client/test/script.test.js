const { checkPoem, postPoem, fetchGif, postValidity } = require("../static/js/controller")
//const script = require('../static/js/script');
const model = require('../static/js/model');
global.fetch = require('jest-fetch-mock')

describe('post poem', () => {
    beforeEach(() => {
        document.documentElement.innerHTML =
            `<body>
                <form>
                <input id="userPoem" type="text" value="">
                <input id="postPoem" type="submit">
                </form>
            </body>`
        fetch.resetMocks()
    })

    test('is fetch post being called', () => {
        let stubEvent = { target: { poemTitle: 'title', userPoem: 'poem' } }
        stubEvent.preventDefault = jest.fn()
        fetchMock.mockResponse(JSON.stringify({ "public_repos": 100 }))
        checkPoem(stubEvent)
        expect(fetch).toHaveBeenCalled()
    })

    // test('do we get a success response from the server side', () => {
    //     let uploadPost = jest.fn();
    //     expect(uploadPost()).toBeTruthy()
    // })



    describe('post validity', () => {

        let invalidInput = ['   ', ''];
        invalidInput.forEach(testInput => {

            test('is error thrown if there is no poem', () => {
                expect(() => postValidity('title', testInput))
                    .toThrowError("you haven't written your poem yet!");
            })
        })

        test('will submit happen if poem is more than 500 characters', () => {

            let poem = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaa`

            expect(() => postValidity('title', poem))
                .toThrowError("your poem is over the character limit")
        })
    })

})
