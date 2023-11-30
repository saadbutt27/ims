import mysql from "mysql2/promise"; // importing mysql package from npm/node modules

export async function query({ query, values = [] }) {
  const dbConnection = await mysql.createConnection({ // building connection with mysql workbench
    host: "localhost", // providing crednetial
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "ims",
  });

  try {
    const [results] = await dbConnection.execute(query, values); // execting a query with values if any
    dbConnection.end(); // ending the connection
    return results; // returning the results of the query
  } catch (error) {
    throw Error(error.message); // if the query fails to execute or any runtime error then returning the error
  }
}
