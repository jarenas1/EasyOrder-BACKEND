# EasyOrder Backend

## Description
**EasyOrder** is a SaaS solution for nightclub management, allowing users to scan QR codes on tables to place orders directly from their mobile devices. The backend of this application is developed using NestJS.

## Technologies Used
- NestJS
- PostgreSQL
- Docker (optional)
- JWT for authentication

## Prerequisites
- **Node.js**: Make sure you have Node.js installed on your system. [Download Node.js](https://nodejs.org/)
- **npm**: Comes bundled with Node.js.
- **PostgreSQL**: If you're not using Docker for the database.
- **Docker** (Optional): Recommended if you want to use containers for the database.
- **Git**: To clone the repository.

## Installation

### 1. Clone the Repository

Clone the backend repository to your local machine:
```bash
git clone https://github.com/jarenas1/EasyOrder-BACKEND.git
cd EasyOrder-BACKEND
```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    ```bash
    cp .env.example .env
    ```

    ## Environment Variables
- `DB_PORT`: 5432
- `DB_HOST`: dpg-crl3i0t6l47c73fqvclg-a
- `DB_USER`: backend_easyorder_user
- `DB_PASS`: y6KwCSHVlyiay25yiKpem4av5XF8GGyO
- `JWT_SECRET`: secret

- 4.  Set Up the Database
    ```bash
    docker run --name easyorder-postgres -e POSTGRES_USER=backend_easyorder_user -e POSTGRES_PASSWORD=y6KwCSHVlyiay25yiKpem4av5XF8GGyO -e POSTGRES_DB=easyorder -p 5432:5432 -d postgres
    ```


5. Start the server:
    ```bash
    npm run start
    ```


## API Documentation
https://easyorder-backend-3.onrender.com/api/#/Tables/TableController_updateTableStatus


## Contributions
To contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.


## Project Documentation

For detailed documentation on the EasyOrder project, please refer to [DOCUMENTATION.md](./DOCUMENTATION.md).

