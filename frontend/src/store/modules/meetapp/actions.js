export function insertImageRequest(file) {
  return {
    type: '@meetapp/NEW_IMAGE_REQUEST',
    payload: { file },
  };
}

export function insertImageSuccess(banner) {
  return {
    type: '@meetapp/NEW_IMAGE_SUCCESS',
    payload: { banner },
  };
}

export function createMeetappRequest(formData) {
  return {
    type: '@meetapp/CREATE_MEETAPP_REQUEST',
    payload: { formData },
  };
}

export function createMeetappSuccess(meetapp) {
  return {
    type: '@meetapp/CREATE_MEETAPP_SUCCESS',
    payload: { meetapp },
  };
}

export function fetchMeetappRequest() {
  return {
    type: '@meetapp/FETCH_MEETAPP_REQUEST',
  };
}

export function fetchMeetappSuccess(meetapps) {
  return {
    type: '@meetapp/FETCH_MEETAPP_SUCCESS',
    payload: { meetapps },
  };
}

export function loadMeetapp(id) {
  return {
    type: '@meetapp/LOAD_MEETAPP_REQUEST',
    payload: { id },
  };
}

export function loadMeetappSuccess(meetapp) {
  return {
    type: '@meetapp/LOAD_MEETAPP_SUCCESS',
    payload: { meetapp },
  };
}

export function updateMeetappRequest(formData) {
  return {
    type: '@meetapp/UPDATE_MEETAPP_REQUEST',
    payload: { formData },
  };
}

export function updateMeetappSuccess(meetapp) {
  return {
    type: '@meetapp/UPDATE_MEETAPP_SUCCESS',
    payload: { meetapp },
  };
}

export function deleteMeetappRequest(id) {
  return {
    type: '@meetapp/DELETE_MEETAPP_REQUEST',
    payload: { id },
  };
}

export function deleteMeetappSuccess(success) {
  return {
    type: '@meetapp/DELETE_MEETAPP_SUCCESS',
    payload: { success },
  };
}

export function failure() {
  return {
    type: '@meetapp/FAILURE',
  };
}
