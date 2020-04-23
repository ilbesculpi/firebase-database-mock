const DatabaseMock = require('./database');

const createInMemoryDatabase = (data) => {
    const database = new DatabaseMock(data);
    return database;
};

module.exports = {
    createInMemoryDatabase,
};
