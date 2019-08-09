import {
  all,
  takeLatest,
  call,
  put,
  takeLeading,
  select,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import {
  insertImageSuccess,
  createMeetappSuccess,
  fetchMeetappSuccess,
  updateMeetappSuccess,
  loadMeetappSuccess,
  deleteMeetappSuccess,
  failure,
} from './actions';

export function* insertImage({ payload }) {
  try {
    const { file } = payload;
    const data = new FormData();
    data.append('file', file);

    const response = yield call(api.post, 'files', data);
    yield put(insertImageSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao fazer upload da imagem');
    yield put(failure());
  }
}

export function* createMeetapp({ payload }) {
  try {
    const { formData } = payload;
    const response = yield call(api.post, 'meetups', formData);

    toast.success('Meetapp criado com sucesso');
    yield put(createMeetappSuccess(response.data));
    history.push('/dashboard');
  } catch (error) {
    toast.error('Erro ao criar meetapp, confira os dados informados');
    yield put(failure());
  }
}

export function* fetchMeetappOrganizing() {
  try {
    const response = yield call(api.get, 'organizing');
    yield put(fetchMeetappSuccess(response.data));
  } catch (error) {
    toast.error(`Erro ao listar meetapps`);
    yield put(failure());
  }
}

export function* updateMeetapp({ payload }) {
  try {
    const { formData } = payload;
    const id = yield select(state => state.meetapp.meetapp.id);
    const response = yield call(api.put, `meetups/${id}`, formData);

    toast.success('Meetapp atualizado com sucesso');
    yield put(updateMeetappSuccess(response.data));
    history.push('/dashboard');
  } catch (error) {
    toast.error('Erro ao atualizar meetapp, confira se a data ja passou');
    yield put(failure());
  }
}

export function* loadMeetappRequest({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `meetups/${id}`);
    yield put(loadMeetappSuccess(response.data));
  } catch (error) {
    toast.error(`Erro ao listar meetapps`);
    yield put(failure());
  }
}

export function* deleteMeetapp({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `meetups/${id}`);

    toast.success('Meetapp removido com sucesso');
    yield put(deleteMeetappSuccess(response.data));
    history.push('/dashboard');
  } catch (error) {
    toast.error('Erro ao remover meetapp, confira se a data ja passou');
    yield put(failure());
  }
}

export default all([
  takeLatest('@meetapp/NEW_IMAGE_REQUEST', insertImage),
  takeLatest('@meetapp/CREATE_MEETAPP_REQUEST', createMeetapp),
  takeLatest('@meetapp/UPDATE_MEETAPP_REQUEST', updateMeetapp),
  takeLatest('@meetapp/DELETE_MEETAPP_REQUEST', deleteMeetapp),
  takeLeading('@meetapp/FETCH_MEETAPP_REQUEST', fetchMeetappOrganizing),
  takeLeading('@meetapp/LOAD_MEETAPP_REQUEST', loadMeetappRequest),
]);
