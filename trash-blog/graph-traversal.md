---
title: "Graph Traversal Algorithms"
description: "A comprehensive guide to graph traversal algorithms in C++, covering BFS and DFS with code examples."
slug: graph-traversal
date: "2025-02-07"
author: "Saquib"
image: "/graph-traversal.webp"
readingTime: "12 minutes"
---

This blog explains graph traversal techniques, including Breadth-First Search (BFS) and Depth-First Search (DFS) in C++, with code examples and applications.

## Introduction to Graph Traversal

Graph traversal refers to visiting all nodes in a graph in a systematic manner. Two common approaches are:
- **Breadth-First Search (BFS)**: Explores neighbors first before deeper nodes.
- **Depth-First Search (DFS)**: Explores deeper paths first before backtracking.

### Graph Representation
A graph can be represented as:
- **Adjacency Matrix**: A 2D array where `graph[i][j] = 1` if there is an edge between nodes `i` and `j`.
- **Adjacency List**: An array of lists where `graph[i]` stores all neighbors of `i`.

## Breadth-First Search (BFS)

BFS uses a queue to explore nodes level by level.

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Graph {
public:
    int V;
    vector<vector<int>> adj;

    Graph(int V) {
        this->V = V;
        adj.resize(V);
    }

    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u); // For undirected graph
    }

    void BFS(int start) {
        vector<bool> visited(V, false);
        queue<int> q;
        q.push(start);
        visited[start] = true;

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            cout << node << " ";

            for (int neighbor : adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
    }
};

int main() {
    Graph g(6);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 5);

    cout << "BFS Traversal: ";
    g.BFS(0);
    return 0;
}
```

### Input & Output Example

Input:
```txt
Graph edges: [(0,1), (0,2), (1,3), (1,4), (2,5)]
BFS start node: 0
```

Output:
```txt
BFS Traversal: 0 1 2 3 4 5
```

### Time Complexity
- **BFS**: O(V + E), where V is vertices and E is edges.
- **Space Complexity**: O(V) for visited array and queue.

## Depth-First Search (DFS)

DFS uses recursion (or an explicit stack) to explore paths deeply.

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Graph {
public:
    int V;
    vector<vector<int>> adj;

    Graph(int V) {
        this->V = V;
        adj.resize(V);
    }

    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    void DFSUtil(int node, vector<bool> &visited) {
        visited[node] = true;
        cout << node << " ";

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                DFSUtil(neighbor, visited);
            }
        }
    }

    void DFS(int start) {
        vector<bool> visited(V, false);
        DFSUtil(start, visited);
    }
};

int main() {
    Graph g(6);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 5);

    cout << "DFS Traversal: ";
    g.DFS(0);
    return 0;
}
```

### Input & Output Example

Input:
```txt
Graph edges: [(0,1), (0,2), (1,3), (1,4), (2,5)]
DFS start node: 0
```

Output:
```txt
DFS Traversal: 0 1 3 4 2 5
```

### Time Complexity
- **DFS**: O(V + E), similar to BFS.
- **Space Complexity**: O(V) for recursion stack.

## Applications of Graph Traversal
- **Shortest path finding (BFS in unweighted graphs)**
- **Detecting cycles (DFS)**
- **Topological sorting (DFS in DAGs)**
- **Connected components detection**
- **Maze solving (DFS/BFS)**
