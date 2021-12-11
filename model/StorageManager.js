import * as SQLite from "expo-sqlite";

async function initDB(db) {
  const transactionCode = function (tx) {
    let query = //"DROP TABLE IF EXISTS Users";
      "CREATE TABLE IF NOT EXISTS Users (uid string PRIMARY KEY, pversion string NOT NULL, picture string DEFAULT null)";
    tx.executeSql(query, [], (tx, result) => {
      db.result = result.rows;
    }),
      (tx, error) => {
        throw error;
      };
  };
  return await db.transactionPromise(transactionCode);
}

let transactionPromise = function (transactionCode) {
  return new Promise((resolve, reject) => {
    this.transaction(
      transactionCode,
      (e) => reject(e),
      () => resolve(this.result)
    );
  });
};

export default class StorageManager {
  constructor() {
    this.db = SQLite.openDatabase("MaledettaTreEstDB");
    this.db.transactionPromise = transactionPromise;
    initDB(this.db).catch((error) => console.log(error));
  }

  async storeUserPicture(uid, pversion, picture) {
    console.log("Adding user " + uid + " to DB");
    let db = this.db;
    let transactionCode = function (tx) {
      let query = "REPLACE INTO Users (uid,pversion,picture) VALUES(?,?,?)";
      tx.executeSql(query, [uid, pversion, picture], (tx, result) => {
        db.result = result.rows;
      }),
        (tx, error) => {
          throw error;
        };
    };
    return await db.transactionPromise(transactionCode);
  }

  async getUserPicture(uid) {
    console.log("Getting user picture for user " + uid);
    let db = this.db;
    let transactionCode = function (tx) {
      let query = "SELECT pversion,picture FROM Users WHERE uid = ?";
      tx.executeSql(
        query,
        [uid],
        (tx, result) => {
          db.result = result.rows._array[0];
        },
        (tx, error) => {
          throw error;
        }
      );
    };
    return await db.transactionPromise(transactionCode);
  }
}
