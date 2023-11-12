import { combineReducers, createStore } from 'redux'
import promptsReducer, { PromptsInitialState } from './reducers/promptsReducer.ts'
import dimensionsReducer, { DimensionsInitialState } from './reducers/dimensionsReducer.ts'
import samplingReducer, { SamplingInitialState } from './reducers/smaplingReducer.ts'

export interface RootState {
    prompts: PromptsInitialState[]
    dimensions: DimensionsInitialState[]
    sampling: SamplingInitialState[]
}

const rootReducer = combineReducers<RootState>({
    prompts: promptsReducer,
    dimensions: dimensionsReducer,
    sampling: samplingReducer,
})

const store = createStore(rootReducer)

export default store
