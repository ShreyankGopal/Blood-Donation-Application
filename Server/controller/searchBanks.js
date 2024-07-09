import express from 'express'
const searchBank=express.Router()
searchBank.post('/searchBanks', (req, res) => {
    const search = req.body.search;
    console.log(search)
    const db=req.db;
    const query=req.query;
    // Use a parameterized query to prevent SQL injection
    const qry = 'SELECT * FROM BloodBank WHERE Name LIKE ?';
    const searchValue = `%${search}%`;

    query(qry, [searchValue], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Error executing query');
        }

        res.send(results);
    });
});
export default searchBank;