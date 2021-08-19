import { GetServerSideProps } from "next";
import { findLinkById, incrementVisitedCount } from "../lib/mongodb"

export default function RedirectPage(){
  return(
    <h1>
      Redirecting
    </h1>
  )
}

// Função serverless que é acionada em todo requisição
export const getServerSideProps:GetServerSideProps = async({params})=>{
  
  const { id } = params;

  if(id.length!==5){
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }
  
  const result = await findLinkById(id);
  console.log(`1 usuário redirecionado para ${result.link}`)
  return {
    redirect:{
      destination: `https://${result.link}`,
      permanent: false,
    }
  }

  
  /* if(result){
    incrementVisitedCount(id,result.visitedCount);
    console.log(`1 usuário redirecionado com sucesso para ${result.link}`)
    return{
      redirect:{
        destination: `https://${result.link}`,
        permanent: false
      }
    }
  } */

  
}