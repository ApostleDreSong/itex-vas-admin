const FormatToCurrency = (number: number) =>
  new Intl.NumberFormat("en-US").format(number);

export default FormatToCurrency;
