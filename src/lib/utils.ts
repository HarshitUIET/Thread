import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function bytestoMB(bytes:number):number{
    const MB = 1048576;
    return bytes/MB;
}

export function getRandomNumber(min:number,max:number):string{
  return Math.floor(Math.random()*(max-min +1)+min).toString()
}

export function formatDate(date:string):string{
    return moment(date).fromNow();
}