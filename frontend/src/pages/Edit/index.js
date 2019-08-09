import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container } from './styles';
import DatePicker from '~/components/DatePicker';
import InputBanner from '~/components/InputBanner';
import {
  loadMeetapp,
  updateMeetappRequest,
} from '~/store/modules/meetapp/actions';

const schema = Yup.object().shape({
  banner_id: Yup.number().required(),
  title: Yup.string().required('Insira o título do meetapp'),
  description: Yup.string().required('Descreva o seu meetapp'),
  localization: Yup.string().required(
    'Insira o local onde será realizado o meetapp'
  ),
  date: Yup.date('Insira uma data válida').required(
    'Insira a data em que o meetapp acontecerá'
  ),
});

function Edit({ match }) {
  const { id } = match.params;
  const loading = useSelector(state => state.meetapp.loading);
  const meetapp = useSelector(state => state.meetapp.meetapp);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMeetapp(id));
  }, [dispatch, id]);

  function handleSubmit(formData) {
    dispatch(updateMeetappRequest(formData));
  }

  if (!Object.keys(meetapp).length) return <div className="loading" />;
  return (
    <Container>
      <Form initialData={meetapp} schema={schema} onSubmit={handleSubmit}>
        <InputBanner name="banner_id" previewURL={meetapp.banner.url} />

        <Input type="text" name="title" placeholder="Título do Meetup" />
        <Input
          name="description"
          placeholder="Descrição completa"
          multiline
          rows="4"
        />
        <DatePicker name="date" placeholder="Data do meetapp" />
        <Input name="localization" type="text" placeholder="Localização" />

        <button disabled={loading} type="submit">
          {loading ? 'Salvando...' : 'Salvar meetapp'}
        </button>
      </Form>
    </Container>
  );
}

Edit.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Edit;
