import { Col, Row } from "react-bootstrap";
import React from "react";
// import { useHistory } from "react-router-dom";
import RadarNavTemplate from "../components/nav/RadarNavTemplate";
import PortfolioNavTemplate from "../components/nav/PortfolioNavTemplate"
import MainLayout from "../layouts/MainLayout"
import { useParams } from "react-router-dom";


// Remove the import of withFetchData here
const RadarTemplate = ({ data, TableComponent, title }) => {
  // const history = useHistory();
  const params = useParams();

  return (
    <>
    <MainLayout>
      <PortfolioNavTemplate
       currency={"brl"}
       params={params}
      />
      <Row>
        <Col lg={2}>
          <RadarNavTemplate
            currency={"brl"}
            params={params}
          />
        </Col>
        <Col lg={10}>
          <TableComponent data={data} />
        </Col>

      </Row>

        
    </MainLayout>
      
    </>
  );
};

// Do not use withFetchData here
export default RadarTemplate;
