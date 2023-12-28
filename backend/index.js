const express = require('express')
require('dotenv').config()

const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/:table', async (req, res) => {
    const table = req.params.table
    const result = await runQuery(`SELECT * FROM ${table}`, [])
    res.json(result)
})
app.delete('/:table/:id', async (req, res) => {
    const table = req.params.table
    const id = req.params.id
    const result = await runQuery(`DELETE FROM ${table} WHERE id = ?`, [id])
    res.json(result)
})
app.post('/:table', async (req, res) => {
    const table = req.params.table
    const keys = req.body.keys
    const data = req.body.values
    let values = Array(keys.length).fill('?').join(',')

    const result = await runQuery(`INSERT INTO ${table} (${keys}) values (${values})`, [
        ...data
    ])
    res.json(result)
})
app.put('/:table/:id', async (req, res) => {
    const table = req.params.table
    const id = req.params.id
    const keys = req.body.keys
    const data = req.body.values;
    const set = keys.map((key) => `${key} = ?`).join(',')
    const result = await runQuery(`UPDATE ${table} SET ${set} WHERE id = ?`, [...data, id])
    res.json(result)
})
const runQuery = async (query, inputs) => {
    const connection = await mysql.createConnection(process.env.DATABASE_URL)
    try {
        const data = await connection.query(query, inputs)
        return ({
            result: {
                data: data[0],
            },
            success: true
        })
    } catch (e) {
        console.log(e)
        return ({
            error: e.sqlMessage,
            success: false
        })
    } finally {
        await connection.end()
    }

}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
