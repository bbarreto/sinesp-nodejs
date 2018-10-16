const crypto = require('crypto'),
      fetch = require('node-fetch'),
      parseXML = require('xml2js').parseString,
      HttpsProxyAgent = require('https-proxy-agent')

module.exports = {
  consultaPlaca: function (placa, callback) {

    /** Verifica se a placa foi informada */
    if (!placa) {
      return Promise.reject('Informe o parâmetro placa.');
    }

    /** Chave secreta para criptografia */
    const secret = '#8.1.0#g8LzUadkEHs7mbRqbX5l';

    /** Criptografa a placa usando a chave do aplicativo */
    const token = crypto.createHmac('sha1', placa+secret).update(placa).digest('hex');

    /** Gerar a data da requisição */
    const data = new Date().toISOString().replace("T", " ").substr(0, 19);

    /** Cria o XML de chamada do serviço SOAP */
    const xml = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\
      <v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance"\
      xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/"\
      xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">\
        <v:Header>\
          <b>motorola XT1635-02</b>\
          <c>ANDROID</c>\
          <d>8.1.0</d>\
          <e>4.1.5</e>\
          <f>192.168.0.100</f>\
          <g>'+token+'</g>\
          <h>0.0</h>\
          <i>0.0</i>\
          <k/>\
          <l>'+data+'</l>\
          <m>8797e74f0d6eb7b1ff3dc114d4aa12d3</m>\
        </v:Header>\
        <v:Body>\
          <n0:getStatus xmlns:n0="http://soap.ws.placa.service.sinesp.serpro.gov.br/">\
            <a>'+placa+'</a>\
          </n0:getStatus>\
        </v:Body>\
      </v:Envelope>';

      /** Montagem dos cabeçalhos da requisição */
      const headers = {
        "User-Agent": "ksoap2-android/2.6.0+",
        "SOAPAction": "",
        "Content-type": "text/xml;charset=UTF-8",
        "Accept-Encoding": "gzip",
        "Content-length": xml.length,
        "Connection": "Keep-Alive"
      }

      /**
       ** Utilizar proxy caso haja configuração
       ** - O proxy é necessário se o código estiver rodando em um
       **   servidor fora do Brasil
       */
      const proxy = process.env.HTTP_PROXY ? new HttpsProxyAgent(process.env.HTTP_PROXY) : null

      return fetch('https://cidadao.sinesp.gov.br/sinesp-cidadao/mobile/consultar-placa/v4', {
        method: 'POST',
        body: xml,
        headers: headers,
        agent: proxy
      }).then(function(response) {

        if (response.status === 200) {
          return response.text().then(text => {
            parseXML(text, {
              explicitArray: false
            }, function (err, result) {
              resultado = result['soap:Envelope']['soap:Body']['ns2:getStatusResponse']['return'];
            })
            /** Verifica se o resultado não contém erros para retornar corretamente */
            if (resultado.codigoRetorno!=='0') return Promise.reject(resultado)
			if(callback){
				callback(resultado)
			}
            return resultado
          })
        } else {
          return response.text().then(text => {
			if(callback){
				callback(resultado)
            }
			return Promise.reject(text)
          });
        }
      })

  }

};
