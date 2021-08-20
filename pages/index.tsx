import { FormEvent, useState } from 'react';
import { SubmitButton } from '../components/SubmitButton';
import { LoadingButton } from '../components/LoadingButton';
import { LinksList } from '../components/LinksList';
import { Header } from '../components/Header'
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { deleteAllLinksOlderThanOneWeek } from '../lib/mongodb';
import { ShortLinkProp } from '../types';
import { validadeURL } from '../utils/validateURL';
import { removeProtocol } from '../utils/removeProtocol';


const Home = ()=>{
  const [referredURL, setReferredURL ] = useState('')
  const [shortLinks, setShortLinks] = useState<ShortLinkProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function generateShortLink(e:FormEvent){
    e.preventDefault();
    if(!validadeURL(referredURL)){
      return;
    }

    setIsLoading(true);
    
    const noProtocolURL = removeProtocol(referredURL);

    const promise = await fetch('api/new-link',{
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({link:noProtocolURL})
    })

    if(promise.status==201){
      const { id,link } = await promise.json();
      const result = {
        shortLink: `${window.location}${id}`,
        longLink: link
      }
      setShortLinks(prev=>[...prev,result]);
      setIsLoading(false);
    }
  }

  return(
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content="Encurtador de links e URL"/> 
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
        <Header/>
          <form onSubmit={generateShortLink} className="mb-2">
            <div className="form-group mb-2">
              <input onChange={e=>setReferredURL(e.target.value)} value={referredURL} id="link-input" className="form-control form-control-lg" type="text" placeholder="www.meusitepreferido.com"/>
            </div>
            <div className="d-grid gap-2">
              {isLoading? <LoadingButton/> : <SubmitButton/>}
            </div>
          </form>
          <LinksList shortLinks={shortLinks}/>
        </div>
      </div>
    </div>
  </>
  )
}
export default Home;

export const getStaticProps:GetStaticProps=()=>{
  //deleteAllLinksOlderThanOneWeek();
  return{
    props:{

    }
  }
}
