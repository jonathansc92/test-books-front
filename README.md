## Descrição

Front desenvolvido em VueJs com Bootstrap 5.

## Decisão da arquitetura utilizada

Neste projeto a ideia era separar as responsabilidades.
Na pasta src temos algumas estruturas de pastas.

- **stores**: Utilizamos controle de estados, utilizando um conceito mais atual PINIA, ao invés do VUEX.

## Lista de bibliotecas de terceiros utilizadas

- pinia; 
- vue-toastification;
- vee-validate;
- yup;
- vue-router;

## Quais requisitos obrigatórios que não foram entregues

Neste repositório foram entregues todos os requisitos.

## Como executar o projeto
- Na raiz do projeto renomeie o arquivo **.env.example** para **.env**;
- Execute o comando: 
```
    docker-compose up -d
```

## Executar Manualmente
- Rodar na raiz do projeto o comando
```
    npm i
```
- Rodar o comando
```
    npm run serve
```

## Rotas
- Livros [http://localhost:5173/livros](http://localhost:5173/livros)
- Autores [http://localhost:5173/autores](http://localhost:5173/autores)
- Assuntos [http://localhost:5173/assuntos](http://localhost:5173/assuntos)

## O que faria se tivesse mais tempo?
- Adicionaria testes;
- Deixaria os cadastros de assuntos e autores com modal;

## Autor
- Autor - Jonathan Cruz
- [https://jonathansc92.github.io/jonathancruzdev/?language=ptBr](https://jonathansc92.github.io/jonathancruzdev/?language=ptBr)


