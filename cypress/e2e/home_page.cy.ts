describe('The Home Page', () => {
	it('successfully loads', () => {
		cy.visit('/edit.php?post_type=product&page=delete-all-products-component') // change URL to match your dev URL

		cy.get('input[name=log]').type(' admin')

		// {enter} causes the form to submit
		cy.get('input[name=pwd]').type(`EdgIe0lPNkthvUqAki{enter}`)

		cy.url().should('include', '/edit.php')
	})
})