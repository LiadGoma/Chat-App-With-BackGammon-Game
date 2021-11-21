export default function validateForm(data) {
    let errors = {};
    let isValid = true;
    if (!data.name.trim()) errors.name = "username is required";
    else if (data.name.trim().length < 3) errors.name = "user name must be more than 3 characters";
    else if (data.name.trim().length > 50) errors.name = "user name must be less than 50 characters";



    if (!data.email) errors.email = "email is required";
    else if (data.email.length < 5) errors.email = "email must be over 5 characters";
    else if (data.email.length > 255) errors.email = "email must be less than 255 charactes";

    else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(data.email))
        errors.email = "email is invalid";

    if (!data.password) errors.password = "password is required";
    else if (data.password.length < 5) errors.password = "password must be over 5 characters";
    else if (data.password.length > 255) errors.password = "passworf must be less than 255 characters";


    if (errors.email || errors.password || errors.name) isValid = false;




    return { isValid, errors };
}