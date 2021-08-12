const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let formHandlers = require('../static/js/formHandlers.js');
let helpers = require('../static/js/helpers.js');
const mainHandlers = require('../static/js/mainHandlers.js');
let requestHandlers = require('../static/js/requestHandlers.js');
global.fetch = require('jest-fetch-mock'); 

//jest.mock('../static/js/formHandlers.js');

describe('form handlers functions', () => {



    describe('ShowForm', () => {

        beforeEach(() => {
            document.documentElement.innerHTML = html.toString();
        });

        let postBtn = document.getElementById('makePost');

        test('there is a postBtn', () => {
            expect(postBtn).toBeDefined();
        });

        test('new-post-form is showed when the postBtn is clicked', () => {
            const stubEvent = { preventDefault: jest.fn() };
            formHandlers.showForm(stubEvent);
            expect(document.querySelector('#new-post-form').style.display).toBe("block");
        });

    })


    describe('showGifForm', () => {

        beforeEach(() => {
            postForm = document.querySelector('#new-post-form')
        })
        test('show form when gif button clicked', () => {
            document.documentElement.innerHTML = "<body><main><form id='new-post-form'></form></main></body>"
            const stubEvent = { preventDefault: jest.fn() }
            formHandlers.showGifForm(stubEvent);
            expect(document.querySelectorAll('#gifForm').length).toEqual(1)
        })

        test('does not create a form if it is already open', () => {
            document.documentElement.innerHTML = "<body><main><form id='new-post-form'><form id='gifForm'></form></form></main></body>"
            const stubEvent = { preventDefault: jest.fn() }
            formHandlers.showGifForm(stubEvent);
            expect(document.querySelectorAll('#gifForm').length).toEqual(1)
        })

        test('form is empty/ no values', () => {

        })
    })

    // describe('displayGif', () => {

    //     beforeEach(() => {
    //         document.documentElement.innerHTML = '<section id="gifContainer"><input type="text" id="gifWord" value="Hi" placeholder="search for a gif"></section>'
    //         const stubEvent = { preventDefault: jest.fn() }
    //     })

    //     test('is fetchGif called', () => {
    //         const stubEvent = { preventDefault: jest.fn() }
    //         formHandlers.displayGif(stubEvent);
    //         expect(requestHandlers.fetchGif()).toBeCalled();
    //     })

    //     test('are gifs displayed when search is made', () => {
    //         let gifData =
    //         {
    //             data: [
    //                 { images: { fixedheight: { url: '1' } } },
    //                 { images: { fixedheight: { url: '2' } } },
    //                 { images: { fixedheight: { url: '3' } } },
    //                 { images: { fixedheight: { url: '4' } } },
    //                 { images: { fixedheight: { url: '5' } } }
    //             ]
    //         }
    //         const fetchGif = jest.fn(() => {
    //             return gifData
    //         });
    //         formHandlers.displayGif(stubEvent)
    //         expect(document.querySelector('#gifContainer').childElementCount).toEqual(5)
    //     })
    // })


    // describe('selectGif', () => {
    //     beforeEach(() => {
    //         // let doc = "<form id='gifForm'><span id='selectedGif'></span></form>"
    //         // document.documentElement.innerHTML = doc
    //         stubEvent = { target: { src: 'imgURL' } }
    //         // document.documentElement.innerHTML = ""
    //     })

    //     test('is an img element created in #selectedGif', () => {
    //         let doc = "<form id='gifForm'><span id='selectedGif'></span></form>"
    //         document.documentElement.innerHTML = ""
    //         formHandlers.selectGif(stubEvent)
    //         console.log(document.documentElement.innerHTML)
    //         expect(document.querySelector('#selectedGif').children[0].tagName).toEqual('img')
    //     })
    // })

    // describe('clearForm', () => {

    //     test('does the form reset', () => {
    //         document.documentElement.innerHTML ="<form><span id='selectedGif'></span><span id='counter'></span></form>"
    //         let form = document.querySelector('form')
    //         form.reset = jest.fn();
    //         formHandlers.clearForm(form)
    //         expect(form.reset).toBeCalled()
    //     })

    // })

    // describe('checkPoem', () => {
    //     beforeEach( () => {
    //         jest.restoreAllMocks()
    //     })
    //     test('is postValidity called', () => {
    //         document.documentElement.innerHTML = "<form><span id='formErrors'></span></form>"
    //         let poemForm = document.querySelector('form')
    //         let stubEvent = {preventDefault: jest.fn(), target: { poemTitle: { value: 'title'}, userPoem: {value:'poem'}}}
    //         helpers.postValidity = jest.fn().mockImplementation( () => {});
    //         requestHandlers.postPoem = jest.fn().mockImplementation(() => {})
    //         formHandlers.updateDisplay = jest.fn().mockImplementation(() => {})
    //         formHandlers.checkPoem(stubEvent, poemForm)
    //         expect(postValidity).toHaveBeenCalled()
    //     })
    // })

    // describe('updateDisplay', () => {
    //     test('is displayPost called', () => {
    //         const stubEvent = {preventDefault: jest.fn()};
    //         formHandlers.updateDisplay()
    //         expect(mainHandlers.displayPost(stubEvent)).toBeCalled()
    //     })

        // test('is the first post displayed now different', () => {
        //     document.documentElement.innerHTML =
        //     "<main><article>5</article><article>4</article><article>3</article><article>2</article><article>1</article></main>"
        //     mainHandlers.displayPost = jest.fn( () => {
        //         document.documentElement.innerHTML =
        //         "<main><article>6</article><article>5</article><article>4</article><article>3</article><article>2</article></main>"
        //     })
        //     formHandlers.updateDisplay()
        //     expect(mainHandlers.displayPost).toBeCalled();
        //     expect(document.querySelector('main').firstChild.textContent).toEqual('6');

        // })
    // })

})
