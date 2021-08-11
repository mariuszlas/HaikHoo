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