function parsePayload(utfData: string) {
    const updatedData = utfData.slice(2, utfData.length)

    if (JSON.parse(updatedData)[1] && JSON.parse(updatedData)[0]) {
        return {
            payload: JSON.parse(updatedData)[1],
            type: JSON.parse(updatedData)[0]
        }
    }
    return {
        payload: {
            node: '',
            token: ''
        },
        type: ''
    }
}

export default parsePayload;