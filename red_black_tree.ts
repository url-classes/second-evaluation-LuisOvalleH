import { NodeRBT } from "./node_rbt";
import { Product } from "./producto";

export class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(new Product('inicial', 0 , 0), true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    private InnordenPrintNode(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf)
            this.InnordenPrintNode(nodo.getLeftChild());
        console.log(nodo.getData().getAllDatas());
        if (nodo?.getRightChild() !== this.leaf)
            this.InnordenPrintNode(nodo.getRightChild());
    }

    private PreordenPrintNode(nodo: NodeRBT): void {
        console.log(nodo.getData().getAllDatas());
        if (nodo.getLeftChild() !== this.leaf)
            this.InnordenPrintNode(nodo.getLeftChild());
        if (nodo?.getRightChild() !== this.leaf)
            this.InnordenPrintNode(nodo.getRightChild());
    }


    private PostOrdenPrintNode(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf)
            this.InnordenPrintNode(nodo.getLeftChild());
        if (nodo?.getRightChild() !== this.leaf)
            this.InnordenPrintNode(nodo.getRightChild());
        console.log(nodo.getData().getAllDatas() );

    }

    public printInnorder(): void {
        this.InnordenPrintNode(this.root);
    }


    public printPreorder(): void {
        this.PreordenPrintNode(this.root);
    }

    public printPostorden():void{
        this.PostOrdenPrintNode(this.root);
    }

    public insert(data: Product): void {
        // Inserción normal de BST
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        // Continua inserción normal de BST
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData().getPrecio() < current.getData().getPrecio()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData().getPrecio() < parent.getData().getPrecio()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        // Propiedades del RBT
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack()
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        // corregir inserción
        this.fixInsert(newNode);
    }

    
    public search(dataToSearch: Product): Product | number{
        let data: Product | number = -1;
        let current: NodeRBT | null = this.root;
        while (current != null) {
            if (current.getData().getPrecio() == dataToSearch.getPrecio()) {
                data = current.getData().getPrecio();
                break;
            } else if (dataToSearch < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        return data;
    }

    public delete(data: Product): void {
        let nodeToDelete: NodeRBT = this.searchNode(this.root, data);
        if (nodeToDelete === this.leaf) {
            console.log("Nodo no encontrado");
            return;
        }
    
        let y: NodeRBT = nodeToDelete;
        let yOriginalColor: string = y.getColor();
        let x: NodeRBT;
    
        if (nodeToDelete.getLeftChild() === this.leaf) {
            x = nodeToDelete.getRightChild();
            this.transplant(nodeToDelete, nodeToDelete.getRightChild());
        } else if (nodeToDelete.getRightChild() === this.leaf) {
            x = nodeToDelete.getLeftChild();
            this.transplant(nodeToDelete, nodeToDelete.getLeftChild());
        } else {
            y = this.minimum(nodeToDelete.getRightChild());
            yOriginalColor = y.getColor();
            x = y.getRightChild();
    
            if (y.getFather() !== nodeToDelete) {
                this.transplant(y, y.getRightChild());
                y.setRightChild(nodeToDelete.getRightChild());
                y.getRightChild().setFather(y);
            }
    
            this.transplant(nodeToDelete, y);
            y.setLeftChild(nodeToDelete.getLeftChild());
            y.getLeftChild().setFather(y);
            y.setNodeColor(nodeToDelete.getColor());
        }
    
        if (yOriginalColor === "BLACK") {
            this.fixDelete(x);
        }
    }
    
    private fixDelete(x: NodeRBT): void {
        while (x !== this.root && x.getColor() === "BLACK") {
            if (x === x.getFather().getLeftChild()) {
                let sibling: NodeRBT = x.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.leftRotate(x.getFather());
                    sibling = x.getFather().getRightChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (sibling.getRightChild().getColor() === "BLACK") {
                        sibling.getLeftChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.rightRotate(sibling);
                        sibling = x.getFather().getRightChild();
                    }
                    sibling.setNodeColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(x.getFather());
                    x = this.root;
                }
            } else {
                let sibling: NodeRBT = x.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.rightRotate(x.getFather());
                    sibling = x.getFather().getLeftChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (sibling.getLeftChild().getColor() === "BLACK") {
                        sibling.getRightChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.leftRotate(sibling);
                        sibling = x.getFather().getLeftChild();
                    }
                    sibling.setNodeColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(x.getFather());
                    x = this.root;
                }
            }
        }
        x.setNodeAsBlack();
    }
    
    private transplant(u: NodeRBT, v: NodeRBT): void {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }
    
    private minimum(node: NodeRBT): NodeRBT {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node
    }

    private min(node: NodeRBT): void {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
         console.log(node.getData().getAllDatas())
    }

    public PrintMinimun(): void{
        this.min(this.root)
    }

    private Max(node: NodeRBT): void {
        while (node.getRightChild() !== this.leaf) {
            node = node.getRightChild();
        }
        console.log(node.getData().getAllDatas())
    }

    public PrintMaximun(): void{
        this.Max(this.root)
    }


    
    private searchNode(root: NodeRBT, data: Product): NodeRBT {
        let current: NodeRBT = root;
        while (current !== this.leaf && current.getData().getPrecio() !== data.getPrecio()) {
            if (data.getPrecio() < current.getData().getPrecio()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        return current;
    }

    public printPathToValue(value: number): void {
        let current: NodeRBT = this.root;
        let path: string[] = [];  // Para almacenar el camino
    
        while (current !== this.leaf) {
            path.push(`${current.getData().getPrecio()}(${current.getColor()})`);  // Agrega el nodo actual al camino
            if (value === current.getData().getPrecio()) {
                console.log("Camino hacia el valor " + value + ": " + path.join(" -> "));
                return;
            } else if (value < current.getData().getPrecio()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
    
        // Si llegamos aquí, el valor no está en el árbol
        console.log("El valor " + value + " no se encuentra en el árbol.");
    }


}
