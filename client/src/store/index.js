import { createStore, createLogger } from 'vuex'
import users from './modules/users'
import myself from './modules/myself'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        users,
        myself
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})