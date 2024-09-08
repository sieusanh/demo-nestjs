
class BaseA {
    prop0;
}

class A extends BaseA{
    prop1;
    prop2;
    // constructor(val1, val2) {
    //     this.prop1 = val1;
    //     this.prop2 = val2;
    // }
    print() {
        console.log('aha')
    }
}

console.log('=here ')
// const a = new A('a', 2)
const a = new A()
for (const key of Object.keys(a)) {
    console.log('========== keyz ', key)
}

console.log('================= a ', a)
console.log('================= Object.keys(a) ', Object.keys(a))

class B {
    prop1;
    prop2;

    constructor(val1, val2) {
        this.prop1 = val1;
        this.prop2 = val2;
    }
}
const b = new B('b', 2)
for (let i of Object.keys(a)) {
    a[i] = b[i]
    // console.log('========= k ', a[i])
}

// console.log('========= a ', a)

for (const k of Object.keys(b)) {
    console.log('=========== key ', k)
}