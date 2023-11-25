export type TParsedItemType = 'word' | 'target' | 'deadline'

export interface ITarget {
    id: string
    items: IParsedItem[]
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

export interface IParsedItem {
    type: TParsedItemType
    value: string
    unit?: string
}