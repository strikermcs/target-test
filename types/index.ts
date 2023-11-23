export interface ITarget {
    id: string
    startText: string
    targetValue: string
    targetUnit: string
    centerText: string
    deadlineValue: string
    deadlineUnit: string
    endText: string
}

export interface IBaseline {
    baselineValue: string
    baselineUnit: string
}

export interface IArea {
    id: string
    baseline: IBaseline
    targets: ITarget[]
}