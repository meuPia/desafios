# meuPiá Desafios 🎯

Este é o repositório oficial de exercícios e missões interativas para o ecossistema **meuPiá**. 

Ele atua como um "Banco de Dados Estático" (Git as a Database). O [meuPiá Lab](https://github.com/henryhamon/meuPia-lab) consome os arquivos `.json` hospedados aqui diretamente via CDN para montar a interface de desafios e injetar os testes unitários no código dos alunos.

## 🛠️ Como Funciona o Schema JSON

Cada desafio deve ser um arquivo `.json` salvo na raiz ou em subpastas organizadas. O formato obrigatório é:

```json
{
  "id": "identificador_unico_sem_espacos",
  "titulo": "Nome Amigável do Desafio",
  "instrucoes": "Texto em Markdown com a explicação e exemplos.",
  "codigoTeste": "Chamadas da biblioteca meuPia-testes (ex: esperar_igual) que serão injetadas invisivelmente."
}
```

---

## 🧠 Trilha Atual: Fundamentos de IA (Busca e A*)

Os desafios abaixo introduzem conceitos clássicos de Inteligência Artificial e algoritmos de busca de caminhos (Pathfinding) usando a sintaxe amigável do Portugol.

### 1. A Fila VIP (Buscando o Menor Custo)
* **ID:** `fila_prioridade_simples`
* **Objetivo:** Simular o comportamento da 'Borda' no algoritmo A*, criando uma função que seleciona o nó de menor custo entre três opções.

### 2. O Taxímetro - Calculando o g(n)
* **ID:** `calculo_gn_taximetro`
* **Objetivo:** Entender o custo real acumulado de uma rota. O aluno deve criar uma função que soma o peso exato dos passos dados pelo agente no mapa.

### 3. O Radar - Calculando o h(n) (Manhattan)
* **ID:** `calculo_hn_manhattan`
* **Objetivo:** Implementar a Heurística de Distância Manhattan (`|x1 - x2| + |y1 - y2|`). Envolve lidar com valores absolutos (inversão de sinal) para estimar a distância até o objetivo em um grid 2D.

---
**Desenvolvido para o ensino moderno de programação por [@henryhamon](https://github.com/henryhamon).**
