export type ICurrencyRate = {
  base: string
  rates: {
    [key: string]: number
  }
}