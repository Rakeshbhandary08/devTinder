import { MongoClient } from 'mongodb';
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
const filter = {};
const client = await MongoClient.connect(
  'mongodb+srv://SunoBharat9298:SunoBharat9298@sunobharat.axnulcc.mongodb.net/'
);
const coll = client.db('devTinder').collection('users');
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();
console.log(result);