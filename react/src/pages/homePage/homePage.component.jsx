import React from 'react';

import http from '../../services/http';
import Loading from '../../components/loading/loading.component';
import Card from '../../components/card/card.component';
import Department from '../../components/department/department.component';
import Button from './../../components/button/button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './homePage.styles.scss';

class HomePage extends React.Component {
  state = {
    loaded: false,
    departments: [],
    error: null
  };

  async componentDidMount() {
    try {
      const { data } = await http.get('departments');
      this.setState({
        loaded: true,
        departments: data
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { history } = this.props;
    const { error, loaded, departments } = this.state;
    let row = 0;

    if (error) {
      // TODO: implement a toast message
      return null;
    } else {
      if (loaded) {
        return (
          <div className="grid2x2">
            {departments.length ? (
              departments.map(department => (
                <Card
                  className="no-padding"
                  key={department._id}
                  onClick={() => {
                    history.push(`department/${department._id}`);
                  }}
                >
                  <Department {...department} className={`grid-child${row++}`} />
                </Card>
              ))
            ) : (
              <span className="grid-child-all center-text">No Department to Show</span>
            )}
            <Button className="shop-button" onClick={() => history.push('/shop')}>
              Shop All <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        );
      } else {
        return <Loading className="center" />;
      }
    }
  }
}

export default HomePage;
