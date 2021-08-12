const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const mainHandlers = require('../static/js/mainHandlers.js')
global.fetch = require('jest-fetch-mock'); 

describe('extentPage', () => {
    test('counter increase by 5 after the show more button is pressed', () => {
        const stubEvent = { preventDefault: jest.fn() };
        mainHandlers.extendPage(stubEvent);
        expect(mainHandlers.pageCounter).toBe(2);
        })
})