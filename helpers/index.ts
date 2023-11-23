import type { ITarget } from "~/types"

export const parseTargetString = (text: string): Partial<ITarget> => {
    const splitingText = text.split('|')
    return {
        startText: splitingText[0],
        targetValue: splitingText[1],
        targetUnit: splitingText[2],
        centerText: splitingText[3],
        deadlineValue: splitingText[4],
        deadlineUnit: splitingText[5],
        endText: splitingText[6]
    }
} 