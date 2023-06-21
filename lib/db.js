import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbConnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Saadmysql246",
    database: "ims",
  });

  try {
    const [results] = await dbConnection.execute(query, values);
    dbConnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}
