import config from "../config"

export default {
    async getAllUsers() {
        const response = await fetch(`${config.server_http}/user/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    },
}
