export const maskDate = (value: string) => {
  return value
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
    .slice(0, 10)
}
  
export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona DDD com parênteses
    .replace(/(\d)(\d{4})(\d{4})$/, "$1 $2-$3") // Espaço após o 9 e adiciona traço
    .slice(0, 16); // Limita a 16 caracteres
}

export const maskVerificationCode = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .slice(0, 6);       // Limita a 6 dígitos
}

export const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .replace(/^(\d{5})(\d)/, "$1-$2") // Adiciona o traço após os 5 primeiros dígitos
    .slice(0, 9); // Limita a 9 caracteres (incluindo o "-")
}

export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .replace(/^(\d{3})(\d)/, "$1.$2") // Primeiro ponto
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // Segundo ponto
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4") // Traço
    .slice(0, 14); // Limita a 14 caracteres (incluindo pontos e traço)
}