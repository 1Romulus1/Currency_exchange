import axios from 'axios'
import { ICurrencyExchange } from '../interfaces/ICurrencyExchange'
import { ICurrencyRate } from '../interfaces/ICurrencyRate'

export const fetchRates = async (
  baseCurrency: string,
  currencyToConvert: string[]
): Promise<ICurrencyRate> => {
  const { data } = await axios.get(
    `https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${currencyToConvert}`
  )

  return data
}

export const fetchExchange = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<ICurrencyExchange> => {
  const { data } = await axios.get(
    `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
  )

  return data
}
