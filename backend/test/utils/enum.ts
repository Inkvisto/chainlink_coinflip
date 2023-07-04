export const Enum = (...options: string[]) => {
    return Object.fromEntries(options.map((key, i) => [key, i]));
}

export default Enum;
