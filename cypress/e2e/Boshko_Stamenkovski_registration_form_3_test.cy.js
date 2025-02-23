beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

    //radio buttons and its content
it('Check that radio button list is correct', () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="radio"]').should('have.length', 4)

    // Verify labels of the radio buttons
    cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
    cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
    cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
    cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

    //Verify default state of radio buttons
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    cy.get('input[type="radio"]').eq(1).should('not.be.checked')
    cy.get('input[type="radio"]').eq(2).should('not.be.checked')
    cy.get('input[type="radio"]').eq(3).should('not.be.checked')

    // Selecting one will remove selection from the other radio button
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[type="radio"]').eq(1).check().should('be.checked')
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
})

    // Dropdown and dependencies between 2 dropdowns:
        // list of cities changes depending on the choice of country
        //if city is already chosen and country is updated, then city choice should be removed
it('Cities and countries dropdown is correct', () => {
    // Here are given different solutions how to get the length of array of elements in country dropdown
    // Next 2 lines of code do exactly the same!
    cy.get('#country').children().should('have.length', 4)
    cy.get('#country').find('option').should('have.length', 4)

    cy.get('#country').select('Estonia')
    cy.get('#city').find('option').should('have.length', 4)
    cy.get('#city').select('Tallinn')

    cy.get('#city').find('option').then((options) => {
        const actual = [...options].map(option => option.text)
        expect(actual).to.deep.eq(['','Tallinn', 'Haapsalu', 'Tartu'])
    })
})

it('Check that check box list is correct', () => {
    // Array of found elements with given selector has 2 elements in total
    cy.get('input[type="checkbox"]').should('have.length', 2)

    // Verify labels of the checkboxes
    cy.get('input[type="checkbox"]').next().eq(0).should('have.text', '')
    cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'Accept our cookie policy')

    // Verify default state of checkboxes
    cy.get('input[type="checkbox"]').each(($el) => {
        cy.wrap($el).should('not.be.checked')
    })

    // Check the first checkbox and assert it's checked 
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')

    // Check the second checkbox and assert both first and second checkboxes are checked
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    // Assert the first checkbox is still checked
    cy.get('input[type="checkbox"]').eq(0).should('be.checked')      
    // Ensure the third checkbox remains unchecked
    cy.get('input[type="checkbox"]').eq(1).should('be.checked')
})

it('Email input should support correct format', () => {
    cy.get('input[name="email"]').should('have.attr', 'type', 'email')
});
          
    /*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

it.only('User can submit form with all fields added', () => {
    // Add test steps for filling in ALL fields
    cy.log('Username will be filled')
    cy.get('#name').type('John')
    cy.get('input[name="email"]').type('validemail@yeap.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.get('input[type="date"]').invoke('val', '22-02-2025')
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[name="birthday"]').type('1987-09-15')
    cy.get('input[type="checkbox"]').eq(0).check()
    cy.get('input[type="checkbox"]').eq(1).check()
    cy.get('input[type="file"]').click()
    cy.get('input[type="file"]').selectFile('C:/Users/karin/Downloads/cypress_simple_tests-master/cypress_simple_tests/cypress/fixtures/cypress_logo.png', { force: true });
    cy.contains('button', 'Submit file').click()
    // Check if the success message "Submission received" is displayed
    cy.contains('Submission received').should('be.visible');
    })
