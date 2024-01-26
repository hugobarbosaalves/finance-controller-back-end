import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import routes from './routes';

// Configurar a conexão com o MongoDB local
// mongoose.connect('mongodb://localhost:27017/finance_controller', {});

//     //consultando todos os registros da colletions users
//     try {
//         // Consultar todos os usuários
//         const users = await User.find();
//         console.log('Usuários encontrados:', users);
//     } catch (error: any) {
//         console.error('Erro ao consultar usuários:', error.message);
//     }

const app = express();
const PORT = process.env.PORT || 3000;
const uri = `mongodb+srv://hugoalves:${process.env.MONGO_PASSWORD}@cluster0.rgukkxj.mongodb.net/?retryWrites=true&w=majority`;

const clientOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
};

app.use(express.json());
app.use('/api', routes);

async function openDatabaseConnection() {
    try {
        await mongoose.connect(uri, { ...clientOptions, serverApi: '1' });
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('Database connection opened!');
    } catch (error: any) {
        console.error('Database connection error!', error.message);
    }
}

async function closeDatabaseConnection() {
    try {
        console.log('Closing database connection...');
        await mongoose.disconnect();
        console.log('Database connection closed!');
    } catch (error: any) {
        console.error(
            'Error while closing database connection:',
            error.message,
        );
    }
}
openDatabaseConnection().catch(console.dir);
// run().catch(console.dir);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    console.log(expressListEndpoints(app));
});
