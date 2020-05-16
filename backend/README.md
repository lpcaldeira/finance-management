# curso-nodejs
Testando conhecimentos de JS com os cursos da Rocketseat

Depois de baixar o nodemon, entramos na etapa de instalar o Docker e o MongoDB.

Para isso, entramos no site do Docker e o baixamos por lá.

Após a instalação, executamos um `docker pull mongo` sem as crases no terminal ou gitbash.

Depois disso, precisamos subir a máquina virtual com o comando `docker run --name instancia_mongodb -p 27017:27017 -d mongo` sendo que:
    --name é um nome qualquer para a máquina virtual;
    -p estamos dizendo que quando acessar a porta 27017 da nossa máquina, redirecione para a 27017 da máquina virtual que o mongo está escutando;
    -d é a imagem que eu quero utilizar. Neste caso é o mongo.

A imagem seria um pré select / uma base de configurações.

Para testar mais a fundo para ver as configurações desta máquina virtual rodando, podemos usar o Robo 3T.

Após fazer o download, abra-o e crie uma conection informando o nome, localhost e a porta 27017.

Ali vamos conseguir ver as bases de dados, os usuários, etc.

Se você desligar o pc ou reiniciar, essa instância vai cair e ficar com status EXITED mas você pode subir ela novamente com o comando `docker start instancia_mongodb`.

Agora vamos instalar o mongoose com o comando `npm install mongoose`. O que é isso? Ele é um ORM. Ao invés de você utilizar os SELECT, INSERT, etc, a gente sempre utiliza código JS para fazer tudo isso. Ele faz um Object Relational Mapping para facilitar trabalhar com qualquer banco de dados sem precisar se adaptar aos comandos de cada uma.

Agora vamos começar criando os models.

Cada model tem que ter o Schema e nele teremos quais serão os campos que serão salvos no banco de dados

Instalando a biblioteca require-dir com `npm install require-dir`, ao invés de importarmos cada model que existir dentro da aplicação, podemos usar esta lib para importar todos automaticamente apenas passando a pasta onde eles estão. No caso `requireDir('./src/models')`.

Então, criamos um label chamado `/api` para todas as requisições de forma que, quando executada a requisição, se não possuir este formato, retornará erro.

Também criamos um arquivo chamado `routes.js` que possui todas as rotas que a aplicação irá possuir.

Adicionando permissão de recebimento de formato json e função para `Create` no mongodb.

Incluindo requests via Postman.

Continuando a criar o crud que falta. Detail, Update e Delete.

A próxima etapa será criar uma paginação para os registros.

Para isso, vou multiplicar o primeiro registro 20 vezes e instalar o módulo `npm install mongoose-paginate`.

