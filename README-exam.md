to run docker containers in development mode

- command to start building images and containers: docker compose --file docker-compose-dev.yaml up -d
- run Sequelize migrations and seeders inside the backend container: docker exec -it exam-freshcode-server-dev-1 sh
  Apply migrations: npx sequelize db:migrate
  Seed the database: npx sequelize db:seed:all
- application starts:
  Front: http://localhost:5000
  Server API: http://localhost:3000
- to check on which port the application started, you need to execute the command: docker container inspect exam-freshcode-front-react-1

address at the end in the "IPAddress" field

Local Development Configuration

If you want to run the project without Docker, make sure to use the following configuration files and settings:

PostgreSQL (server/src/config/postgresConfig.json)

"username": "postgres",
"password": "qwerty",
"database": "squad-help-dev",
"host": "localhost"

MongoDB (server/src/config/mongoConfig.json)

"database": "squad-help-dev",
"host": "localhost",
"port": 27017

Environment Variables (server/.env)

PORT=5000
NODE_ENV=development

Client Configuration (client/src/constants.js)

const serverPort = 5000;

Ports:

Frontend (React): http://localhost:3000
Backend (Server API): http://localhost:3000

Docker Development Configuration
If you prefer to run the project using Docker (docker-compose-dev.yaml), use the following settings:

PostgreSQL (server/src/config/postgresConfig.json)

"username": "postgres",
"password": "password",
"database": "todo-dev",
"host": "db-dev"

MongoDB (server/src/config/mongoConfig.json)

"database": "squad-help-dev",
"host": "mongo-dev",
"port": 27017

Environment Variables (server/.env)

PORT=3000
NODE_ENV=development

Client Configuration (client/src/constants.js)

const serverPort = 3000;

Ports:

Frontend: http://localhost:5000
Backend (Server API): http://localhost:3000

Bug fixes

Partial backend routes refactoring, improved database logic, resolved UI layout issues, updated npm dependencies and Docker images.

LAYOUT

Created a responsive "How It Works" page layout based on atom.com/how-it-works using Flexbox and adaptive images. Linked the page from the user menu.

Added dynamic branding

Added dynamic branding: Events page with countdown timers (local storage, sorting, validation, badge), and ButtonGroup component on the start contest page. Links added to user menu.

DB NO-SQL

Added a playground-1.mongodb.js aggregation query to server/src/models/mongoModels to count the number of documents in the Messages collection containing the word "паровоз" (case-insensitive).

DB SQL

Added db-sql directory

Task Display the number of users by roles {admin: 40, customer: 22, ...} File: task7.pgsql

All users with the customer role who made orders during the New Year holidays from December 25 to January 14 must receive 10% cashback from all orders during this period. File: task8.pgsql

For the creative role, you need to pay 3 users with the highest rating $ 10 to their accounts. File: task9.pgsql

developed a scheme for chat migration from NO-SQL to SQL. File: task6.pgsql & squad_help_dev.drawio

NODEJS

Created error logger server/src/utils/logger.js

Created a schedule to copy and clear the contents of the error.log file, and move the data to a new file named error-YYYY-MM-DD.log in server/logs/

FULLSTACK

added new role Moderator
Added distribution of the moderator's decision to Creative's mail

Migrate chat from Mongo to Postgres

described Sequelize models and migrations
changed the logic of requests on the server
