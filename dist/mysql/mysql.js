"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'test'
        });
        this.conectarDB();
    }
    conectarDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
            }
            this.conectado = true;
            console.log('Base de datos conectada');
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        //llamamos el metodo de instance
        this.instance.connection.query(query, (error, results, fields) => {
            if (error) {
                console.log('Error en query');
                console.log(error);
                return callback(error);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
}
exports.default = MySQL;
