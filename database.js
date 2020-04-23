


class Snapshot {

    constructor(db, data, key, path) {
        this.db = db;
        this.data = data;
        this.key = key;
        this.path = path;
    }

    once(type) {
        const snapshot = {
            key: this.key,
            val: () => this.data,
        };
        return Promise.resolve(snapshot);
    }

    update(values) {
        return this.db.update(this.path, values);
    }

    set(values) {
        return this.db.update(this.path, values);
    }

}

class DatabaseMock {

    constructor(data) {
        this.db = data;
    }

    ref(path) {
        return this.getSnapshotAtPath(path);
    }

    _getDataAtPath(path) {
        const arr = path.split("/");
        let data = this.db;
        let key = null;
        for( let i = 0; i < arr.length; i++ ) {
            key = arr[i];
            data = data[key];
            if( !data ) {
                return {};
            }
        }
        return data;
    }

    _setDataAtPath(path, values) {
        const arr = path.split("/");
        let data = this.db;
        let key = null;
        for( let i = 0; i < arr.length; i++ ) {
            key = arr[i];
            if( !data[key] ) {
                data[key] = {};
            }
            if( i == arr.length - 1 ) {
                break;
            }
            data = data[key];
        }
        data[key] = values;
    }

    getSnapshotAtPath(path) {
        const data = this._getDataAtPath(path);
        const keys = path.split("/");
        const key = keys[keys.length-1];
        const snapshot = new Snapshot(this, data, key, path);
        return snapshot;
    }

    update(path, values) {
        let data = this._getDataAtPath(path);
        const newData = Object.assign(data, values);
        this._setDataAtPath(path, newData);
        return Promise.resolve();
    }

}

module.exports = DatabaseMock;
