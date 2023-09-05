import { describe, expect, it } from "vitest";
import { add } from '@/utils'

describe('add', () => {
    it('should add two numbers correctly', () => {
        expect(add(2, 3)).toBe(5)
    })

    it('should add a number and a string correctly', () => {
        expect(add(2, '3')).toBe('23')
    })

    it('should add two strings correctly', () => {
        expect(add('hello', 'world')).toBe('helloworld')
    })
})