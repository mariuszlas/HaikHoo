const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let formHandlers = require('../static/js/formHandlers.js');

// jest.mock('../static/js/formHandlers.js');

describe('form handlers functions', () => {

    beforeEach(()=>{
        document.documentElement.innerHTML = html.toString();
    });

    describe('Show form when button pressed', () => {

        let postBtn = document.getElementById('makePost');

        test('there is a postBtn', ()=>{
            expect(postBtn).toBeDefined();
        });


        test('new-post-form is showed when the postBtn is clicked', () => {
            const stubEvent = { preventDefault: jest.fn(), target: postBtn };
            formHandlers.showForm(stubEvent);
            expect(document.querySelector('#new-post-form').style.display).toBe("block");
        });

    })
})




// const { checkPoem, postPoem, fetchGif, postValidity } = require("../static/js/formHandlers")
// const helpers = require('../static/js/helpers');
// global.fetch = require('jest-fetch-mock').enableMocks()
//
// describe('post poem', () => {
//     beforeEach(() => {
//         document.documentElement.innerHTML =
//             `<body>
//                 <form>
//                 <input id="userPoem" type="text" value="">
//                 <input id="postPoem" type="submit">
//                 </form>
//             </body>`
//         fetchMock.resetMocks()
//     })

    // test('is fetch post being called', () => {
    //     let stubEvent = { target: { poemTitle: 'title', userPoem: 'poem' } }
    //     stubEvent.preventDefault = jest.fn()
    //     fetchMock.mockResponse(JSON.stringify(stubEvent))
    //     checkPoem(stubEvent)
    //     expect(fetch).toHaveBeenCalled()
//     // })
//
//     // test('do we get a success response from the server side', () => {
//     //     let uploadPost = jest.fn();
//     //     expect(uploadPost()).toBeTruthy()
//     // })
//
// })
