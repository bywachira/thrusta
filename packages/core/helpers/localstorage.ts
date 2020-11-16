export function setToken(token: string | undefined | null): void {
    if (token) {
        localStorage.setItem("x-jwt-token", token)
    }
    else {
        localStorage.setItem("x-jwt-token", '')
    }

    return;
}

export function fetchToken(): string | undefined | null {
    return localStorage.getItem("x-jwt-token")
}

export function removeToken(): void {
    return localStorage.removeItem("x-jwt-token")
}