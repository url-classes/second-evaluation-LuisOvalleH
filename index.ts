import { RBTree } from "./red_black_tree";
import { Product } from "./producto";

const myRBTree: RBTree = new RBTree();
let product1 : Product = new Product('Pepsi',12312,12);
let product2 : Product = new Product('CocaCola',94929,5);
let product3 : Product = new Product('Orange',23941,15);
let product4 : Product = new Product('Mirinda',49523,8);
let product5 : Product = new Product('Tonajan',54842,10);

myRBTree.insert(product1);
myRBTree.insert(product2);
myRBTree.insert(product3);
myRBTree.insert(product4);
myRBTree.insert(product5);

console.log('-----Innorder-------')
myRBTree.printInnorder();
myRBTree.delete(product2)
console.log('-----Innorder-------')
myRBTree.printInnorder();
console.log('------Preorder------')
myRBTree.printPreorder()
console.log('--------Minimo-------')
myRBTree.PrintMinimun()
console.log('--------Maximo-------')
myRBTree.PrintMaximun()




