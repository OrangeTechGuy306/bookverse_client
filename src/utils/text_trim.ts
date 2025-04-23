

export const TextTrim = (text: string)=>{
    if(text.length > 35){
        return text.substring(0, 20) + "..."
    }else{
        return text
    }
}