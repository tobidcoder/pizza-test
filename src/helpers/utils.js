
export const formatDollar = number => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}

export const formartEuros = number => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR'}).format(number);
}