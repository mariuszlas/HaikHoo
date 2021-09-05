const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let formHandlers = require('../static/js/formHandlers.js');
let helpers = require('../static/js/helpers.js');

global.fetch = require('jest-fetch-mock');

jest.mock('../static/js/requestHandlers.js')
jest.mock('../static/js/mainHandlers.js')
let requestHandlers = require('../static/js/requestHandlers.js');
requestHandlers.fetchGif.mockImplementation(() => { return gifData })

let mainHandlers = require('../static/js/mainHandlers.js');

jest.useFakeTimers();

gifData =
{
    data: [
        { images: { fixed_height: { url: '1' } } },
        { images: { fixed_height: { url: '2' } } },
        { images: { fixed_height: { url: '3' } } },
        { images: { fixed_height: { url: '4' } } }
    ]
};


describe('form handlers functions', () => {

    describe('ShowForm', () => {
        let postBtn;

        beforeEach(() => {
            document.documentElement.innerHTML = html.toString();
            postBtn = document.getElementById('makePost');
        });

        it('checks the postBtn is defined', () => {
            expect(postBtn).toBeDefined();
        });

        it('shows new-post-form when the postBtn is clicked', () => {
            const stubEvent = { preventDefault: jest.fn() };
            formHandlers.showForm(stubEvent);
            expect(document.querySelector('#new-post-form').style.display).toBe("flex");
        });
    });

    describe('showGifForm', () => {
        let stubEvent;
        let postForm;

        beforeEach(() => {
            document.documentElement.innerHTML = "<body><main><form id='new-post-form'></form></main></body>"
            postForm = document.querySelector('#new-post-form')
            stubEvent = { preventDefault: jest.fn() }
        })

        it('shows gif-form when gif button clicked', () => {
            formHandlers.showGifForm(stubEvent);
            expect(document.querySelectorAll('#gifForm').length).toEqual(1)
        })

        it('does not create a new gif-form if it is already open', () => {
            formHandlers.showGifForm(stubEvent);
            formHandlers.showGifForm(stubEvent);
            console.log(document.querySelector('#gifForm'));
            expect(document.querySelectorAll('#gifForm').length).toEqual(0)
        })
    })

    describe('displayGif', () => {
        it('displays GIFs when search is made', async () => {
            document.body.innerHTML = '<section id="gifContainer"><input type="text" id="gifWord" value="Hi" placeholder="search for a gif"></section>'
            const stubEvent = { preventDefault: jest.fn() };
            await formHandlers.displayGif(stubEvent);
            expect(document.querySelector('#gifContainer').childElementCount).toEqual(4)
        })
    })


    describe('selectGif', () => {

        it('creates img element in #selectedGif element and removes gif form', () => {
            document.documentElement.innerHTML = "<div><form id='gifForm'></form><span id='selectedGif'></span></div>"
            const stubEvent = { target: { src: 'imgURL' } }
            formHandlers.selectGif(stubEvent)
            const selectedGif = document.querySelector('#selectedGif');
            const gifForm = document.querySelector('#gifForm');
            expect(selectedGif.children[0].tagName).toEqual('IMG');
            expect(gifForm).toBe(null);
        })
    })


    // describe('checkPoem', () => {
    //
    //     it('calls postValidity', () => {
    //         document.documentElement.innerHTML = "<main><form><span id='counter'></span><span hidden id='formErrors'></span><span id='selectedGif'><img src='test'></span></form></main>"
    //
    //         const poemForm = document.querySelector('form')
    //         const stubEvent = {
    //             preventDefault: jest.fn(),
    //             target: {
    //                 poemTitle: { value: 'title' },
    //                 userPoem: { value:'poem' }
    //             }
    //         }
    //         helpers.postValidity = jest.fn().mockImplementation( () => {});
    //         requestHandlers.postPoem = jest.fn().mockImplementation(() => {})
    //         formHandlers.updateDisplay = jest.fn().mockImplementation(() => {})
    //         formHandlers.checkPoem(stubEvent, poemForm)
    //         expect(helpers.postValidity).toHaveBeenCalled()
    //     })
    // })


    // describe('updateDisplay', () => {

        // test('is displayPost called', () => {
        //     document.documentElement.innerHTML = "<body><main></main></body>"
        //     // mainHandlers.displayPost.mockImplementation(() => {})
        //     formHandlers.updateDisplay()
        //     // expect(setTimeout).toHaveBeenCalledTimes(1);
        //     // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        //     // let displayPost = jest.fn()
        //     const loader = document.querySelector('.loader');
        //     expect(loader).toBeDefined()
        // })

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
        //
        // })
    // })

    describe('clearForm', () => {

        it('resets the form', () => {
            document.documentElement.innerHTML = "<form><span id='formErrors'>test</span><span id='selectedGif'>test</span><span id='counter'>test</span><form id='gifForm'>test</form></form>"
            const form = document.querySelector('form')
            form.reset = jest.fn();
            formHandlers.clearForm(form)
            expect(form.reset).toBeCalledTimes(1);
        })
    })

})
