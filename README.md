# firebase-database-mock

An in-memory database that resembles firebase database api, useful for writing unit tests.

## Usage

```
const Database = require('firebase-database-mock');

const data = {
    words: {
        one: 'hello',
        two: 'world'
    }
};

const db = Database.createInMemoryDatabase(data);

// lets do some reading
db.ref('words)
    .then(snapshot => {
        const values = snapshot.val();
        console.log(values.one);    // 'hello'
        console.log(values.two);    // 'world'
    });
```
