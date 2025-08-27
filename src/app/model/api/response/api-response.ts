interface ApiResponse<T = null> {
    status: number,
    message: string,
    body: T
}