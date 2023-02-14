export class StringForms{
    static FirstLetterCaps(text: string): string{
        return text.replace(text.charAt(0).toUpperCase() + text.slice(1),"")
    }
}