Sure, you can add a README file to your project to document the queries used in your application. Here's an example of how you can structure your README file to include the queries:

```markdown
# Recipes App

This is a simple web application for managing recipes.

## Description

This application allows users to add, edit, delete, and search for recipes. It consists of a frontend built with React and a backend API built with Node.js and Express. The data is stored in a PostgreSQL database.

## Setup

To run this application locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/recipes-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd recipes-app
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

4. Set up the PostgreSQL database:

    - Create a new PostgreSQL database named `recipe_database`.
    - Run the SQL script `database.sql` provided in the `backend` directory to create the necessary table.

5. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

6. Start the frontend server:

    ```bash
    cd frontend
    npm start
    ```

7. Access the application in your web browser at `http://localhost:3000`.

## Database Queries

### Get all recipes

```sql
SELECT * FROM recipes;
```

### Search recipes by title, ingredients, or instructions

```sql
SELECT * FROM recipes WHERE title ILIKE '%search_term%' OR ingredients ILIKE '%search_term%' OR instructions ILIKE '%search_term%';
```

### Add a new recipe

```sql
INSERT INTO recipes (title, ingredients, instructions) VALUES ('Recipe Title', 'List of Ingredients', 'Cooking Instructions') RETURNING *;
```

### Update a recipe

```sql
UPDATE recipes SET title = 'New Title', ingredients = 'New Ingredients', instructions = 'New Instructions' WHERE id = recipe_id RETURNING *;
```

### Delete a recipe

```sql
DELETE FROM recipes WHERE id = recipe_id;
```

```

You can include more detailed instructions or any other relevant information in your README file as needed. Make sure to replace placeholders like `your-username` and `recipe_id` with appropriate values specific to your project.
