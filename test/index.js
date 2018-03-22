const chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    sinesp = require('../index'),
    placaTeste = 'AAA0001'

chai.use(chaiAsPromised)
const should = chai.should()
const expect = chai.expect
const assert = chai.assert

describe('#consultaPlaca', function() {

  it('consulta a placa '+placaTeste, function() {
    this.timeout(25000)
    return assert.isFulfilled(sinesp.consultaPlaca(placaTeste))
  })

  it('placa nao informada', () => {
     return expect(sinesp.consultaPlaca(null)).to.be.rejectedWith('Informe o parâmetro placa.')
  })
})
