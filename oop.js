class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(newAvailable) {
        this.available = newAvailable;
    }
}

class GoodsList {
    constructor(filter, sortPrice, sortDir) {
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    #goods = [];

    get list() {
        const list = this.#goods.filter(good => this.filter.test(good.name));

        if (!this.sortPrice) {
            return list;
        }

        if (this.sortDir) {
            return list.sort((a, b) => (a.price - b.price));
        }
        return list.sort((a, b) => (b.price - a.price))
    }

    add(good) {
        this.#goods.push(good);
    }

    remove(id) {
        const findid = this.#goods.findIndex(good => good.id === id);
        if (findid >= 0) {
            this.#goods.splice(findid, 1);
            console.log(`Этот id=${id} удален из списка`)
        }
        else {
            console.log(`Такой id=${id} не найден`)
        }
    }
}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor(goods) {
        this.goods = [];
    }

    get totalAmount() {
        return this.goods.map(item => item.amount).reduce((a, b) => a + b, 0)
    }

    get totalSum() {
        return this.goods.reduce((a, b) => a + b.amount * b.price, 0);
    }

    add(good, amount) {
        if (this.goods.findIndex(i => i.id === good.id) >= 0) {
            this.goods[id].amount += amount;
        }
        else {
            const addGoodToBasket = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGoodToBasket);
        }
    }

    remove(good, amount) {
        const i = this.goods.findIndex(i => i.id === good.id);
        if (i >= 0) {
            if (this.goods[i].amount - amount > 0) {
                this.goods[i].amount -= amount;
            } else {
                this.goods.splice(i, 1);
            }
        }
    }

    clear() {
        return this.goods = Array();
    }

    removeUnavailable() {
        return this.goods.filter(item => item.available === true);
    }
}

const one = new Good(1, "apple", "phone", [10, 12, 13, 14], 100000, true);
const two = new Good(2, "nokia", "phone", [13, 14], 5000, true);
const three = new Good(3, "oppo", "nophone", [14], 35000, false);
const four = new Good(4, "apple", "tablet", [10, 12, 13], 25000, true);
const five = new Good(5, "xaomi", "tablet", [4, 6], 2500, true);

console.log(one)

goodslist = new GoodsList(/^/gi, true, true)
console.log(goodslist)

goodslist.add(one)
goodslist.add(two)
goodslist.add(three)
goodslist.add(four)
goodslist.add(five)

console.log(goodslist.list)

goodslist.remove(1)
console.log(goodslist.list)

bascket = new Basket()

bascket.add(one, 2)
bascket.add(three, 3)
console.log(bascket.totalSum)
bascket.remove(one, 1)
console.log(bascket.totalSum)
bascket.remove(one, 1)
console.log(bascket.totalSum)
bascket.removeUnavailable()
console.log(bascket.totalSum)
bascket.clear()
console.log(bascket)