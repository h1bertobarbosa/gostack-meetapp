import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Button } from './styles';
import {
  loadMeetapp,
  deleteMeetappRequest,
} from '~/store/modules/meetapp/actions';

function Details({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const meetapp = useSelector(state => state.meetapp.meetapp);

  useEffect(() => {
    dispatch(loadMeetapp(id));
  }, [dispatch, id]);

  function handleCancel() {
    dispatch(deleteMeetappRequest(meetapp.id));
  }

  if (!Object.keys(meetapp).length) return <div className="loading" />;
  return (
    <Container>
      <header>
        <h1>{meetapp.title}</h1>

        <div>
          <Link to={`/meetapp/edit/${id}`}>
            <Button disabled={meetapp.past} type="button" secondary>
              Editar
            </Button>
          </Link>

          <Button
            onClick={handleCancel}
            disabled={!meetapp.cancelable}
            type="button"
          >
            Cancelar
          </Button>
        </div>
      </header>

      <img
        src={
          meetapp.banner.url ||
          'https://www.dicesaloon.com/system/production/dice_saloon/events/main_images/000/005/389/full/Transformers_meetup.jpg?1554116146'
        }
        alt="Banner"
      />

      <span>{meetapp.description}</span>

      <footer>
        <time>{meetapp.dateFormatted}</time>

        <address>{meetapp.localization}</address>
      </footer>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Details;
