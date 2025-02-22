beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        // Change the test, so the passwords would match
        // Add assertion, that error message is not visible anymore
        // Add assertion, that submit button is now enabled
        cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('John')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('Testpass')
    cy.get('h2').contains('Password').click()

    cy.get('.submit_button').should('be.disabled')
    cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
    cy.get('#success_message').should('not.be.visible')

    cy.get('#confirm').scrollIntoView()
    cy.get('#confirm').clear()
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()

    cy.get('.submit_button').should('be.enabled')
    cy.get('#password_error_message').should('not.be.visible').should('contain', 'Passwords do not match!')
    })

    it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
        cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('John')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('Testpass')
    cy.get('#confirm').type('Testpass')
    cy.get('h2').contains('Password').click()

    cy.get('.submit_button').should('be.enabled').click()
    cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        inputValidMandatoryData('johnDoe')

        cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('John')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('Testpass')
    cy.get('#confirm').type('Testpass')
    cy.get('h2').contains('Password').click()

    cy.get('.submit_button').should('be.enabled').click()
    cy.get('#success_message').should('be.visible')
    })

    
    it('User cannot submit form when some mandatory fields are empty', () => {
       // Add at least 1 test for checking some mandatory field's absence
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('John')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('Testpass')
    cy.get('#confirm').type('Testpass')
    cy.get('h2').contains('Password').click()

    cy.get('.submit_button').should('be.disabled')
   
    })
})

function inputValidMandatoryData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}