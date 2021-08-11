
const { test, beforeEach, expect } = require('@jest/globals')
const helpers = require('../static/js/helpers')


describe('nameGenerator', () => {
    beforeEach(() => randomName = helpers.randomName )

    test('are two words being returned', () => {
       let wordsArr = randomName().split(" ")
       console.log(wordsArr)
       expect(wordsArr.length).toEqual(2)
    })

    test("are the names different 'every' time", () => {
        let namesArr = []
        let matches = 0;
        for(let i = 0; i<100; i++){
           namesArr.push(randomName)
        }
        for(let i = 0; i<namesArr.length; i++){
            for(let j=i+1; j<namesArr.length; j++){
                if(namesArr[i] == namesArr[j]){
                    matches++;
                }
            }
        }
        console.log(namesArr)
        console.log(matches)
        expect(matches).toBeLessThan(5)
    })
})