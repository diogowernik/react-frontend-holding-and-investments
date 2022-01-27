import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineDelete} from 'react-icons/ai';
import { Row, Col, Button} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { 
  fetchPortfolio, 
  removePortfolio, 
} from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';


const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({});
  const auth = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();

  const onBack = () => history.push("/portfolios");

  const onFetchPortfolio = async () => {
    const json = await fetchPortfolio(params.id, auth.token);
    if (json) {
      setPortfolio(json);
    }
  };

  const onRemovePortfolio = () => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removePortfolio(params.id, auth.token).then(onBack);
    }
  };

  useEffect(() => {
    onFetchPortfolio();
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col lg={12}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={25} color="black" />
              </Button>
              <h3 className="mb-0 ml-2 mr-2">{portfolio.name}</h3>

              <Button variant="link" onClick={onRemovePortfolio}>
                <AiOutlineDelete size={25} color="red" />
              </Button>
            </div>
          </div>
        </Col> 
      </Row>


    </MainLayout>
  )
};

export default Portfolio;