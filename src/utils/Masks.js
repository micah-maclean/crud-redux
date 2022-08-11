export const maskedInputDate = [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

export const maskedInputCPF = [ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-',/\d/, /\d/];

export const maskedInputCep = [/\d/, /\d/, /\d/,  /\d/, /\d/,'-', /\d/, /\d/, /\d/];

export const maskedInputTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export const maskCPF = value => {
    return value?.replace(/\D/g,"")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d{1,2})$/,"$1-$2");
}

export const maskDate = value => {
    return value?.split('-').reverse().join('/');
}

export const maskTelefone = value => {
    return value?.replace(/^(\d{2})(\d)/g,"($1) $2")
    .replace(/(\d)(\d{4})$/,"$1-$2"); 
}