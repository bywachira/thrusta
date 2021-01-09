import { fetchToken } from "./helpers/localstorage";

const coreConfig: any = {
    api: process.env.REACT_APP_JOLLY_API || "http://localhost:5000/api/v1",
    token: fetchToken()
}

export default coreConfig;