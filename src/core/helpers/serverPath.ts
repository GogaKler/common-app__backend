export const serverPath = (file: string): string => {
    return `${process.env.NEXT_PUBLIC_URL}/${file}`;
};
