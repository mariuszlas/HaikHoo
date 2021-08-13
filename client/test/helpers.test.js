const { test, beforeEach, expect } = require('@jest/globals')
const helpers = require('../static/js/helpers')

let todaysDate = '13/8/2021'

describe('post validity', () => {

    let invalidInput = ['   ', ''];
    invalidInput.forEach(testInput => {

        test('thrown error if there is no poem', () => {
            expect(() => helpers.postValidity('title', testInput))
                .toThrowError("you haven't written your poem yet!");
        })

        test('throw error if there is no title', () => {
            expect(() => helpers.postValidity(testInput, 'poem'))
            .toThrowError('please enter a title')
        })
    })

    test('throw error if poem exceed 500 characters', () => {

        let poem = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaa`

        expect(() => helpers.postValidity('title', poem))
            .toThrowError("your poem is over the character limit")
    })
})

describe('formateDate works properly', () => {
    expect(helpers.formatDate()).toBe(todaysDate);
})

describe('data class should have all the elements', () => {
    let testData = new helpers.Data('title','poem','gif')
    expect(testData.title).toBe('title');
    expect(testData.text).toBe('poem');
    expect(testData.gifUrl).toBe('gif');
    expect(testData.date).toBe(todaysDate);
})
