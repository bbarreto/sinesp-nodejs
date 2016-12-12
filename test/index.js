var should = require('chai').should(),
    sinesp = require('../index'),
    consultaPlaca = sinesp.consultaPlaca;


describe('#consultaPlaca', function() {
  it('consulta a placa AAA0001', function() {
    consultaPlaca('AAA0001', function (retorno) {
    	retorno.should.be.an('object');
    });
  });
});