import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import linkIcon from '../public/vercel.svg';
import { GetStaticProps } from 'next';
import { deleteAllLinksOlderThanOneWeek } from '../lib/mongodb';
import { ShortLinkProp } from '../types';



const Home = ()=>{
  const [referredURL, setReferredURL ] = useState('')
  const [shortLinks, setShortLinks] = useState<ShortLinkProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function generateShortLink(e:FormEvent){
    e.preventDefault();
    if(!referredURL){
      return;
    }

    setIsLoading(true);
    
    const noProtocolURL = referredURL.replace('https://','').replace('http://','');

    const promise = await fetch('api/new-link',{
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({link:noProtocolURL})
    })

    if(promise.status==201){
      const {id,link} = await promise.json();
      const result = {
        shortLink: `${window.location}${id}`,
        longLink: link
      }
      setShortLinks(prev=>[...prev,result]);
      setIsLoading(false);
    }
  }
  
  /* useEffect(() => {
    const links = localStorage.getItem('links')as any || [];
    setShortLinks(links);  
    
  }, [])

  useEffect(() => {
    localStorage.setItem('links',JSON.stringify(shortLinks));
    
  }, [shortLinks]) */

  return(
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content="Um encurtador de link"/> 
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
        crossOrigin="anonymous"
      />
      <title>Encurtador de Links</title>
    </Head>
    
    <div className="container-sm mt-5" style={{maxWidth: '600px'}}>
    <div className="card">
      <div className="card-body">

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
        
        <form onSubmit={generateShortLink} className="mb-2">
          <div className="form-group mb-2">
            <input onChange={e=>setReferredURL(e.target.value)} value={referredURL} id="link-input" className="form-control form-control-lg" type="text" placeholder="www.meusitepreferido.com"/>
          </div>
          <div className="d-grid gap-2">
            {isLoading? <LoadingButton/> : <SubmitButton/>}
          </div>
        </form>

        <ul id="links-list" className="list-group">
          {shortLinks?.map(item=>{
            return(
              <li className="list-group-item" key={item.shortLink}>
                <div className="d-flex justify-content-center align-items-center p-2 flex-column flex-sm-row">
                  <span>Link:</span>
                  <a href={item.shortLink} target="_blank" rel="noreferrer">{item.shortLink}</a>
                  <span className="mx-1 d-inline-block text-truncate" style={{maxWidth:'12rem'}}>{item.longLink}</span>
                  <button 
                    onClick={async()=>await navigator.clipboard.writeText(item.shortLink)} 
                    className="btn btn-outline-secondary btn-sm ms-auto">
                    Copy
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  </div>
</>
  )
}
export default Home;

const SubmitButton = ()=>{
  return(
    <button className="btn btn-primary btn-lg"  type="submit">Gerar link</button>
  )
}

const LoadingButton =()=> {
  return (
    <button className="btn btn-primary btn-lg" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Carregando...
    </button>
  )
}

export const getStaticProps:GetStaticProps=()=>{
  deleteAllLinksOlderThanOneWeek();
  return{
    props:{

    }
  }

}