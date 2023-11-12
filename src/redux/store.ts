import { combineReducers, createStore } from 'redux'
import promptsReducer from './reducers/promptsReducer.ts'
import dimensionsReducer from './reducers/dimensionsReducer.ts'
import samplingReducer from './reducers/smaplingReducer.ts'

const rootReducer = combineReducers({
    prompts: promptsReducer,
    dimensions: dimensionsReducer,
    sampling: samplingReducer,
})

const store = createStore(rootReducer)

export default store
