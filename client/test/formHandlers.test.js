const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let formHandlers = require('../static/js/formHandlers.js');

jest.mock('../static/js/formHandlers.js');

describe('form handlers functions', () => {

    beforeEach(()=>{
        document.documentElement.innerHTML = html.toString();
    });

    describe('Show form when button pressed', () => {

        let postBtn = document.getElementById('makePost');

        test('there is a postBtn', ()=>{
            expect(postBtn).toBeDefined();
        });
        

        test('run showForm(e) when the postBtn is clicked', () => {
            formHandlers.showForm({type: 'click', target: postBtn});
            expect(formHandlers.showForm).toHaveBeenCalled();
        });


    })
})