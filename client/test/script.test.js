

describe('posting', () => {
    beforeEach( () => {
        document.documentElement.innerHTML = 
            `<body>
                <form>
                <input id="userPoem" type="text" value="">
                <input id="postPoem" type="submit">
                </form>
            </body>`
    })

    test('is there a poem to send', () => {
        let poem = document.querySelector('#userPoem').value
        expect(poem).toBeTruthy()
    })

    test('is the poem less than or equal to 500 characters', () => {
        let poem = document.querySelector('#userPoem').value
        expect(poem.length).toBeLessThanOrEqual(500)
    })

    test('is fetch post being called', () => {
        expect(fetch).toHaveBeenCalled()
    })

    test('do we get a success response from the server side', () => {
        let uploadPost = jest.fn();
        expect(uploadPost()).toBeTruthy()
    })
})

//get the user input
//test is it a valid input
//



//we are posting to the api using get fetch