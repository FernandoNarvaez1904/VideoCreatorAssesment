# Awesome Video Creator

This api is deployed at  https://videocreatorassesment-production.up.railway.app/

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `./src/data-source.ts` file
3. Run `npm start` command
4. Generate migrations with: `npm run typeorm migration:generate ./src/migrations/migrationName`
5. Run migrations with: `npm run typeorm migration:run`