
export function piechart_by_ticker(portfolio_assets, subcategory){

  const total_by = portfolio_assets.filter( data => data.category === `${subcategory}`).reduce((acc,curr)=>{
    const {ticker, total_today_brl} = curr
    return {...acc, [ticker]:total_today_brl}
  }
  ,{})
  const total_today = Object.entries(total_by).map(([name,total_today_brl])=>({name, total_today_brl})) 
  total_today.sort((a, b) => b.total_today_brl - a.total_today_brl)
  return total_today
}

export function assets_by(portfolio_assets, group_type, subcategory){
  const assets_by_group_type = portfolio_assets.filter(
    data => group_type === "subcategory" ? data.category === `${subcategory}` : data
    ).reduce((acc,curr)=>{
    const existing = acc[curr[group_type]] || []
    return {...acc, [curr[group_type]]:[...existing, curr]}
    },{})
    const assets_group = Object.entries(assets_by_group_type).map(([name,data])=>({name, data}))
    return assets_group
}

export function total_brl_by(portfolio_assets, group_type, subcategory){
  const total_by_group_type = portfolio_assets.filter( 
    data => group_type === "subcategory" ? data.category === `${subcategory}` : data
    ).reduce((acc,curr)=>{
    const {total_today_brl} = curr
    const existing = acc[curr[group_type]] || []
    return {...acc, [curr[group_type]]:[...existing, {total_today_brl}]}
    },{})
    const total_group = Object.entries(total_by_group_type).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
      const {name, data} = curr
      const total_today_brl = data.map(({ total_today_brl }) => total_today_brl).reduce((a, e) => a + e, 0)
      return {...acc, [name]:total_today_brl}
    },{})
    const by_group = Object.entries(total_group).map(([name,total_today_brl])=>({name, total_today_brl}))
    by_group.sort((a, b) => b.total_today_brl - a.total_today_brl)
    return by_group
}

export function treemap_by(portfolio_assets, group_type, subcategory){
  const treemap_by_group_type = portfolio_assets.filter( 
    // if group_type is subcategory, filter by subcategory if not, no filter
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
    // return treemap_group
}

export function dividends_by(portfolio_dividends, group_type, subcategory){
  const dividends_by_group_type = portfolio_dividends.filter(
    data => group_type === "subcategory" ? data.category === `${subcategory}` : data
    ).reduce((acc,curr)=>{
    const existing = acc[curr[group_type]] || []
    return {...acc, [curr[group_type]]:[...existing, curr]}
    },{})
    const dividends_group = Object.entries(dividends_by_group_type).map(([name,data])=>({name, data}))
    return dividends_group
}

export function dividends_total_by(portfolio_dividends, group_type, subcategory){
  const dividends_by_group_type = portfolio_dividends.filter(
    data => group_type === "subcategory" ? data.category === `${subcategory}` : data
    ).reduce((acc,curr)=>{
    const existing = acc[curr[group_type]] || []
    return {...acc, [curr[group_type]]:[...existing, curr]}
    },{})
    const total_dividends_by = Object.entries(dividends_by_group_type).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
      const {name, data} = curr
      const total_dividend_brl = data.map(({ total_dividend_brl }) => total_dividend_brl).reduce((a, e) => a + e, 0)
      return {...acc, [name]:total_dividend_brl} 
    }
    ,{})
    const total_dividends_by_group_type = Object.entries(total_dividends_by).map(([name,total_dividend_brl])=>({name, total_dividend_brl}))
    return total_dividends_by_group_type
}

export function dividends_total_usd_by(portfolio_dividends, group_type, subcategory){
  const dividends_by_group_type = portfolio_dividends.filter(
    data => group_type === "subcategory" ? data.category === `${subcategory}` : data
    ).reduce((acc,curr)=>{
    const existing = acc[curr[group_type]] || []
    return {...acc, [curr[group_type]]:[...existing, curr]}
    },{})
    const total_dividends_by = Object.entries(dividends_by_group_type).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
      const {name, data} = curr
      const total_dividend_usd = data.map(({ total_dividend_usd }) => total_dividend_usd).reduce((a, e) => a + e, 0)
      return {...acc, [name]:total_dividend_usd} 
    }
    ,{})
    const total_dividends_by_group_type = Object.entries(total_dividends_by).map(([name,total_dividend_usd])=>({name, total_dividend_usd}))
    return total_dividends_by_group_type
}

export function total_usd_by(portfolio_assets, group_type, subcategory){
  const total_by_group_type = portfolio_assets.filter( 
    data => group_type === "subcategory" ? data.category === `${subcategory}` : data
    ).reduce((acc,curr)=>{
    const {total_today_usd} = curr
    const existing = acc[curr[group_type]] || []
    return {...acc, [curr[group_type]]:[...existing, {total_today_usd}]}
    },{})
    const total_group = Object.entries(total_by_group_type).map(([name,data])=>({name, data})).reduce((acc,curr)=>{
      const {name, data} = curr
      const total_today_usd = data.map(({ total_today_usd }) => total_today_usd).reduce((a, e) => a + e, 0)
      return {...acc, [name]:total_today_usd}
    },{})
    const by_group = Object.entries(total_group).map(([name,total_today_usd])=>({name, total_today_usd}))
    return by_group
}

