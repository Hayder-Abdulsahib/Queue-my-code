class Node {
    constructor(groupSize, nextNode = null) {
        this.groupSize = groupSize;
        this.newNode = nextNode;

    }
}

class Queue {
    constructor(limit = null) {
        this.frontNode = null;
        this.backNode = null;
        this.limit = limit;
        this.size = 0;
    }

    isEmpty = () => this.size === 0;

    isFull = () => this.size === this.limit;

    peek = () => {
        if (this.isEmpty()) console.log("Empty queue!");
        else return this.frontNode;
    };

    enqueue = (groupSize) => {
        if (this.isFull()) console.log("There's no place for you here");
        else {
            const newNode = new Node(groupSize);
            if (this.isEmpty()) {
                // the new node is both the front and back node
                this.frontNode = newNode;
                this.backNode = newNode;
            } else {
                // link the backnode to the new node then make the newnode the backnode
                this.backNode.nextNode = newNode;
                this.backNode = newNode;
            }
            this.size++;
        }
    };

    dequeue = () => {
        if (this.isEmpty()) {
            console.log("OOps! Nothing to remove.");
        } else {
            const removedNode = this.frontNode;
            if (this.size === 1) {
                this.frontNode = null;
                this.backNode = null;
            } else {
                this.frontNode = removedNode.nextNode;
            }
            this.size--;
            return removedNode.groupSize;
        }
    };
}

const groupOfPeople = new Queue();
let waitingTime = 0;
let totalWaitingTime = 0;


// a creat a function to dive the people inside the group into 12
function arrayOf12(groupNumber) {
    let divide = [];
    while (groupNumber > 0) {
        if (groupNumber > 12) {
            divide.push(12);
            groupNumber = groupNumber - 12;
        }
        else {
            divide.push(groupNumber);
            groupNumber = groupNumber - 12;
        }
    }
    return divide;

}


// this function enqueue the divided people into the queue 
// and also it increase the the waiting time for the queue
function groupOf12(groupNumber) {
    let group = groupNumber.map(function (num) {
        waitingTime = num * 0.5;
        totalWaitingTime += waitingTime;
        return groupOfPeople.enqueue(num);
    })
    return group;
}


//this function dequeue from the queue and also decrease the waiting time
function dequeueGroup() {
    let groupSize = groupOfPeople.dequeue();
    waitingTime = groupSize * 0.5;
    totalWaitingTime -= waitingTime;
    return groupSize
}



console.log(`The waiting time for the Queue is ${totalWaitingTime} minutes`,);

groupOf12(arrayOf12(7));
groupOf12(arrayOf12(15));
groupOf12(arrayOf12(6));
groupOf12(arrayOf12(4));


console.log(`The waiting time for the Queue after people entered is ${totalWaitingTime} minutes`,);

console.log(`The size of this group who go into the ride is ${dequeueGroup()} people`);

console.log(`The waiting time after the people next line go is ${totalWaitingTime} minutes`)

