//Grupo de testes
describe('Busca por voos', () => {

  //Contexto/Cenário
  context('Não Logado', () => {
    //caminho para o arquivo com a massa de teste
    const massaVoos = require('../fixtures/massaVoos')

   // Inicialização dos testes //Antes dos Testes   
  beforeEach(() => {
    cy.visit('/') //abrir a página inicial da URL informanda no cypress.config.js
  })

  //Exemplo de teste simples
  it('Buscar voos entre São Paolo e Cairo - Simples', () => {
    //Verifica se o título da guia é igual 'BlazeDemo
    cy.title().should('eq', 'BlazeDemo')

    //Preenche a origem e o destino do voo
    cy.get('select.form-inline')
      .eq(0) //origem
      .select('São Paolo')

    cy.get('select.form-inline')
      .eq(1) //destino
      .select('Cairo')

    //Aperta o botão Find Flights
    cy.get('input.btn.btn-primary')
      .click()

    //Ocorre a transição para a página de Reserva
    cy.title().should('eq', 'BlazeDemo - reserve')

    //Verificar a frase de origem e destino do voo
    cy.get('.container h3')
      .should('have.text', 'Flights from São Paolo to Cairo: ' )

    //Escolhe o primeiro voo
    cy.get('tbody input[type="submit"]')
      .eq(0)
      .click()

  });

    //Exemplo de teste Data Driven

      massaVoos.array.forEach(({origem, destino}) => {
      
    it(`Buscar voos entre ${origem} e ${destino} `, () => {
      //Verifica se o título da guia é igual 'BlazeDemo
      cy.title().should('eq', 'BlazeDemo')
  
      //Preenche a origem e o destino do voo
      cy.get('select.form-inline')
        .eq(0) //origem
        .select(origem)
               
      cy.get('select.form-inline')
        .eq(1) //destino
        .select(destino)
  
      //Aperta o botão Find Flights
      cy.get('input.btn.btn-primary')
        .click()
  
      //Ocorre a transição para a página de Reserva
      cy.title().should('eq', 'BlazeDemo - reserve')
  
      //Verificar a frase de origem e destino do voo
      cy.get('.container h3')
        .should('have.text', `Flights from ${origem} to ${destino}: ` )
  
      //Escolhe o primeiro voo
      cy.get('tbody input[type="submit"]')
        .eq(0)
        .click()
  
      }); //fim do it
    }) // fim do array (massa)

  }) //fim do context
  
}) //fim do describe