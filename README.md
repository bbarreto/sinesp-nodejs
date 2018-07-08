# sinesp-nodejs [![npm version](https://badge.fury.io/js/sinesp-nodejs.svg)](https://badge.fury.io/js/sinesp-nodejs) [![Build Status](https://travis-ci.org/bbarreto/sinesp-nodejs.svg?branch=master)](https://travis-ci.org/bbarreto/sinesp-nodejs)
Consulte qualquer placa de veículo brasileiro na base de dados do SINESP a partir de sua aplicação desenvolvida em node.js.

Para instalar o pacote, utilize npm:
```sh
npm install sinesp-nodejs
```

Após a instalação, utilize em sua aplicação:
```javascript
sinesp = require('sinesp-nodejs')

/* Realizar uma consulta contra a placa AAA-0001 */
sinesp.consultaPlaca('AAA0001').then(dados => {
  console.log(dados);
}).catch(err => {
  console.log(err);
})
```

O retorno da função é um objeto com os seguintes dados:
```json
{
	"codigoRetorno": "0",
	"mensagemRetorno": "Sem erros.",
	"codigoSituacao": "0",
	"situacao": "Sem restrição",
	"modelo": "FORD/ESCORT 1.8 XR3",
	"marca": "FORD/ESCORT 1.8 XR3",
	"cor": "Cinza",
	"ano": "1990",
	"anoModelo": "1990",
	"placa": "AAA0001",
	"data": "07/07/2018 às 14:12:48",
	"uf": "PR",
	"municipio": "CURITIBA",
	"chassi": "49500",
	"dataAtualizacaoCaracteristicasVeiculo": "13/04/2018",
	"dataAtualizacaoRouboFurto": "06/07/2018",
	"dataAtualizacaoAlarme": "06/07/2018"
}
```

## Atenção
Este projeto não possui nenhum vínculo oficial com o Sistema Nacional de Informações de Segurança Pública (SINESP). O software é disponibilizado da forma como está aqui e não há garantias que ele irá funcionar sempre. Como a API do SINESP não é publicamente documentada, esta biblioteca pode parar de funcionar a qualquer momento sem aviso prévio.

Sinta-se livre para fazer um fork e enviar um pull request com melhorias ou uma nova implementação, caso tudo pare de funcionar e você saiba como recuperar.

[![https://nodei.co/npm/sinesp-nodejs.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/sinesp-nodejs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/sinesp-nodejs)
