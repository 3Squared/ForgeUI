import { ForgeModalBuilder } from '../../src/helpers';
import { describe, expect, it } from 'vitest'

describe('Modal Options Builder', () => {
    it('should have id, title and be centered by default', () => {
        const builder = new ForgeModalBuilder('test-id', 'modal title', () => {
        });
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify({
            centered: true,
            id: 'test-id',
            title: 'modal title'
        }));
    });

    it('should allow size to be set', () => {
        const builder = new ForgeModalBuilder('test-id', 'modal title', () => {
        }).setSize('xl');
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify({
            centered: true,
            id: 'test-id',
            title: 'modal title',
            size: 'xl'
        }));
    });

    it('should allow ok only to be set', () => {
        const builder = new ForgeModalBuilder('test-id', 'modal title', () => {
        }).setOkOnly('Ok Title');
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify({
            centered: true,
            id: 'test-id',
            title: 'modal title',
            okOnly: true,
            okTitle: 'Ok Title'
        }));
    });

    it('should allow ok variant to be set', () => {
        const builder = new ForgeModalBuilder('test-id', 'modal title', () => {
        }).setOkOnly('Ok Title', 'danger');
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify({
            centered: true,
            id: 'test-id',
            title: 'modal title',
            okOnly: true,
            okTitle: 'Ok Title',
            okVariant: 'danger'
        }));
    });

    it('should allow static to be set, via legacy mode', () => {
        const builder = new ForgeModalBuilder('test-id', 'modal title', () => {
        }).setLegacyMode();
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify({
            centered: true,
            id: 'test-id',
            title: 'modal title',
            static: true
        }));
    });

});
