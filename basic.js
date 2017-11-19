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
 * 合併二元樹
 */
function mergeTree(first, second) {
  // 建立一個變數一開始為空
  let newNode = null;
  // 如果左右結點都有值
  if (first && second) {
    // 建立一個新的節點
    newNode = new Node();
    // 兩個二元樹節點的值相加
    newNode.value = first.value + second.value;
    // 遍歷兩個二元樹的左邊節點
    newNode.left = mergeTree(first.left, second.left);
    // 遍歷兩個二元樹的右邊節點
    newNode.right = mergeTree(first.right, second.right);
  } else if (first) {
    // 只剩下左邊，就回傳左邊節點值
    newNode = first;
  } else if (second) {
    // 只剩下右邊，就回傳右邊節點值
    newNode = second;
  }
  // 回傳結果
  return newNode;
}

/**
 * 將最底部左節點相加
 */
function sumLeftLeave(node, isLeftNode) {
  if (!node) return 0;
  // 如果是左邊，沒有底下節點，就返回節點值
  if (isLeftNode && !node.left && !node.right) {
    return node.value;
  }
  // 將左右丟進計算，只算左邊，右邊繼續往下直到返回 0
  return sumLeftLeave(node.left, true) + sumLeftLeave(node.right, false);
}

/**
 * 將最底部右節點相加
 */
function sumRightLeave(node, isRightNode) {
  if (!node) return 0;
  // 如果是右邊，沒有底下節點，就返回節點值
  if (isRightNode && !node.left && !node.right) {
    return node.value;
  }
  // 將左右丟進計算，只算右邊，右邊繼續往下直到返回 0
  return sumRightLeave(node.left, false) + sumRightLeave(node.right, true);
}

/**
 * 計算二元樹深度
 */
function maxDepth(node) {
  // 沒有節點就返回
  if (!node) return 0;
  // 每次都是 1
  let deepL = 1;
  let deepR = 1;

  // 如果有左邊就往左邊跑並 + 1
  if (node.left) {
    deepL += maxDepth(node.left);
  }
  // 如果有右邊就往右邊跑並 + 1
  if (node.right) {
    deepR += maxDepth(node.right);
  }
  // 回傳最多的那邊
  return deepL > deepR ? deepL : deepR;
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
tree.push(11);
tree.push(14);
tree.push(17);
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

console.log('--sumLeftLeave--');
console.log(sumLeftLeave(tree.getRoot()));

console.log('--sumRightLeave--');
console.log(sumRightLeave(tree.getRoot()));

console.log('--maxDepth--');
console.log(maxDepth(tree.getRoot()));

console.log('--Merge Tree--');
// Merge Tree
const firstTree = new BinarySearchTree();
firstTree.push(3);
firstTree.push(2);
firstTree.push(4);
const secondTree = new BinarySearchTree();
secondTree.push(1);
secondTree.push(5);
// New Tree => 4, 2, 9
const mergeResult = mergeTree(firstTree.getRoot(), secondTree.getRoot());
console.log(mergeResult);
