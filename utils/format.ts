export function formatPdfNameAsTitle(pdfName:string):string{

    const withoutExtension=pdfName.replace(/\.[^/.]+$/, "");    //remove extension and replace special characters with space
    const withSpaces=withoutExtension.replace(/[-_]+/g, " ")//replace - or _ with space
    .replace(/([a-z])([A-Z])/g, "$1 $2");//add space between camelCase
    return withSpaces
    .split(' ')
    .map((word)=>word.charAt(0).toUpperCase()+word.slice(1))
    .join(' ')
    .trim();
}