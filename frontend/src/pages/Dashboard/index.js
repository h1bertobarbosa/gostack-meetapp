import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Meetapp } from './styles';
import { fetchMeetappRequest } from '~/store/modules/meetapp/actions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetapps = useSelector(state => state.meetapp.meetapps);
  const loading = useSelector(state => state.meetapp.loading);

  useEffect(() => {
    function fetchMeetapps() {
      dispatch(fetchMeetappRequest());
    }
    fetchMeetapps();
  }, [dispatch]);

  if (loading) return <div className="loading" />;
  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>

        <Link to="/new">
          <button type="button">Novo meetapp</button>
        </Link>
      </header>

      <ul>
        {meetapps.map(meetup => (
          <Link key={String(meetup.id)} to={`/meetapp/${meetup.id}`}>
            <Meetapp>
              <strong>{meetup.title}</strong>
              <span>{meetup.dateFormatted}</span>
            </Meetapp>
          </Link>
        ))}
      </ul>
    </Container>
  );
}
