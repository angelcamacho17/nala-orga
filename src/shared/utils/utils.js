const months = new Map();
months.set(1, 'January')
months.set(2, 'Febraury')
months.set(3, 'March')
months.set(4, 'April')
months.set(5, 'May')
months.set(6, 'June')
months.set(7, 'Jule')
months.set(8, 'August')
months.set(9, 'September')
months.set(10, 'October')
months.set(11, 'November')
months.set(12, 'December')

export function getMonth(month){
    return months.get(parseInt(month));
}