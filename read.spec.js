

const DatabaseMock = require('./database');

describe('read', () => {

    let database;
    let data;

    beforeEach(() => {

        data = {
            words: {
                'one': 'hello',
                'two': 'world'
            }
        };

        database = DatabaseMock.createInMemoryDatabase(data);
    });

    it('should return snapshot', async () => {

        // when querying for words list

        const snapshot = await database.ref('words').once('value');

        // expect snapshot to contain words data
        expect(snapshot).not.toBeNull();
        const values = snapshot.val();
        expect(values).toBeDefined();
        expect(Object.keys(values)).toEqual(['one', 'two']);
        expect(values.one).toBe('hello');
        expect(values.two).toBe('world');
    });

});
