export function validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9.-]+@successive\.tech$/;
    return pattern.test(email);
}
