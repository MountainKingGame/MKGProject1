var CallbackCache = /** @class */ (function () {
    function CallbackCache() {
        this.items = [];
    }
    CallbackCache.prototype.addItem = function (key1, key2, data) {
        var item = new CallbackCacheItem();
        item.key1 = key1;
        item.key2 = key2;
        item.data = data;
        this.items.push(item);
    };
    CallbackCache.prototype.getItemByKey12 = function (key1, key2) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1 && item.key2 == key2) {
                return item;
            }
        }
        return null;
    };
    CallbackCache.prototype.getItemByKey1 = function (key1) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1) {
                return item;
            }
        }
        return null;
    };
    CallbackCache.prototype.getItemByKey2 = function (key2) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key2 == key2) {
                return item;
            }
        }
        return null;
    };
    CallbackCache.prototype.getItemsByKey12 = function (key1, key2) {
        var rs = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1 && item.key2 == key2) {
                rs.push(item);
            }
        }
        return rs;
    };
    CallbackCache.prototype.getItemsByKey1 = function (key1) {
        var rs = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1) {
                rs.push(item);
            }
        }
        return rs;
    };
    CallbackCache.prototype.getItemsByKey2 = function (key2) {
        var rs = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key2 == key2) {
                rs.push(item);
            }
        }
        return rs;
    };
    CallbackCache.prototype.removeItemsByKey12 = function (key1, key2) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1 && item.key2 == key2) {
                this.items.splice(i, 1);
                i--;
            }
        }
    };
    CallbackCache.prototype.removeItemsByKey1 = function (key1) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1) {
                this.items.splice(i, 1);
                i--;
            }
        }
    };
    CallbackCache.prototype.removeItemsByKey2 = function (key2) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key2 == key2) {
                this.items.splice(i, 1);
                i--;
            }
        }
    };
    return CallbackCache;
}());
var CallbackCacheItem = /** @class */ (function () {
    function CallbackCacheItem() {
    }
    return CallbackCacheItem;
}());
//# sourceMappingURL=CallbackCache.js.map