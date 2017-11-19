/**
 * 二元樹節點
 */
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

/**
 * 二元樹根
 */
function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.getRoot = function() {
  return this.root;
};

/**
 * 加入節點
 */
BinarySearchTree.prototype.push = function(value) {
  // 二元樹根
  let root = this.root;

  // 如果沒有二元樹根就增加一個節點，並且直接結束
  if (!root) {
    this.root = new Node(value);
    return;
  }

  // 目前的二元樹根
  let currentNode = root;
  // 增加一個新節點
  const newNode = new Node(value);

  // 遍歷整個二元樹
  while (currentNode) {
    // 值小於當前節點值就擺左邊
    if (value < currentNode.value) {
      // 當前節點如果左邊是空的，就擺進左邊，不是則記錄起來以「當前節點」繼續往下遍歷
      if (!currentNode.left) {
        currentNode.left = newNode;
        break;
      } else {
        currentNode = currentNode.left;
      }
    } else {
      // 當前節點如果左邊是空的，就擺進左邊，不是則記錄起來以「當前節點」繼續往下遍歷
      if (!currentNode.right) {
        currentNode.right = newNode;
        break;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
};

/**
 * 中序遍歷（根在中間）
 * 由小到大遍歷，也是一種排序
 */
function inOrderTraverse(node) {
  // 沒有就返回
  if (!node) return;
  // 當前節點
  let currentNode = node;
  // 無論如何先找左邊
  inOrderTraverse(currentNode.left);
  // 如果沒有就會往下跑，並印出最後一個節點的值
  console.log(currentNode.value);
  // 沒有左邊就開始跑右邊
  inOrderTraverse(currentNode.right);
}

/**
 * 先序遍歷（根在開始）
 * 從根開始，然後往左跑，遇到節點有值就顯示，沒值就往右
 */
function preOrderTraverse(node) {
  if (!node) return;
  // 當前節點
  let currentNode = node;
  // 直接顯示節點值
  console.log(currentNode.value);
  // 先跑左邊
  preOrderTraverse(currentNode.left);
  // 跑完跑右邊
  preOrderTraverse(currentNode.right);
}

/**
 * 後序遍歷（根在最後）
 * 從最後代節點開始遍歷
 * 原理：一直不斷的先往下往左搜索，沒節點時就換往右邊，直到最後一個節點沒有繼續下去，就顯示節點的值
 */
function postOrderTraverse(node) {
  // 沒有節點就返回
  if (!node) return;
  // 當前節點
  let currentNode = node;
  // 一直往下往左跑
  postOrderTraverse(currentNode.left);
  // 沒左邊節點就往右邊跑
  postOrderTraverse(currentNode.right);
  // 直到最後一層才顯示目前節點的值
  console.log(currentNode.value);
}

/**
 * 搜尋值是否存在二元樹中
 */
let searchTime = 0;
function searchNode(node, value) {
  searchTime++;
  if (!node) return false;
  if (value < node.value) {
    return searchNode(node.left, value);
  } else if (value > node.value) {
    return searchNode(node.right, value);
  } else if (value === node.value) {
    return true;
  }
}

/**
 * 從二元樹中取得最大值
 * 原理：二元樹中的最大值會一直往右邊丟，因此可以快速找到最大值
 */
function maxValue(node) {
  // 沒有節點就返回
  if (!node) return;
  // 當前節點
  let currentNode = node;
  // 一直往右跑，直到沒有最右邊
  if (currentNode.right) {
    currentNode = currentNode.right;
    maxValue(currentNode);
  } else {
    console.log('Max Value =>', currentNode.value);
  }
}

/**
 * 從二元樹中取得最小值
 * 原理：二元樹中的最小值會一直往左邊丟，因此可以快速找到最小值
 */
function minValue(node) {
  // 沒有節點就返回
  if (!node) return;
  // 當前節點
  let currentNode = node;
  // 一直往左跑，直到沒有最左邊
  if (currentNode.left) {
    currentNode = currentNode.left;
    minValue(currentNode);
  } else {
    console.log('Min Value =>', currentNode.value);
  }
}

let tree = new BinarySearchTree();
tree.push(7);
tree.push(2);
tree.push(4);
tree.push(5);
tree.push(12);
tree.push(1);
tree.push(97);

console.log('--maxValue--');
maxValue(tree.getRoot());
console.log('--minValue--');
minValue(tree.getRoot());
console.log('--inOrderTraverse--');
inOrderTraverse(tree.getRoot());
console.log('--preOrderTraverse--');
preOrderTraverse(tree.getRoot());
console.log('--postOrderTraverse--');
postOrderTraverse(tree.getRoot());
console.log('--searchNode--');
console.log(searchNode(tree.getRoot(), 5), searchTime);
