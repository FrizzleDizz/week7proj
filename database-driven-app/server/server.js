import express from "express"; //
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/", function (request, response){
    response.json("Nothing to fetch here!");
})

app.get("/sampletable", async function (request, response){
    const data = await db.query(`SELECT * FROM sampletable`)
    console.log(data.rows); //console log to test output in terminal
    response.json(data.rows); // returns data rows in json format on /sampletable
})

app.post ("/sampletable", async function (request, response){
    const column1 = request.body.column1;
    const column2 = request.body.column2;
    const column3 = request.body.column3;
    console.log(request.body);
    //add sample to database
    await db.query(`INSERT INTO sampletable (column1, column2, column3) VALUES ($1, $2, $3)`,
        [column1, column2, column3]
    );
    response.json("samples POST endpoint")
})

app.listen(8080, () => console.log ("server is running on port 8080"));