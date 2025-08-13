export const maskDate = (value: string) => {
  return value
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
    .slice(0, 10)
}

export const maskPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 11) // Remove não dígitos e limita a 11 caracteres

  if (cleaned.length <= 10) { // Formato fixo: (99) 9999-9999
    return cleaned
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{4})$/, "$1-$2")
  } else { // Formato celular: (99) 9 9999-9999
    return cleaned
      .replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4")
  }
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

export const maskCNPJ = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .replace(/^(\d{2})(\d)/, "$1.$2") // Primeiro ponto
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Segundo ponto
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4") // Barra
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5") // Traço
    .slice(0, 18); // Limita a 18 caracteres (com pontos, barra e traço)
}