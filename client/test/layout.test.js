const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('layout of the static index.html', ()=>{
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    describe('head', () =>{
        test('correct title', () => {
            let title = document.querySelector('title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe('HaikHoo');
        })
    });

describe('body', ()=>{
    test('to have a post button', () => {
        let postBtn = document.getElementById('makePost');
        expect(postBtn).toBeDefined();
    });

    test('to have a post section for posts to be appeneded',() => {
        expect(document.getElementById('posts')).toBeDefined();
    });

})

})