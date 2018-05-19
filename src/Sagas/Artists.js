import { put, call, select } from 'redux-saga/effects';
import _get from 'lodash/get';
import ArtistsActions from '../Redux/Artists';
import Api from '../Services/Api';

function * get({ name }) {
  const artist = yield select(state => state.artists.byName[name.toLowerCase()]);

  // skip loading artist twice
  if (artist || _get(artist, 'loading') === true) {
    return;
  }

  // set artist.loading so that any follow up requests
  // with the same name doesn't call API again
  // we need this because we render multiple components
  // that all dispatch getArtist in parallel
  // so, we only lock it here for the first one to pass
  yield put(ArtistsActions.setLoading(name));

  const res = yield call(Api.getArtist, name);

  if (res.ok) {
    yield put(ArtistsActions.getSuccess(name, res.data));
  }
}

export default {
  get,
};
