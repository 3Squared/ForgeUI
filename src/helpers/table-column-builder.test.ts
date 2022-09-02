import { ForgeColumnBuilder } from "./table-column-builder";
import { describe, expect, it } from 'vitest'

interface Identity {
    name: string
}

interface Animal {
    name: string
    alive: boolean;
    identity: Identity
}

describe('Table Column Builder', () => {
    it('should return something', () => {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name', (col) => col.disableSorting())
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify([{key: 'name', sortable: false}]));
    });

    it('both ways of defining columns should return same structure', () => {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name', col => col.disableSorting()).addMiscColumn('identity.name', col => col.disableSorting())
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify([{
            "key": "name",
            "sortable": false
        }, {"key": "identity.name", "sortable": false}]));

        const builder2 = new ForgeColumnBuilder<Animal>().addColumn(c => c.name, col => col.disableSorting()).addColumn(k => k.identity.name, col => col.disableSorting())
        expect(JSON.stringify(builder2.build())).toBe(JSON.stringify([{
            "key": "name",
            "sortable": false
        }, {"key": "identity.name", "sortable": false}]));
    });

    it('adding autofilter should enable autofilter with string as default', () => {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name', (col) => col.enableAutoFilter());
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify([{
            key: 'name',
            sortable: true,
            autoFilter: true,
            filterType: 'string'
        }]));
    });

    it('should allow adding multiple columns', () => {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name').addColumn('alive')
        expect(builder.build().length).toBe(2)
    });

    it('should allow setting the label', () => {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name', col => col.setLabel('Hello World')).addColumn('alive')
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify([{
            key: 'name',
            sortable: true,
            label: 'Hello World'
        }, {key: 'alive', sortable: true}]));
    });

    it('should allow adding options to a column', () => {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name', (col) => col.disableSorting().enableAutoFilter())
        expect(JSON.stringify(builder.build())).toBe(JSON.stringify([{
            key: 'name',
            sortable: false,
            autoFilter: true,
            filterType: 'string'
        }]));
    });

    it('should only apply settings to current column', () => {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name', (col) => col.disableSorting()).addColumn('alive')
        const columns = builder.build();
        expect(columns[0].sortable).toBe(false)
        expect(columns[1].sortable).toBe(true)
    });
    
    it('should be the case that all columns are sortable by default', function () {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name').addColumn('alive');
        const columns = builder.build();
        columns.forEach(col => {
            expect(col.sortable).toBeTruthy()
        })
    });
    
    it('should set all columns to not sortable when global disable sorting applied', function () {
        const builder = new ForgeColumnBuilder<Animal>().addColumn('name').addColumn('alive').disableSorting();
        const columns = builder.build();
        columns.forEach(col => {
            expect(col.sortable).toBeFalsy()
        })
    });
});
