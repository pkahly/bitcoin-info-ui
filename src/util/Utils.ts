export function getInput(id:string):string {
    let inputElement = document.getElementById(id) as HTMLInputElement
    if (!inputElement) {
        console.error("Failed to load input element: " + id)
        return ""
    }

    return inputElement.value
}