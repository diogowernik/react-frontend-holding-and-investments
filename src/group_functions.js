export function groupBy(data, key) {
  return data.reduce((acc, curr) => {
    const existing = acc[curr[key]] || [];
    return { ...acc, [curr[key]]: [...existing, curr] };
  }, {});
}

export function filterBy(data, key, value) {
  return data.filter(item => item[key] === value);
}

export function mapToObject(data) {
  return Object.entries(data).map(([name, data]) => ({ name, data }));
}

export function groupMap(data, key) {
  const grouped = groupBy(data, key);
  return mapToObject(grouped);
}

export function filterGroupMap(data, key, value) {
  const filtered = key === "subcategory"
    ? filterBy(data, 'category', value)
    : data;
  const grouped = groupBy(filtered, key);
  return mapToObject(grouped);
}

export function treemap_by(portfolio_assets, group_type, subcategory){
  const treemap_by_group_type = portfolio_assets.filter( 
    data => group_type === "subcategory" ? data.category === `${subcategory}` : data
    ).reduce((acc,curr)=>{
    const { ticker, portfolio_percentage} = curr
    if (portfolio_percentage === 0) return acc
    const existing = acc[curr[group_type]] || []
    return {...acc, [curr[group_type]]:[...existing, { x: ticker, y: portfolio_percentage }]}
    },{})
    const treemap_group = Object.entries(treemap_by_group_type).map(([name,data])=>({name, data})).filter( data => data.name !== "Dividas")
    treemap_group.sort((a,b)=>b.data.map(({y})=>y).reduce((a, e) => a + e, 0)-a.data.map(({y})=>y).reduce((a, e) => a + e, 0))
    // if ticker is the same merge the values
    const treemap_group_merged = treemap_group.map((data)=>{
      const {name, data: data_array} = data
      const data_array_merged = data_array.reduce((acc,curr)=>{
        const {x, y} = curr
        const existing = acc[x] || []
        return {...acc, [x]:[...existing, {x, y}]}
      },{})
      const data_array_merged_array = Object.entries(data_array_merged).map(([name,data])=>({name, data})).map((data)=>{
        const {name, data: data_array} = data
        const y = data_array.map(({y})=>y).reduce((a, e) => a + e, 0)
        return {x: name, y}
      })
      return {name, data: data_array_merged_array}
    })
    return treemap_group_merged
}

export function dividends_total_by(portfolio_dividends, group_type, subcategory, currency){
  const filtered = group_type === "subcategory"
    ? filterBy(portfolio_dividends, 'category', subcategory)
    : portfolio_dividends;
  const grouped = groupBy(filtered, group_type);

  const total_dividends_by = Object.entries(grouped).reduce((acc, [name, data]) => {
    const total_dividend = data.map((item) => item[`total_dividend_${currency}`]).reduce((a, e) => a + e, 0)
    return {...acc, [name]:total_dividend};
  }, {});

  const total_dividends_by_group_type = Object.entries(total_dividends_by).map(([name,total_dividend])=>({
    name, 
    [`total_dividend_${currency}`]: total_dividend
  }));

  return total_dividends_by_group_type;
}

export function total_by(portfolio_assets, group_type, currency, subcategory){
  const totalKey = `total_today_${currency}`; 

  const filtered = group_type === "subcategory"
    ? filterBy(portfolio_assets, 'category', subcategory)
    : portfolio_assets;
  const grouped = groupBy(filtered, group_type);

  const total_group = Object.entries(grouped).reduce((acc, [name, data]) => {
    const total = data.map((item) => item[totalKey]).reduce((a, e) => a + e, 0);
    return {...acc, [name]: total};
  }, {});

  const by_group = Object.entries(total_group).map(([name,total])=>({name, total}));
  by_group.sort((a, b) => b.total - a.total);

  return by_group;
}

export function tickers_piechart(portfolio_assets, subcategory, currency) {
  const totalKey = currency === 'brl' ? 'total_today_brl' : 'total_today_usd';

  const total_by = portfolio_assets.filter(data => data.category === `${subcategory}`).reduce((acc, curr) => {
    const { ticker } = curr;
    const total_today = curr[totalKey];

    // Se o ticker já existir no acumulador, soma o valor total; caso contrário, define o valor inicial.
    if (acc[ticker]) {
      acc[ticker] += total_today;
    } else {
      acc[ticker] = total_today;
    }

    return acc;
  }, {});

  const total_today = Object.entries(total_by).map(([name, total]) => ({ name, total }));
  total_today.sort((a, b) => b.total - a.total);
  return total_today;
}

