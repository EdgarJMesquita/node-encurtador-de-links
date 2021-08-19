
type LinksListProps = {
  shortLinks: {
    shortLink: string,
    longLink:string;
  }[] 
}

export function LinksList({shortLinks}:LinksListProps){
  return(
    <ul id="links-list" className="list-group">
    {shortLinks?.map(item=>{
      return(
        <li className="list-group-item" key={item.shortLink}>
          <div className="p-1">
            <div className="d-flex">
              <span className="me-1">Link:</span>
              <a href={item.shortLink} target="_blank" rel="noreferrer">{item.shortLink.replace('https://','')}</a>
              <button 
                onClick={async()=>await navigator.clipboard.writeText(item.shortLink)} 
                className="btn btn-outline-secondary btn-sm ms-auto">
                Copy
              </button>
            </div>
            <div>
              <span className="me-1">Para:</span>
              <a href={item.longLink}>{item.longLink}</a>
            </div>
            {/* <span className="mx-1 d-inline-block text-truncate" style={{maxWidth:'12rem'}}>{item.longLink}</span> */}
          </div>
        </li>
      )
    })}
    {/* "d-flex justify-content-center align-items-center p-2 flex-column flex-sm-row" */}
  </ul>
  )
}