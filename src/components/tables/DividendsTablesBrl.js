import DividendsTables from "./DividendsTables";

const DividendsTablesBRL = ({year_dividends, month_dividends}) => {
  const last_12_months_dividends = month_dividends.slice(0,12)

  return (
      <DividendsTables>
        year_dividends={year_dividends}
        month_dividends={last_12_months_dividends}
      </DividendsTables>
  )
};

export default DividendsTablesBRL;