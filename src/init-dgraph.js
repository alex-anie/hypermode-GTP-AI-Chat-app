import {DgraphClient, DgraphClientStub, Operation} from '@dgraph-js/client';
import {promises as fs} from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

//Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a client stab
const clientStub = new DgraphClientStub('localhost:9080');
const dgraphClient = new DgraphClient(clientStub);

async function initialize() {
    try{
        // Read schema file
        const schemaPath = join(__dirname, 'schema.graphql');
        const schema = await fs.readFile(schemaPath, 'utf8');

        // set schema
        const op = new Operation();
        op.setSchema(schema);
        await dgraphClient.alter(op)
        console.log('Schema set successfully');

        // Read and load initial data
        const dataPath = join(__dirname, 'books-data.json');
        const data = await fs.readFile(dataPath, 'utf8')
        const txn = dgraphClient.newTxn();

        try {
            const mutation = JSON.parse(data);
            await txn.mutate({setJon: mutation});
            await txn.commit();
            console.log('Data loaded successfully');
        } finally {
            await txn.discard()
        } 
    } catch(error){
        console.error('Error:', error)
    }finally{
        clientStub.close();
    }
}

initialize();