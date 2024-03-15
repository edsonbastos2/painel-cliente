export const dateformat = (date: string | Date) => {
    return Intl.DateTimeFormat(
        'pt-BR',
        { dateStyle: 'short', timeStyle:'short'}
    ).format(date instanceof Date ?  date : new Date(date))

}