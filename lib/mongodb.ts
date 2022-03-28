import { MongoClient } from "mongodb";
import { NewLinkType } from "../types";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

async function findLinkById(id: string | string[]) {
  const connection = await new MongoClient(MONGODB_URI).connect();
  const result = await connection
    .db(DATABASE_NAME)
    .collection("links")
    .findOne({ id });
  connection.close();
  return result;
}

async function insertNewLink(newListing: NewLinkType) {
  const connection = await new MongoClient(MONGODB_URI).connect();
  const result = await connection
    .db(DATABASE_NAME)
    .collection("links")
    .insertOne(newListing);
  connection.close();
  return result;
}

async function incrementVisitedLinkCount(id: string | string[], count: number) {
  const connection = await new MongoClient(MONGODB_URI).connect();
  const result = await connection
    .db(DATABASE_NAME)
    .collection("links")
    .updateOne({ id }, { $set: { visitedCount: count + 1 } });
  connection.close();
  return result;
}

async function deleteAllLinksOlderThanOneWeek() {
  const oneWeekAsMilliseconds = 604800000;
  const oneWeekAgoAsMilliseconds = Date.now() - oneWeekAsMilliseconds;
  const connection = await new MongoClient(MONGODB_URI).connect();
  const result = await connection
    .db(DATABASE_NAME)
    .collection("links")
    .deleteMany({ visitedCount: { $lt: { oneWeekAgoAsMilliseconds } } });
  connection.close();
  console.log(`${result.deletedCount} documents deleted older than one week.`);
}

async function addToVisiteCount() {
  const connection = await new MongoClient(MONGODB_URI).connect();
  const { count } = await connection
    .db(DATABASE_NAME)
    .collection("visitas")
    .findOne({ id: "visitas" });

  await connection
    .db(DATABASE_NAME)
    .collection("visitas")
    .updateOne({ id: "visitas" }, { $set: { count: count + 1 } });
  connection.close();
}

export {
  findLinkById,
  insertNewLink,
  incrementVisitedLinkCount,
  deleteAllLinksOlderThanOneWeek,
  addToVisiteCount,
};
