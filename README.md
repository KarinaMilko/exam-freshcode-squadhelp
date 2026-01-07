# 🇺🇦 Українська Версія
## 🎓 exam-freshcode-squadhelp: Звіт про Рефакторинг та Розвиток

Цей репозиторій є **практичним портфоліо**, яке слугує демонстрацією всіх ключових навичок та знань, здобутих протягом курсу. Код відображає успішне впровадження наскрізних рішень у повноцінний проєкт, включаючи налаштування **складної інфраструктури (Docker)**, реалізацію **фінансових транзакцій (CRUD)** та **стандартизацію API** відповідно до професійних вимог.

---

### ⚙️ Конфігурація та Запуск Проєкту

Проєкт підтримує два режими запуску: **Docker Development** (рекомендовано) та **Local Development**.

#### 🐳 Docker Development (Рекомендовано)

Для запуску контейнерів у режимі розробки необхідно використовувати наданий скрипт.

| Команда | Призначення |
| :--- | :--- |
| **`sudo bash start-dev.sh`** | **Основна команда.** Запускає збірку образів та контейнерів на основі `docker-compose-dev.yaml`. |
| `docker exec -it exam-freshcode-server-dev-1 sh` | Вхід у backend-контейнер для виконання міграцій. |
| `npx sequelize db:migrate` | Застосування міграцій Sequelize. |
| `npx sequelize db:seed:all` | Заповнення бази даних початковими даними (Seeders). |

| Доступні Порти | Адреса |
| :--- | :--- |
| **Frontend (React)** | `http://localhost:5000` |
| **Backend (Server API)** | `http://localhost:3000` |

> ℹ️ Щоб перевірити, на якому IP-адресі запущений frontend-контейнер, скористайтеся командою `docker container inspect exam-freshcode-front-react-1` і знайдіть поле `"IPAddress"`.

---

#### 🛠️ Local Development (Без Docker)

Якщо Ви запускаєте проєкт без Docker, переконайтеся, що конфігурація баз даних відповідає наступним локальним налаштуванням:

| Компонент | Файл | Ключові Налаштування |
| :--- | :--- | :--- |
| **PostgreSQL** | `server/src/config/postgresConfig.json` | `"username": "postgres"`, `"password": "qwerty"`, `"host": "localhost"` |
| **MongoDB** | `server/src/config/mongoConfig.json` | `"host": "localhost"`, `"port": 27017` |
| **Server ENV** | `server/.env` | `PORT=5000`, `NODE_ENV=development` |
| **Client Constants** | `client/src/constants.js` | `const serverPort = 5000;` |

---

### ✅ Звіт про Виконані Завдання

| Секція | Зміст та Впровадження |
| :--- | :--- |
| **Bug Fixes / Refactoring** | Виправлено критичні баги, частково рефакторено backend-роути, покращено логіку роботи з БД, усунуто проблеми верстки, оновлено npm-залежності та Docker-образи. |
| **LAYOUT** | Створено адаптивну сторінку **"How It Works"** з використанням Flexbox. Посилання додано до меню користувача. |
| **Dynamic Branding (React)** | Додано сторінку **Events** з таймерами зворотного відліку (зберігання у Local Storage, сортування, валідація, бейдж). Також реалізовано компонент **ButtonGroup** на сторінці створення конкурсу. |
| **DB NO-SQL** | Додано файл `playground-1.mongodb.js` (`server/src/models/mongoModels`) з агрегаційним запитом для підрахунку документів у колекції `Messages` зі словом "паровоз" (без урахування регістру). |
| **DB SQL** | Створено теку `db-sql` з файлами: `task7.pgsql`, `task8.pgsql`, `task9.pgsql` та `task6.pgsql` (схема міграції чату). Розроблено **ERD-схему** міграції чату (`squad_help_dev.drawio`). |
| **NODEJS** | Створено логгер помилок (`server/src/utils/logger.js`). Реалізовано **планувальник** для щоденного копіювання, трансформації та очищення лог-файлу. |
| **FULLSTACK** | Впроваджено нову роль **Moderator**. Реалізовано **модерацію оферів** (з окремою сторінкою, доступною лише модератору) та **розсилку** рішення модератора на пошту Creative. |

---

# 🇬🇧 English Version
## 🎓 exam-freshcode-squadhelp: Refactoring and Development Report

This repository serves as a **practical portfolio**, demonstrating all key skills and knowledge acquired throughout the course. The code reflects the successful implementation of end-to-end solutions in a full-fledged project, including setting up a **complex infrastructure (Docker)**, implementing **financial transactions (CRUD)**, and **standardizing the API** according to professional requirements.

---

### ⚙️ Configuration and Project Launch

The project supports two launch modes: **Docker Development** (recommended) and **Local Development**.

#### 🐳 Docker Development (Recommended)

To run containers in development mode, you must use the provided script.

| Command | Purpose |
| :--- | :--- |
| **`sudo bash start-dev.sh`** | **Main command.** Starts building images and containers based on `docker-compose-dev.yaml`. |
| `docker exec -it exam-freshcode-server-dev-1 sh` | Entering the backend container to run migrations. |
| `npx sequelize db:migrate` | Applying Sequelize migrations. |
| `npx sequelize db:seed:all` | Seeding the database with initial data. |

| Available Ports | Address |
| :--- | :--- |
| **Frontend (React)** | `http://localhost:5000` |
| **Backend (Server API)** | `http://localhost:3000` |

> ℹ️ To check which IP address the frontend container started on, use the command `docker container inspect exam-freshcode-front-react-1` and find the `"IPAddress"` field.

---

#### 🛠️ Local Development (Without Docker)

If you run the project without Docker, ensure that the database configuration matches the following local settings:

| Component | File | Key Settings |
| :--- | :--- | :--- |
| **PostgreSQL** | `server/src/config/postgresConfig.json` | `"username": "postgres"`, `"password": "qwerty"`, `"host": "localhost"` |
| **MongoDB** | `server/src/config/mongoConfig.json` | `"host": "localhost"`, `"port": 27017` |
| **Server ENV** | `server/.env` | `PORT=5000`, `NODE_ENV=development` |
| **Client Constants** | `client/src/constants.js` | `const serverPort = 5000;` |

---

### ✅ Executed Tasks Report

| Section | Content and Implementation |
| :--- | :--- |
| **Bug Fixes / Refactoring** | Fixed critical bugs, partially refactored backend routes, improved DB logic, resolved UI layout issues, updated npm dependencies and Docker images. |
| **LAYOUT** | Created a responsive **"How It Works"** page layout using Flexbox. The link has been added to the user menu. |
| **Dynamic Branding (React)** | Added dynamic branding: **Events page** with countdown timers (local storage, sorting, validation, badge), and the **ButtonGroup** component on the start contest page. |
| **DB NO-SQL** | Added a `playground-1.mongodb.js` aggregation query (`server/src/models/mongoModels`) to count documents in the `Messages` collection containing the word "паровоз" (case-insensitive). |
| **DB SQL** | Created `db-sql` directory with files: `task7.pgsql`, `task8.pgsql`, `task9.pgsql`, and `task6.pgsql` (chat migration schema). The **ERD scheme** for chat migration is in `squad_help_dev.drawio`. |
| **NODEJS** | Created an error logger (`server/src/utils/logger.js`). Implemented a **scheduler** for daily copying, transformation, and clearing of the error log file. |
| **FULLSTACK** | Introduced a new role: **Moderator**. Implemented **offer moderation** (with a dedicated page accessible only to the moderator) and **email dispatch** of the moderator's decision to the Creative. |
| **Chat Migration** | Migrated chat logic from MongoDB to PostgreSQL: Sequelize **models and migrations** were described; server request logic was changed to work with the SQL DB. |
| **Chat Migration** | Проведена міграція логіки чату з MongoDB на PostgreSQL: описано Sequelize **моделі та міграції**; змінено логіку запитів на сервері для роботи з SQL-БД. |
