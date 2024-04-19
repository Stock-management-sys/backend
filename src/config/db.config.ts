// Database connection
import * as mysql from 'mysql';
import dotenv from "dotenv";

dotenv.config()

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// con.connect((err: Error | null) => {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.connect()

// interface QueryResults {
//   Dno: number,
//   Dname: string,
//   HeadEmpNo: number
// }

// interface FieldInfo {
//   name: string;
//   type: string;
//   length: number;
// }

// con.query('SELECT * FROM Department', (error: Error, results: QueryResults[] | null, fields: FieldInfo[] | null) => {
//   if (error) {
//     console.error('Error executing query: ' + error.stack);
//     return;
//   }
//   // console.log('Query results:', results != null ? results[0].Dno : '');
//   console.log('Field Infos length: ', fields != null ? fields[0].length : '');
//   console.log('Field Infos name: ', fields != null ? fields[0].name : '');
//   console.log('Field Infos type: ', fields != null ? fields[0].type : '');
// });