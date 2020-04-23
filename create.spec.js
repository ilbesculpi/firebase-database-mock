
const DatabaseMock = require('./database');

describe('create', () => {

    it('should return an instance', () => {

        const data = {
            words: {
                'one': 'hello',
                'two': 'world'
            }
        };

        const database = DatabaseMock.createInMemoryDatabase(data);

        expect(database).toBeDefined();
    });

})