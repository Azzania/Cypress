describe('Login SAUCEDEMO', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })
  it('Success', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.wait(100)
    cy.get('.app_logo').should('be.visible')
    cy.get('.title').should('be.visible')
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
  })
    it('Failed', () => {
      cy.get('#user-name').type('wronguser')
      cy.get('[data-test="password"]').type('wrongpassword')
      cy.get('[data-test="login-button"]').click()
      cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
    })
    it('Failed - Locked User', () => {
      cy.get('#user-name').type('locked_out_user')
      cy.get('[data-test="password"]').type('secret_sauce')
      cy.get('[data-test="login-button"]').click()
      cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out')
  })
})