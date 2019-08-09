import produce from 'immer';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { zonedTimeToUtc } from 'date-fns-tz';
import { parse } from 'error-stack-parser';

const INITIAL_STATE = {
  loading: false,
  image: null,
  meetapp: {},
  meetapps: [],
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetapp/NEW_IMAGE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetapp/NEW_IMAGE_SUCCESS': {
        draft.loading = false;
        draft.image = action.payload.banner;
        break;
      }
      case '@meetapp/CREATE_MEETAPP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetapp/UPDATE_MEETAPP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetapp/CREATE_MEETAPP_SUCCESS': {
        draft.loading = false;
        draft.meetapp = action.payload.meetapp;
        break;
      }
      case '@meetapp/UPDATE_MEETAPP_SUCCESS': {
        draft.loading = false;
        draft.meetapp = {};
        break;
      }
      case '@meetapp/FETCH_MEETAPP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetapp/FETCH_MEETAPP_SUCCESS': {
        draft.loading = false;
        draft.meetapps = action.payload.meetapps.map(meetapp => ({
          ...meetapp,
          dateFormatted: format(
            parseISO(meetapp.date),
            "dd 'de' MMMM', às' H'h'",
            {
              locale: pt,
            }
          ),
        }));
        break;
      }
      case '@meetapp/LOAD_MEETAPP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetapp/LOAD_MEETAPP_SUCCESS': {
        draft.loading = false;
        draft.meetapp = { ...action.payload.meetapp };

        const znDate = zonedTimeToUtc(
          parseISO(action.payload.meetapp.date),
          'America/Sao_Paulo'
        );
        draft.meetapp.date = znDate;
        draft.meetapp.dateFormatted = format(
          parseISO(action.payload.meetapp.date),
          "dd 'de' MMMM', às' H'h'",
          {
            locale: pt,
          }
        );

        break;
      }
      case '@meetapp/DELETE_MEETAPP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetapp/DELETE_MEETAPP_SUCCESS': {
        draft.loading = false;
        draft.meetapp = {};
        break;
      }
      case '@meetapp/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
