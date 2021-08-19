export function removeProtocol(url:string){
  return url.replace('https://','').replace('http://','')
}