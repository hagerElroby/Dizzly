const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^\+[1-9]\d{1,14}$/;

export function isValidName(name:string) {
    return nameRegex.test(name)
}
export function isValidEmail(email:string) {
    return emailRegex.test(email)
}
export function isValidPhoneNumber(phoneNumber:string) {
    return phoneRegex.test(phoneNumber)
}