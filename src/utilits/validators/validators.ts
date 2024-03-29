
export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if(value) return undefined;
    return 'Field is required';
}
export const maxLengthCreator = (maxLenght: number): FieldValidatorType => (value) => {
    if(value.length > maxLenght) return `Max length is ${maxLenght} symbols`;
    return undefined;
}
// export const minLength2 = value => {
//     if(value.length < 2) return "Min length is 2 symbols";
//     return undefined;
// }