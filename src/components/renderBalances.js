import formatCurrency from './formatCurrency';

const renderBalances = (balances) => {
  return Object.entries(balances).map(([key, value]) => (
    <li key={key}>{`${key}: ${formatCurrency(value)} units`}</li>
  ));
};

export default renderBalances;
