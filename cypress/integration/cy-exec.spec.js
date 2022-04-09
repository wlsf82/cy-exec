it('executes shell commands, .sh, .js, and .py files', () => {
  cy.exec('chmod 755 execFiles/createTemporaryTextFile.sh && ./execFiles/createTemporaryTextFile.sh')
  cy.exec('chmod 755 execFiles/createFixtureAsJson.sh && ./execFiles/createFixtureAsJson.sh')

  cy.readFile('temp/test.txt').should('contain', 'This is a test file.')
  cy.readFile('cypress/fixtures/test.json').then(({name}) => {
    expect(name).to.equal('Walmyr Lima e Silva Filho')
  })
  cy.readFile('cypress/fixtures/test.json')
    .its('name')
    .should('be.equal', 'Walmyr Lima e Silva Filho')

  cy.exec('node execFiles/test.js')
    .its('stdout')
    .should('be.equal', 'Hello, Cypress!')

  cy.exec('python3 execFiles/test.py').its('stdout')
    .should('be.equal', 'Hi, Cypress!')

  cy.exec('rm -rf temp/')
  cy.exec('rm cypress/fixtures/test.json')
})