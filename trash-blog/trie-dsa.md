---
title: "Trie Data Structure"
description: "A comprehensive guide to Trie data structure in C++, covering its implementation and applications."
slug: trie-dsa
date: "2025-02-03"
author: "Saquib"
image: "/trie.webp"
readingTime: "10 minutes"
---
This blog explains the Trie data structure in C++ with code examples, focusing on its implementation and common use cases.

## Introduction to Trie

Trie (pronounced as "try") is a tree-based data structure used for storing strings efficiently. It is primarily used for prefix-based searching, autocomplete systems, and dictionary implementations.

### Structure of a Trie Node
Each node in a Trie contains:
- An array (or hashmap) of child nodes representing characters.
- A boolean flag indicating the end of a word.

## Implementation in C++

```cpp
#include <iostream>
using namespace std;

struct TrieNode {
    TrieNode* children[26];
    bool isEndOfWord;

    TrieNode() {
        isEndOfWord = false;
        for (int i = 0; i < 26; i++)
            children[i] = nullptr;
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* node = root;
        for (char ch : word) {
            int index = ch - 'a';
            if (!node->children[index])
                node->children[index] = new TrieNode();
            node = node->children[index];
        }
        node->isEndOfWord = true;
    }

    bool search(string word) {
        TrieNode* node = root;
        for (char ch : word) {
            int index = ch - 'a';
            if (!node->children[index])
                return false;
            node = node->children[index];
        }
        return node->isEndOfWord;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    cout << trie.search("apple") << endl; // Output: 1 (true)
    cout << trie.search("app") << endl;   // Output: 0 (false)
    return 0;
}
```

### Input & Output Example

Input:
```txt
insert("apple")
search("apple")
search("app")
```

Output:
```txt
1
0
```

### Time Complexity
- **Insertion**: O(n), where n is the length of the word.
- **Search**: O(n), as each character is traversed.
- **Space Complexity**: O(N * 26), where N is the number of words.

## Applications of Trie
- **Autocomplete systems**
- **Spell checkers**
- **IP routing (Longest Prefix Matching)**
- **Dictionary implementations**
- **Search engine optimizations**