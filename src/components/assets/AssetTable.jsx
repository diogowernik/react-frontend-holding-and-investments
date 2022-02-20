import React, {  } from 'react';

const AssetTable = ({data=[]}) => {

  return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Quantidade</th>
                        <th>Preço Médio</th>
                        <th>Custo Total</th>
                        <th>Total Hoje</th>
                        <th>Lucro</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((portfolio_asset) => (
                    <tr key={portfolio_asset.id}>
                        <td>{portfolio_asset.ticker}</td>
                        <td>{portfolio_asset.shares_amount}</td>
                        <td>{portfolio_asset.share_average_price_brl}</td>
                        <td>{portfolio_asset.total_cost_brl}</td>
                        <td>{portfolio_asset.total_today_brl}</td>  
                        <td>{portfolio_asset.profit}</td>                                
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
  )
};

export default AssetTable;