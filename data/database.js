import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS.trim();
const dbUser = encodeURIComponent(process.env.MONGODB_USERNAME.trim());
const dbPassword = encodeURIComponent(process.env.MONGODB_PASSWORD.trim());
const dbName = process.env.MONGODB_APP_NAME.trim();

console.log('env values', clusterAddress, dbUser, dbPassword, dbName)

//const uri = `mongodb+srv://mongo-user:<password>@us-east-1-cluster.5gwkskd.mongodb.net/?retryWrites=true&w=majority&appName=us-east-1-cluster`;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority&appName=us-east-1-cluster`;
const client = new MongoClient(uri);

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.log('Connection failed.');
  await client.close();
  console.log('Connection closed.');
}

const database = client.db(dbName);

export default database;
