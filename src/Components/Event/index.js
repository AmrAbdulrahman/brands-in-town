import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import EventsActions from '../../Redux/Events';
import Strings from '../../Services/Strings';
import styles from './styles';

import EventDate from './EventDate';
import EventTime from './EventTime';
import EventDescription from './EventDescription';
import EventVenu from './EventVenu';

export class EventBase extends Component {
  render() {
    const { classes, className, event } = this.props;

    return (
      <Card className={classnames(classes.card, className)}>
        <CardContent>
          <EventDate date={event.datetime} />
          <EventTime time={event.datetime} />
          <EventDescription description={event.description} />
        </CardContent>

        <CardActions>
          <Button id="url" size="small" color="primary" href={event.url} target="_blank">
            {Strings.visitEventPage}
          </Button>
          <Button size="small" color="primary" onClick={() => this.props.openEventLocation(event.id)}>
            {Strings.location}
          </Button>

          <EventVenu id={event.id} venue={event.venue} />
        </CardActions>
      </Card>
    );
  }
}

EventBase.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  event: PropTypes.shape({
    datetime: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    venue: PropTypes.object.isRequired,
  }),
};


const mapDispatchToProps = dispatch => ({
  openEventLocation: id => dispatch(EventsActions.openEventLocation(id)),
});

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(EventBase)
);
