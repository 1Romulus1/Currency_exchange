import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRates } from '../../api/fetch'
import { ICurrencyRate } from '../../interfaces/ICurrencyRate'

import './currencyRate.scss'

const currencyToConvert = ['USD', 'UAH', 'PLN', 'EUR', 'GBP', 'JPY']

export default function CurrencyRate() {
  const [currency, setCurrency] = useState('USD')

  const { isLoading, error, data }: UseQueryResult<ICurrencyRate> =
    useQuery<ICurrencyRate>(['latest', currency, currencyToConvert], () =>
      fetchRates(currency, currencyToConvert)
    )

  const currencyToConvertUpdated = currencyToConvert.filter(
    (cur) => cur != currency
  )

  const handleChange = (event: any) => {
    const { value } = event.target

    setCurrency(value)
  }

  if (isLoading) return <> 'Loading...'</>
  if (error instanceof Error)
    return <>'An error has occurred: ' + error.message</>

  return (
    <div className='rate-container'>
      <h1>EXCHANGE RATE</h1>
      <div className='rate-container_flex'>
        <div>
          <select name='currency' value={currency} onChange={handleChange}>
            {currencyToConvert.map((cur) => {
              return (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              )
            })}
          </select>
        </div>
        <div className='currency-result'>
          {currencyToConvertUpdated.map((cur) => {
            return (
              <span key={cur}>
                {cur}: {data?.rates[cur]}
              </span>
            )
          })}
        </div>
      </div>
      <button>
        <Link className='link' to='/'>
          Back
        </Link>
      </button>
    </div>
  )
}
