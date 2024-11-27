# Relatório Técnico de Desenvolvimento e Implantação

O Relatório Técnico de Desenvolvimento e Implantação é um documento que deve descrever de maneira **técnica** e objetiva todo o processo de desenvolvimento e implantação do software. Todas as seções devem descrever o que foi feito de acordo com a visão técnica da equipe, sem necessidade de incluir a visão da entidade.

## Tecnologias Utilizadas

Front-End
---
- React (Linguagem)
- Next js (Framework)
- Tailwind css (Estilização)
- Axios (Executar requisições)
- Material/UI (Componentes de front-end)

Back-End
---
- Node (Linguagem)
- Typescript (Linguagem)
- Nest js (Framework)
- Fastify (Faz a contrução da api)
- Bcrypt (Gerar segurança as requisições geradas)
- Node Mailer (Biblioteca para enviar email)
- Swagger (Documentação para a API)
- TypeORM (Sistema para mapeamento do banco de dados)
- JWT (Criptografia para payload do JSON)

## Arquitetura

### Front-End

O front-end é desenvolvido utilizando a biblioteca React e o framework Next.js para fornecer uma aplicação com SSR (Server-Side Rendering) e SSG (Static Site Generation), otimizando o SEO e o tempo de carregamento.
O Tailwind CSS é usado para estilização, fornecendo um design moderno e responsivo, enquanto a biblioteca Material-UI oferece componentes prontos e reutilizáveis. As requisições da API são gerenciadas pelo Axios.

#### Fluxo de execução:

    O usuário interage com a interface (React + Material-UI).
    As requisições de dados são feitas ao backend via Axios.
    O Next.js cuida do gerenciamento de páginas, roteamento e renderização.

### Back-End

O back-end utiliza Node.js em conjunto com o framework NestJS, implementando o padrão MVC (Model-View-Controller) para organização do código. O Fastify é usado como servidor HTTP pela sua performance superior.

#### Principais Funcionalidades:

    Autenticação: JWT para autenticação segura, permitindo o envio de tokens protegidos.
    Segurança: Bcrypt para hash de senhas e proteção contra ataques de força bruta.
    Envio de Emails: Node Mailer integrado para envio de emails transacionais.
    Documentação: Swagger é usado para gerar documentação interativa da API.
    Banco de Dados: TypeORM para ORM, gerenciando as operações com o banco de dados relacional.

#### Fluxo de execução:

    Recebe as requisições do front-end.
    Processa a lógica de negócio, como autenticação, operações CRUD, etc.
    Responde ao front-end com os dados requisitados ou mensagens de erro.

### Banco de Dados

O banco de dados utilizado é relacional (como PostgreSQL ou MySQL), mapeado através do TypeORM.
Os modelos de dados são organizados para otimizar consultas e escalabilidade, com suporte a migrações de esquema.

#### Principais Funcionalidades:

    Gerenciamento de tabelas e relacionamentos.
    Consulta, criação, atualização e exclusão de dados.
    Suporte a índices para melhorar o desempenho de queries.

#### Fluxo de execução:

    O back-end realiza consultas ao banco usando TypeORM.
    Os dados são mapeados para objetos, que são utilizados pela lógica de negócio.

## Diagrama de Arquitetura

+-------------+         +----------------+         +-----------------+
|             |         |                |         |                 |
|  Front-End  |<------->|   Back-End     |<------->|   Banco de Dados|
| (Next.js,   |         | (Nest.js,      |         | (TypeORM,       |
|  React)     |         |  Fastify)      |         |  PostgreSQL)    |
|             |         |                |         |                 |
+-------------+         +----------------+         +-----------------+
       ▲                          ▲                           ▲
       |                          |                           |
       |         Axios (HTTP)     |    TypeORM (SQL)          |
       |                          |                           |
       +-------------------------------------------------------+
                            Interação do Sistema

## Instalação do Sofware

A implantação do projeto funcionou da seguinte maneira:
Primeiramente marcamos uma data com nosso beneficiado(19/11/24), combinamos de fazer uma entrega do projeto e tutorial de como utilizar o mesmo.
Após chegarmos na empresa, nos direcionamos a uma sala de reuniões com alguns dos colaboradores (Analista de sistemas da empresa, Gerente de produção e RH)
Primeiramente, mostramos todas as funcionalidades do projeto na íntegra, funcionando em frente aos colaboradores da empresa.
Após isto, partimos para um meio mais técnico, mostramos quais as tecnologias utilizadas e métodos utilizados, segurança e banco de dados.
A instalação em ambiente funcional para público não será feita pelo grupo, por conta de ser um produto de alto risco, porém, irá ser entregue o mais polido possível para que a integração seja a mais simples possível para o órgão colaborado.
O projeto foi aprovado pelos gestores e desenvolvedores.

## Desafios e Dificuldades

Descrever os principais desafios e dificuldades encontrados durante o desenvolvimento e implantação do projeto. Isso deve incluir também possíveis conflitos com a equipe e/ou com a entidade em relação à parte técnica.

1. Falta de entendimento na hora que começamos a gerar o projeto, tivemos uma certa dificuldade em alinhar as ideias.

2. Algumas ideias ainda assim tivemos dificuldade, o front solicitava alguma função e acabava recebendo algo que não queria, o que gerava um desgaste nos dois lados que precisavam modificar os dados por conta do conflito.

3. A funcionalidade de authenticação por cookies foi algo que precisou ser estudado e não era dominado por ninguém do grupo, o que foi uma grande dificuldade para fazer e ocupou grande tempo do trabalho.


## Evidências do desenvolvimento e implantação

Capturas de tela do sistema desenvolvido e do ambiente de desenvolvimento. Testes realizados e feedback da entidade durante o processo de implantação.