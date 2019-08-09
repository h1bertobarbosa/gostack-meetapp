import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Container } from './styles';
import DatePicker from '~/components/DatePicker';
import InputBanner from '~/components/InputBanner';
import { createMeetappRequest } from '~/store/modules/meetapp/actions';

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

export default function New() {
  const loading = useSelector(state => state.meetapp.loading);
  const dispatch = useDispatch();

  function handleSubmit(formData) {
    dispatch(createMeetappRequest(formData));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <InputBanner name="banner_id" />

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
