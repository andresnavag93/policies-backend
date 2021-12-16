const { MongoClient, ObjectId } = require('mongodb');

const { config } = require('../config');

const USER = encodeURIComponent(config.mongodb.dbUser);
const PASSWORD = encodeURIComponent(config.mongodb.dbPassword);
const DB_NAME = config.mongodb.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.mongodb.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }
  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) reject(err);

          console.log('Connected succesfully to mongo db');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  list(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }
  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }
  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }
  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertId || id);
  }
}

module.exports = MongoLib;
