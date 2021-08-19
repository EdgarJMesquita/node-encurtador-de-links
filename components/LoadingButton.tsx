export const LoadingButton =()=> {
  return (
    <button className="btn btn-primary btn-lg" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Carregando...
    </button>
  )
}