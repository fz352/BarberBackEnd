## Comandos para rodar o projeto

Instalar prisma globalmente 

. npm install @prisma/client
. npm i 
. npm install prisma --save-dev
. npx prisma generate
. npm run dev






# Comando dado para puxar todas as alterações do db depois que alguem cria um novo campo
npx prisma migrate dev


# exemplo nova migration

npx prisma format
npx prisma generate
npx prisma migrate dev --name add-idPessoa-to-user


npx prisma format
npx prisma generate
npx prisma migrate dev --name add-idPessoa-to-user-two