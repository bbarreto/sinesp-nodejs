var crypto = require('crypto');
var requests = require('request');
var parseXML = require('xml2js').parseString;
const uuidV4 = require('uuid/v4');

module.exports = {
  consultaPlaca: function (placa, callback) {

    /** Verifica se a placa foi informada */
    if (!placa) {
      callback({ error: 'Informe o parâmetro placa.' });
    }

    /** Chave secreta para criptografia */
    var secret = 'TRwf1iBwvCoSboSscGne';

    /** Criptografa a placa usando a chave do aplicativo */
    var token = crypto.createHmac('sha1', placa+secret).update(placa).digest('hex');

    /** Gerar a data da requisição */
    var data = new Date().toISOString().replace("T", " ").substr(0, 19);

    /** Cria o XML de chamada do serviço SOAP */
    var xml = '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>\
          <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\
            <soap:Header>\
              <b>samsung GT-I9192</b>\
              <c>ANDROID</c>\
              <i>-38.5284057</i>\
              <d>4.4.2</d>\
              <e>SinespCidadao</e>\
              <f>10.0.0.1</f>\
              <g>'+token+'</g>\
              <k>'+uuidV4()+'</k>\
              <h>-3.7583078</h>\
              <l>'+data+'</l>\
              <m>8797e74f0d6eb7b1ff3dc114d4aa12d3</m>\
            </soap:Header>\
            <soap:Body>\
              <webs:getStatus xmlns:webs="http://soap.ws.placa.service.sinesp.serpro.gov.br/">\
                <a>'+placa+'</a>\
              </webs:getStatus>\
            </soap:Body>\
          </soap:Envelope>';

    xml = xml.replace(/[\t\n]/gi, '');

    /** Montagem dos cabeçalhos da requisição */
    var headers = {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Accept": "text/plain, */*; q=0.01",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Host": "sinespcidadao.sinesp.gov.br",
      "Content-length": xml.length,
      "User-Agent": "SinespCidadao / 3.0.2.1 CFNetwork / 758.2.8 Darwin / 15.0.0",
      "Connection": "close"
    };

    /** Tenta realizar a requisição */
    try {

      requests.post({
          headers: headers,
          url: 'http://sinespcidadao.sinesp.gov.br/sinesp-cidadao/mobile/consultar-placa',
          body: xml
        }, function(error, response, body){

          if (error===null) {

            /** Faz o parse do XML recebido */
            parseXML(body, {
              explicitArray: false
            }, function (err, result) {
              resultado = result['soap:Envelope']['soap:Body']['ns2:getStatusResponse']['return'];
            });
            callback(resultado);

          } else {
            callback({ error: error });
          }
          
        }
      );

    } catch (err) {
      callback({ error: err });
    }
 
  }

};