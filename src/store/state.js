import {loadFav, loadHistory} from 'common/js/cache'

const state = {
  comic: {},
  history: loadHistory(),
  favorite: loadFav()
}

export default state
