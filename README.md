# Lista Duplamente Encadeada Genérica em TypeScript

Implementação da classe `DoublyLinkedList<T extends IComparable>`, reaproveitando a interface `IComparable`, a classe `Contato` e o nó `No` da lista simplesmente encadeada.

O nó `DoublyNode` especializa o `No` acrescentando a referência `prev` para o nó predecessor, o que permite reestruturar os métodos da lista para que fiquem mais eficientes.

## Estrutura

```
src/
├── IComparable.ts       # interface com equals(...) e compareTo(...)
├── Contato.ts           # classe Contato (implementa IComparable)
├── LinkedList.ts        # lista simplesmente encadeada (exporta o No)
├── DoublyLinkedList.ts  # DoublyNode + DoublyLinkedList
└── index.ts             # código de teste
```

## Como executar

```bash
npm install
npm run dev
```

`npm run build` só compila (gera `dist/`) e `npm start` executa o código já compilado.

## O que mudou em relação à lista simplesmente encadeada

| Método | Lista simples | Lista dupla | Por quê |
|---|---|---|---|
| `push` / `unshift` | O(1) | O(1) | também atualizam o `prev` |
| `pop` | O(n) | **O(1)** | o penúltimo nó é `tail.prev`, não precisa percorrer a lista |
| `shift` | O(1) | O(1) | atualiza o `prev` do novo head |
| `getNoAt` | até n passos | **até n/2 passos** | começa pelo head ou pelo tail, o que estiver mais perto |
| `insert` | busca em `index - 1` | busca em `index` | o predecessor é obtido pelo `prev` |
| `removeAt` | busca em `index - 1` | busca em `index` | o nó é desligado usando `prev` e `next` |
| `remove` | `findIndex` + `removeAt` (2 passagens) | **1 passagem** | o nó encontrado já é removido |
| `reverse` | inverte os `next` | troca `next` ↔ `prev` | e depois troca head ↔ tail |
| `sort` | bubble sort | **insertion sort** | anda para trás pelo `prev`; lista já ordenada leva só 1 passagem |

As remoções (`pop`, `shift`, `removeAt` e `remove`) usam o método privado `removeNode`, que desliga qualquer nó da lista em O(1).
