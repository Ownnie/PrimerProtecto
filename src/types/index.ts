export type Card = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type Item = Card & {
    quantity: number;
}
