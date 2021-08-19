import Image from 'next/image';
import linkIcon from '../public/vercel.svg';

export function Header(){
  return(
  <>
    <div className="d-flex justify-content-center align-items-center">
      <Image 
      src={linkIcon}
      width={70}
      height={70}
      alt="Link Icon"
      objectFit="cover"
      />
      <h1 className="text-center display-3 m-0">Encurtador</h1>
    </div>
    <p className="text-center">Encurte seu link e compartilhe com seus amigos e colegas.</p>
  </>      
  )
}