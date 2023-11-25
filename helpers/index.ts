import type { IParsedItem } from "~/types"
import dayjs from 'dayjs'

export const parseTargetString = (text: string): IParsedItem[] => {
    const parsedItems: IParsedItem[] = []

    const splitingText = text.split(' ')

    splitingText.forEach(i => {
        if(i === '[target]') {
            const item: IParsedItem = {
                type: 'target',
                value: '',
                unit: '%'
            }

            parsedItems.push(item)
        } else if(i === '[deadline]') {
            const item: IParsedItem = {
                type: 'deadline',
                value: '',
                unit: 'Year'
            }

            parsedItems.push(item)
        } else if(i === '') {
            
        }  
        
        else {
            const item: IParsedItem = {
                type: 'word',
                value: i
            }

            parsedItems.push(item)
        }
    })

  return parsedItems
}

export const getFormatDate = (date: any, type: string): string => {
    if(type === 'Day'){
       return dayjs(date).format('DD MMM YYYY')
    }
   
    if(type === 'Month'){
       return dayjs(date).format('MMM YYYY')
    }
    return dayjs(date).format('YYYY')
}  

