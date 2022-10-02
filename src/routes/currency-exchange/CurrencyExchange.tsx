import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchExchange } from '../../api/fetch'
import { ICurrencyExchange } from '../../interfaces/ICurrencyExchange'

import './currencuExchange.scss'

const defaultFormFields = {
  currencyToConvert: ['USD', 'UAH', 'PLN', 'EUR', 'GBP', 'JPY'],
  fromCurrency: 'USD',
  toCurrency: 'UAH',
  amount: 1,
}

export default function CurrencyExchange() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { currencyToConvert, fromCurrency, toCurrency, amount } = formFields
  const { status, data, error, isFetching }: UseQueryResult<ICurrencyExchange> =
    useQuery<ICurrencyExchange>(
      ['exchange', fromCurrency, toCurrency, amount],
      () => fetchExchange(fromCurrency, toCurrency, amount)
    )

  const handleChange = (event: any) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='exchange-container'>
      <h1>TO CONVERT</h1>
      <div className='exchange-container_flex'>
        <span>From</span>
        <select
          name='fromCurrency'
          value={fromCurrency}
          onChange={handleChange}
        >
          {currencyToConvert.map((cur) => {
            return (
              <option key={cur} value={cur}>
                {cur}
              </option>
            )
          })}
        </select>
        <span>Mount</span>
        <input
          type='text'
          name='amount'
          value={amount}
          onChange={handleChange}
        />

        <span>To</span>
        <select name='toCurrency' value={toCurrency} onChange={handleChange}>
          {currencyToConvert.map((cur) => {
            return (
              <option key={cur} value={cur}>
                {cur}
              </option>
            )
          })}
        </select>

        <span>=</span>
        <span>{data?.result}</span>
      </div>
      <button>
        <Link className='link' to='/rate'>
          See all currency
        </Link>
      </button>
    </div>
  )
}
