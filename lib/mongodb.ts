import { MongoClient } from "mongodb";
import { NewLinkType } from "../types";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;


async function findLinkById(id:string|string[]){
  const connection = await new MongoClient(MONGODB_URI).connect();
  const result = await connection.db(DATABASE_NAME).collection('links').findOne({id:id});
  connection.close();
  console.log(`1 documento encontrado com id: ${id}`);
  return result
}


async function insertNewLink(newListing:NewLinkType){
  const connection = await new MongoClient(MONGODB_URI).connect();
  const result = await connection.db(DATABASE_NAME).collection('links').insertOne(newListing);
  connection.close();
  console.log(`1 documento inserido com id: ${newListing.id}`)
  return result;
}


async function incrementVisitedCount(id:string|string[], count:number) {
  const connection = await new MongoClient(MONGODB_URI).connect();
  const result = await connection.db(DATABASE_NAME).collection('links').updateOne({id:id},{$set:{visitedCount:count+1}});
  connection.close();
  if(result){
    console.log(`1 documento com id: ${id} foi atualizado visitedCount: ${count+1}`);
  }
}

async function deleteAllLinksOlderThanOneWeek() {
  const oneWeekAsMilliseconds = 604800000;
  const oneWeekAgoAsMilliseconds = Date.now() - oneWeekAsMilliseconds;

  const connection = await new MongoClient(MONGODB_URI).connect();
  const result = await connection.db(DATABASE_NAME).collection('links').deleteMany({visitedCount:{ $lt:{ oneWeekAgoAsMilliseconds }}});
  console.log(`${result.deletedCount} documents deleted older than one week.`);
}

export { findLinkById, insertNewLink, incrementVisitedCount, deleteAllLinksOlderThanOneWeek }