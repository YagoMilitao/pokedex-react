export const lbsToKgConvertion=(hectograms : number): string => {
    const kg = hectograms /10;
    return kg.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })+"kg";
};

export const feetToMeterConvertion=(decimetres: number): string => {
    const meters = decimetres /10;
    return meters.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })+"m";
};