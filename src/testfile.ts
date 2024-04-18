import { db } from "./db";

interface QueryResults {
    Dno: number,
    Dname: string,
    HeadEmpNo: number
}

interface FieldInfo {
    name: string;
    type: string;
    length: number;
}
export async function temp() {
    await db.query('SELECT * FROM Department', (error: Error, results: QueryResults[] | null, fields: FieldInfo[] | null) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return;
        }
        // console.log('Query results:', results != null ? results[0].Dno : '');
        console.log('Field Infos length: ', fields != null ? fields[0].length : '');
        console.log('Field Infos name: ', fields != null ? fields[0].name : '');
        console.log('Field Infos type: ', fields != null ? fields[0].type : '');
    });
}