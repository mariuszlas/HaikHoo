const { checkPoem, postPoem, fetchGif } = require("../static/js/controller")
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

    })


    // let invalidInput = ['   ', ''];
    // invalidInput.forEach(testInput => {
    //     let stubEvent = { target: { poemTitle: testInput, userPoem: testInput } }

    //     test('is error thrown if there is no poem', () => {
    //         expect(checkPoem(stubEvent)).toThrowError();
    //     })
    // })


    test('will submit happen if poem is more than 500 characters', () => {
        let stubEvent = { target: { poemTitle: 'title', userPoem: 'a'}}
        let postPoem = jest.fn()
        stubEvent.preventDefault = jest.fn()
        checkPoem(stubEvent)
        expect(postPoem).not.toHaveBeenCalled();
    })


    //     test('is fetch post being called', () => {
    //         expect(fetch).toHaveBeenCalled()
    //     })

    //     test('do we get a success response from the server side', () => {
    //         let uploadPost = jest.fn();
    //         expect(uploadPost()).toBeTruthy()
    //     })

})
