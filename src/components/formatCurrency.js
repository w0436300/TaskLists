function formatCurrency(amount) {
    return `${(amount / 1000000000).toFixed(3)}`;  
}
  export default formatCurrency;