import { GetServerSideProps } from "next";
import {
  findLinkById,
  incrementVisitedLinkCount,
  addToVisiteCount,
} from "../lib/mongodb";

export default function RedirectPage() {
  return <h1>Redirecting</h1>;
}

// Função serverless que é acionada em todo requisição
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  if (id.length !== 6) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const result = await findLinkById(id);
  console.log(`1 documento encontrado com id: ${result.id}`);
  console.log(`1 usuário redirecionado para ${result.link}`);
  incrementVisitedLinkCount(id, result.visitedCount);
  addToVisiteCount();
  return {
    redirect: {
      destination: `https://${result.link}`,
      permanent: false,
    },
  };
};
