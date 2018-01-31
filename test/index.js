var should = require('chai').should(),
    sinesp = require('../index'),
    consultaPlaca = sinesp.consultaPlaca;


describe('#consultaPlaca', function() {
  it('consulta a placa AAA0001', function(done) {
    consultaPlaca('AAA0001', function (retorno) {
    	retorno.should.be.an('object');
      done();
    });
  });
});

describe('#retornaErro', function() {
  it('verifica se retornou código de erro 0', function(done) {
    consultaPlaca('AAA0001', function (retorno) {
    	retorno.should.have.a.property('codigoRetorno').equal('0');
      done();
    });
  });
});

describe('#retornaErro', function() {
  it('verifica se retornou o código da situação', function(done) {
    consultaPlaca('AAA0001', function (retorno) {
    	retorno.should.have.a.property('codigoSituacao');
      done();
    });
  });
});
