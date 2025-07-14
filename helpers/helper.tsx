
export function formatDate(date: Date){
    return [
        date.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
        date.toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }),
        
    ]
}

export function createOptionList(labelList: string[], length: number){
    type Options = {
        value:string;
        label:string;
    }
    const options:Options[] = []

    for(let i = 0; i < length; i++){
        options.push({
        value: labelList[i].toLowerCase(),
        label: labelList[i],
        });
  }

    return options
}
