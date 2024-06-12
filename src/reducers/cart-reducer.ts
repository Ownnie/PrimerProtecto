import { Card, Item } from "../types";
import { db } from "../data/db";

export type CartActions =
    { type: 'addToCart', payload: { item: Card } } |
    { type: 'removeFromCart', payload: { id: Card['id'] } } |
    { type: 'addToItem', payload: { item: Card } } |
    { type: 'substractFromItem', payload: { item: Card } } |
    { type: 'clearCart' }

export type CartState = {
    data: Card[],
    cart: Item[]
}

const initialCart = (): Item[ ] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

const MAX_ITEMS = 5
const MIN_ITEMS = 1

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {

    if (action.type === 'addToCart') {
        const itemExists = state.cart.find(card => card.id === action.payload.item.id)
        let updatedCart: Item[] = []
        if (itemExists) {
            updatedCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem: Item = { ...action.payload.item, quantity: 1 }
            updatedCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'removeFromCart') {
        return { ...state, cart: state.cart.filter(card => card.id !== action.payload.id) }
    }

    if (action.type === 'addToItem') {
        const cartCopyAdd = state.cart.map(itemCopy => {
            if (itemCopy.id === action.payload.item.id && itemCopy.quantity < MAX_ITEMS) {
                return {
                    ...itemCopy,
                    quantity: itemCopy.quantity + 1
                }
            } else {
                return itemCopy;
            }
        })
        return { ...state, cart: cartCopyAdd }
    }

    if (action.type === 'substractFromItem') {
        const cartCopySubstract = state.cart.map(itemCopy => {
            if (itemCopy.id === action.payload.item.id && itemCopy.quantity > MIN_ITEMS) {
                return {
                    ...itemCopy,
                    quantity: itemCopy.quantity - 1
                }
            } else {
                return itemCopy;
            }
        })
        return { ...state, cart: cartCopySubstract }
    }

    if (action.type === 'clearCart') {
        return { ...state, cart: [] }
    }

    return state
}