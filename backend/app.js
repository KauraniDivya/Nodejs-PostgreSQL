const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'recipe_database', // Use the new database name
    password: 'DivKa2003@',
    port: 5432, // Default PostgreSQL port
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Database connection error handling
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

app.get('/recipes', async (req, res) => {
    try {
        const { search } = req.query;
        console.log("Search term:", search); // Add this line for debugging
        let query = 'SELECT * FROM recipes';
        let params = [];

        if (search) {
            query += ' WHERE title ILIKE $1 OR ingredients ILIKE $1 OR instructions ILIKE $1';
            params.push(`%${search}%`);
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/recipes', async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const result = await pool.query(
            'INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
            [title, ingredients, instructions]
        );
        
        res.status(201).json(result.rows[0]); // Return the newly added recipe
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, ingredients, instructions } = req.body;
        const result = await pool.query(
            'UPDATE recipes SET title = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *',
            [title, ingredients, instructions, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
