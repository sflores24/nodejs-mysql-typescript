import mysql = require('mysql');

export default class MySQL {
    //Singleton instance MySQL
    private static _instance: MySQL;

    connection : mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'test'
        });

        this.conectarDB();
    }

    private conectarDB() {
        this.connection.connect( (err: mysql.MysqlError) => {
            if(err) {
                console.log(err.message);
            }

            this.conectado = true;
            console.log('Base de datos conectada');
        } );
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public static ejecutarQuery(query:string, callback: Function) {
        //llamamos el metodo de instance
        this.instance.connection.query(query, (error, results: Object[], fields) => {

            if(error) {
                console.log('Error en query');
                console.log(error);
                return callback(error);
            }

            if(results.length === 0) {
                callback('El registro solicitado no existe');
            } else {
                callback(null, results);
            }    
        });
    }
}