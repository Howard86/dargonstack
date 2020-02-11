import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDragon } from '../actions/dragon';
import { fetchStates } from '../reducers/fetchStates';

import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { RootState } from '../reducers';

class Dragon extends Component<any> {
  get DragonView() {
    const { dragon } = this.props;
    if (dragon.status === fetchStates.error)
      return <span>{dragon.message}</span>;

    return <DragonAvatar dragon={dragon} />;
  }

  render() {
    const { dragon } = this.props;
    if (dragon.status === fetchStates.error) {
      return <div>{dragon.message}</div>;
    }
    return (
      <div>
        <Button className='button-padding' onClick={this.props.fetchDragon}>
          New Dragon
        </Button>
        <br />
        {this.DragonView}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   const dragon = state.dragon;
//   return { dragon };
// };

const componentConnector = connect(({ dragon }: RootState) => ({ dragon }), {
  fetchDragon,
});

export default componentConnector(Dragon);