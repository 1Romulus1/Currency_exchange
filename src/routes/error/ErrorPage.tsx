import { useRouteError } from 'react-router-dom'

import './error.scss'

const ErrorPage = () => {
  const error = useRouteError()

  if (error instanceof Error) {
    return (
      <div className='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    )
  }
  return (
    <div className='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  )
}

export default ErrorPage
