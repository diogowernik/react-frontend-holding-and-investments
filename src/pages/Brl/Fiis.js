import { Row, Col} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';

import { fetchPortfolioAssets} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GroupedTables from '../../components/tables/MainTablesBrl';
import PieChart from '../../components/charts/PieChart';
import TreeMap from '../../components/charts/Treemap';
import SideModules from '../../components/sidemodules/SidePatrimonialBrl'
import PortfolioNav from '../../components/nav/PortfolioNav';


const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();

  // Fetchs
  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(params.id, auth.token);
      if (json) {
          setPortfolioAssets(json);
      }
      }, [params.id, auth.token]);
      useEffect(() => {
      onFetchPortfolioAssets();
      }, [onFetchPortfolioAssets]);



  // end of Fetchs
  // Side Module Patrimony BRL and Pie Chart by Category
  function total_brl_by(group_type, subcategory){
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
      return by_group
  }



  // Treemap Module Percentage
  function treemap_by(group_type, subcategory){
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
      return treemap_group
  }

  // MainTables Module
  function assets_by(group_type, subcategory){
    const assets_by_group_type = portfolio_assets.filter(
      data => group_type === "subcategory" ? data.category === `${subcategory}` : data
      ).reduce((acc,curr)=>{
      const existing = acc[curr[group_type]] || []
      return {...acc, [curr[group_type]]:[...existing, curr]}
      },{})
      const assets_group = Object.entries(assets_by_group_type).map(([name,data])=>({name, data}))
      return assets_group
  }

  // Side Module Pie Chart by Ticker
  function piechart_by_ticker(subcategory){
    const total_by = portfolio_assets.filter( data => data.category === `${subcategory}`).reduce((acc,curr)=>{
      const {ticker, total_today_brl} = curr
      return {...acc, [ticker]:total_today_brl}
    }
    ,{})
    const total_today = Object.entries(total_by).map(([name,total_today_brl])=>({name, total_today_brl})) 
    total_today.sort((a, b) => b.total_today_brl - a.total_today_brl)
    return total_today
  }



  const fiis_subcategory = assets_by('subcategory', 'Fundos Imobiliários')

  const fiis_total_brl = total_brl_by('subcategory', 'Fundos Imobiliários')

  const treemap_fiis_subcategory = treemap_by("subcategory", "Fundos Imobiliários")

  const fiis_piechart = piechart_by_ticker("Fundos Imobiliários")
  

  return (
    <MainLayout>
      <PortfolioNav />
      <Row>
        <Col lg={4}>
            <SideModules 
            group_total={fiis_total_brl}  
            />
        </Col> 
        <Col lg={4}>
            <PieChart 
            total={fiis_piechart}
            />  
        </Col> 
        <Col lg={4}>
            <PieChart
            total={fiis_total_brl}
            />
        </Col> 
        <Col lg={12}>
            <GroupedTables
            grouped_assets={fiis_subcategory}
            />
            <TreeMap
            portfolio_treemap={treemap_fiis_subcategory}
            />  
        </Col>
      </Row>                   
    </MainLayout>
  )
};

export default Portfolio;