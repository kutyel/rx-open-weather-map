export default (state = [], { type, index, temp }) => {
  switch (type) {
    case 'UPDATE_TEMPERATURE':
      const city = state[index] || {}
      return [
        ...state.slice(0, index),
        {
          ...city,
          history: [...city.history, city.temp],
          temp,
        },
        ...state.slice(index + 1),
      ]
    default:
      return state
  }
}
