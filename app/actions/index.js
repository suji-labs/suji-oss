import { ACTIONS } from '../constants'
import tableActions from './tableActions'
import counter from './counter'

function resetErrorMessage () {
  return { type: ACTIONS.RESET_ERROR_MESSAGE }
}

export {
  counter
  tableActions,
  resetErrorMessage
}
