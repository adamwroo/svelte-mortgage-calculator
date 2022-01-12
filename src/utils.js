export const toYearsAndMonthsHint = (totalMonths) => {
    let hint = '';
    let negativeSign = '- ';
    if (totalMonths < 0)
    {
        totalMonths = Math.abs(totalMonths);
        hint += negativeSign;
    }

    let years = Math.floor(totalMonths / 12); // get whole years
    let months = totalMonths % 12;
    // years part
    if (years == 0 && months == 0)
    {
        return '0'; // return plain '0'
    }
    else if (years == 0 && months != 0)
    {
        hint += '';
    }
    else if (years == 1)
    {
        hint += `${years} rok`;
    }
    else if (years % 100 == 11 || years % 100 == 12 || years % 100 == 13 || years % 100 == 14)
    {
        hint += `${years} lat`;
    }
    else if (years % 10 == 2 || years % 10 == 3 || years % 10 == 4)
    {
        hint += `${years} lata`;
    }
    else
    {
        hint += `${years} lat`;
    }

    // months part
    if (months == 0)
    {
        return hint; // return just years
    }

    hint += hint && hint !== negativeSign ? ' i ' : '';
    if (months == 1)
    {
        hint += `${months} miesiąc`;
    }
    else if (months % 100 == 11 || months % 100 == 12 || months % 100 == 13 || months % 100 == 14)
    {
        hint += `${months} miesięcy`;
    }
    else if (months % 10 == 2 || months % 10 == 3 || months % 10 == 4)
    {
        hint += `${months} miesięce`;
    }
    else
    {
        hint += `${months} miesięcy`;
    }

    return hint;
}

export const toPLN = (amount) => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount)
}