import { createStore, createLogger } from 'vuex'
import users from './modules/users'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        users
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})