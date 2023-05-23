export const lbsToKgConvertion=(hectograms : number): number => {
    const kg = hectograms /10;
    return Number(kg.toFixed(2));
};

export const feetToMeterConvertion=(decimetres: number): string => {
    const meters = decimetres /10;
    return meters.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
};