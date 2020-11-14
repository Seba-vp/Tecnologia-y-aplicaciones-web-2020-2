export default function validateInfo(values) {
    let errors = {}

    // Name
    if (!values.name.trim()) {
        errors.name = 'No puedes dejar tu nombre en blanco'
    }

    // Email
    if (!values.email) {
        errors.email = 'Debes introducir tu mail'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Tu mail es inválido'
    }

    // Contraseña
    if (!values.password) {
        errors.password = 'Debes introducir tu contraseña'
    } else if (values.password.length < 4) {
        errors.password = 'Tu contraseña debe tener 4 o más caracteres ';
    }
    if (!values.password2) {
        errors.password2 = 'Debes confirmar tu contraseña';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Las contraseñas no coinciden';
    }
    return errors;
}