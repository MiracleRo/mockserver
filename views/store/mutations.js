export default {
  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  }
}