export function email(value) {
    const re = /\S+@\S+\.\S+/;
    return re.test(value) || 'E-mail must be valid';
}
export function required(value) {
    return !!value || 'Required';
}
export function minLength(value, length) {
    return value.length >= length || `At least ${length} characters required`;
}
export function sameAs(value, other) {
    return value === other || 'The values do not match';
}
export function number(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) || 'Must be a number';
}
export function minValue(value, min) {
    return value >= min || `Must be greater than ${min}`;
}

export function phone(value) {
    const cleanedValue = value.replace(/[^\d]/g, '');
    return !isNaN(parseFloat(cleanedValue)) && isFinite(cleanedValue) || 'Phone must be valid';
}
export function maxLength(value, length) {
    return value.length <= length || `Must be less than ${length} characters`;
}
export function fullName(value) {
    const re = /^[a-zA-Z ]+$/;
    return re.test(value) || 'Full name must be valid';
}
export function username(value) {
    return value.length >= 3 || 'Username must be at least 3 characters long';
}
export function password(value) {
    if (value.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(value)) {
        return 'Password must contain at least one lowercase letter';
    }
    if (!/\d/.test(value)) {
        return 'Password must contain at least one digit';
    }
    if (!/[@$!%*?&]/.test(value)) {
        return 'Password must contain at least one special character';
    }
    return true;
}


export default { email, required, minLength, sameAs, number, minValue, phone, maxLength, fullName}