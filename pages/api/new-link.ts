import { insertNewLink } from "../../lib/mongodb";
import { generateID } from "../../utils/generateID";
import { VercelRequest, VercelResponse, VercelRequestBody } from '@vercel/node';


// end point para criação de um novo link curto no banco de dados.
export default async function handler (req:VercelRequest, res:VercelResponse){

  const { link }:VercelRequestBody = req.body;
  
  const newListing = {
    id: generateID(),
    link,
    createdAt: Date.now(),
    visitedCount: 0
  }

  const result = await insertNewLink(newListing);
 
  if(result){
    res.status(201).send(newListing);
    console.log(`1 documento inserido id: ${newListing.id}`)
 
  }else{
    res.status(404).send('Algo não deu certo');
    console.log('Algo não deu certo');
  }
}