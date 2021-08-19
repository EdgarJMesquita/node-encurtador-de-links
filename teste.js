async addVisitedCount({collection=String, id=String, visitedCount=Number}){
  await this.client.connect();
  const updatedVisitedCount = visitedCount+1;
  const result = await this.client.db(this.databaseName).collection(collection)
  .updateOne({id:id},{$set:{visitedCount:updatedVisitedCount}});
  this.client.close();
  result && console.log(`1 documento atualizado com visitedCount: ${updatedVisitedCount}`);
}

/* async checkIfIDIsTaken({collection='',id=''}){
  await this.client.connect();
  const result = await this.client.db(this.databaseName).collection(collection).findOne({id:id});
  this.client.close();
  return result;
} */

async findAndReturnLinkById({collection=String, id=String}){
  await this.client.connect();
  const result = await this.client.db(this.databaseName).collection(collection)
  .findOne({id:id});
  this.client.close();
  
  if(result){
    console.log(`1 documento encontrado com id: ${id}`)
  }else{
    console.log(`nenhum documento encontrado com id: ${id}`)
  }
  return result;
}

async insertNewLink({collection=String, newListing}){
  await this.client.connect();
  const result = await this.client.db(this.databaseName).collection(collection)
  .insertOne(newListing);
  this.client.close();

  if(result.insertedId){
    console.log(`1 documento inserido com id: ${newListing.id}`);
  }else {
    console.log('Falha na inserção de um documento.');
  }
  return result;
}

async findAndDeleteAllLinksOlderThanOneWeek({collection=String,dateAsMilliseconds=Number}){
  await this.client.connect()
  const results = await this.client.db(this.databaseName).collection(collection)
  .deleteMany({createdAt:{ $lt: dateAsMilliseconds }});
  this.client.close()
  
  console.log(`${results.deletedCount} documento(s) excluídos que foram criados antes de ${new Date(dateAsMilliseconds).toLocaleString()}`);
  
}