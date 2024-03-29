import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import promptsReducer, { PromptsInitialState } from './reducers/promptsReducer.ts'
import dimensionsReducer, { DimensionsInitialState } from './reducers/dimensionsReducer.ts'
import samplingReducer, { SamplingInitialState } from './reducers/samplingReducer.ts'
import imagesReducer, { ImagesInitialState } from './reducers/imagesReducer.ts'
import authReducer, { AuthInitialState } from './reducers/authReducer.ts'

export interface RootState {
    prompts: PromptsInitialState[]
    dimensions: DimensionsInitialState[]
    sampling: SamplingInitialState[]
    images: ImagesInitialState[]
    auth: AuthInitialState
}

const rootReducer = combineReducers<RootState>({
    prompts: promptsReducer,
    dimensions: dimensionsReducer,
    sampling: samplingReducer,
    images: imagesReducer,
    auth: authReducer,
})

interface WindowWithDevTools extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

const composeEnhancers =
    (window as WindowWithDevTools).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware()))

export default store
