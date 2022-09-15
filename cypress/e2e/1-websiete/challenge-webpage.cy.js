/// <reference types="cypress" />

/// Automation challenge for kiwi bot
context('QA challenge for QA engineer in kiwibot', () => {
    describe('Should visit https://www.kiwibot.com/ to verify if the QA Engineer position is open starting from the home page and filtering by remote jobs in the careers section, then subscribe to the newsletter.', () =>{
        
    before(() => {
            cy.visit(' https://www.kiwibot.com/')
    })
/// Url 
    describe('Verify the URL and navigate to Carrers page', () =>{
            
        it('hostname should be www.kiwibot.com ', () =>{
            cy.location('hostname').should('eq','www.kiwibot.com')
        })
        it('select Carrers button and redirect to /carrers', () =>{
            cy.get('ul > li > a[href="/careers"]').click();
         })
    })
/// Filter 
    describe('Go to open positions then filter by remote jobs', () =>{ 
        it('Should find the Open positions button', () =>{
            cy.get('#w-node-_991ba705-2ec8-8917-0157-f9fd316d5302-e0f174e1 > a[href="#Open-positions"]').click();
         })
        it('filter by remote jobs', () =>{
            cy.get('div div label[class="cw-facet-checkbox-label"]').click();
         })
    })
    describe('Verify if the QA Engineer position is open', () =>{ 
        it('The QA position exist in the list of open positions', () =>{
            cy.get('div ul li  a').contains('QA Engineer')
         })
    })
/// Newsletter
    describe('subscribe to newsletter', () =>{ 
        it('Should Subscribe to the newsletter', () =>{
            cy.get('section form#wf-form-Subscribe-Form input#email').type('mdelgador24@gmail.com');
            cy.get('section form#wf-form-Subscribe-Form input[type="submit"]').click();
         })
    })

    })
})