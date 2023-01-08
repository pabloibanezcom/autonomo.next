/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // The new url should include "/login"
    cy.url().should('include', '/login');

    // The new page should contain an h1 with "Track your business with"
    cy.get('h1').contains('Track your business with');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
