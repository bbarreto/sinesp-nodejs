# sinesp-nodejs [![npm version](https://badge.fury.io/js/sinesp-nodejs.svg)](https://badge.fury.io/js/sinesp-nodejs)
Consulte qualquer placa de veículo brasileiro na base de dados do SINESP a partir de sua aplicação desenvolvida em node.js.

Para instalar o pacote, utilize npm:
```sh
npm install sinesp-nodejs
```

Após a instalação, utilize em sua aplicação:
```javascript
sinesp = require('sinesp-nodejs');

/* Realizar uma consulta contra a placa AAA-0001 */
sinesp.consultaPlaca('AAA0001', function (retorno) {
	console.log(retorno);
});
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
  "cor": "CINZA",
  "ano": "1990",
  "anoModelo": "1990",
  "placa": "AAA0001",
  "data": "10/12/2016 às 14:49:22",
  "uf": "PR",
  "municipio": "CURITIBA",
  "chassi": "************49500"
}
```

Sempre que a variável `codigoRetorno` for diferente de 0 (zero), é que houve um erro de pesquisa. Exemplo:
```json
{
  "codigoRetorno": "1",
  "mensagemRetorno": "Não foi possível estabelecer comunicação entre Sinesp Cidadão e RENAVAM."
}
```

Se houver um erro de comunicação com o SINESP, será retornado um objeto com o item `error`. Exemplo:
```json
{
  "error": "<mensagem de erro>"
}
```

## Atenção
Este projeto não possui nenhum vínculo oficial com o Sistema Nacional de Informações de Segurança Pública (SINESP). O software é disponibilizado da forma como está aqui e não há garantias que ele irá funcionar sempre. Como a API do SINESP não é publicamente documentada, esta biblioteca pode parar de funcioanar a qualquer momento sem aviso prévio.

Sinta-se livre para fazer um fork e enviar um pull request com melhorias ou uma nova implementação, caso tudo pare de funcionar e você saiba como recuperar.

[![https://nodei.co/npm/sinesp-nodejs.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/sinesp-nodejs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/sinesp-nodejs)