
const { test, beforeEach, expect } = require('@jest/globals')
const helpers = require('../static/js/helpers')


describe('nameGenerator', () => {
    // beforeEach(() => randomName = helpers.randomName )

    test('are two words being returned', () => {
       let wordsArr = helpers.randomName().split(" ")
       expect(wordsArr.length).toEqual(2)
    });

    test("are the names different 'every' time", () => {
        let namesArr = []
        let matches = 0;
        for(let i = 0; i<100; i++){
            let randomNameOutput = helpers.randomName()
            if (namesArr.includes(randomNameOutput)) {
                matches ++
            } else {
                namesArr.push(randomNameOutput)
            };
        };
        expect(matches).toBeLessThan(5)
    });
});