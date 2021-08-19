export type ServerSideProps = {
  params:{
    id: string;
  }
}
export type NewLinkType = {
  id:string;
  link:string;
  createdAt:number;
  visitedCount:number;

}

export type ShortLinkProp = {
  shortLink: string;
  longLink: string;
}