---
tags: post
title: Advent of TypeScript 2023
layout: post.liquid
date: git Last Modified
---

These are my solutions for [TypeHero's 2023 Advent of TypeScript](https://typehero.dev/aot-2023). I'll update this post as new ones are released.

## Day One

```ts
type SantasFavoriteCookies = "ginger-bread" | "chocolate-chip";
```

## Day Two

```ts
type CookieSurveyInput<T> = keyof T;
```

## Day Three

```ts
type GiftWrapper<A, B, C> = {
  present: A;
  from: B;
  to: C;
};
```

## Day Four

```ts
type Address = { address: string; city: string };
type PresentDeliveryList<T> = {
  [Property in keyof T]: Address;
};
```

## Day Five

```ts
type SantasList<
  BadList extends readonly any[],
  GoodList extends readonly any[]
> = [...BadList, ...GoodList];
```

## Day Six

```ts
type FilterChildrenBy<List, Filter> = Exclude<List, Filter>;
```

## Day Seven

```ts
type AppendGood<ListT> = {
  [Property in keyof ListT as `good_${string & Property}`]: ListT[Property];
};
```

## Day Eight

```ts
type RemoveNaughtyChildren<T> = Omit<T, `naughty_${string}`>;
```

## Day Nine

```ts
type Reverse<T extends string> = T extends `${infer Head}${infer Tail}`
  ? `${Reverse<Tail>}${Head}`
  : "";
```

## Day Ten

```ts
type StreetSuffixTester<
  TString extends string,
  TSuffix extends string
> = TString extends `${string}${TSuffix}` ? true : false;
```

## Day Eleven

```ts
type SantaListProtector<T> = T extends Record<string, unknown> | Array<unknown>
  ? {
      readonly [K in keyof T]: SantaListProtector<T[K]>;
    }
  : T;
```

## Day Twelve

```ts
type FindSanta<TForest extends ("🎅🏼" | "🎄")[]> = TForest extends [
  ...infer Head extends ("🎅🏼" | "🎄")[],
  infer Tail
]
  ? Tail extends "🎅🏼"
    ? Head["length"]
    : FindSanta<Head>
  : never;
```

## Day Thirteen

```ts
type DayCounter<FromT extends number, ToT extends number> = [
  ...DropHead<FromT, Tail<Arr<ToT>>>,
  ToT
][number];

type Arr<N extends number, T extends any[] = []> = T["length"] extends N
  ? T
  : Arr<N, [...T, T["length"]]>;

type DropHead<N extends number, T extends number[]> = T extends [
  infer Head,
  ...infer Tail extends number[]
]
  ? N extends Head
    ? T
    : DropHead<N, Tail>
  : [];

type Tail<T extends any[]> = T extends [infer Head, ...infer Tail] ? Tail : [];
```

## Day Fourteen

```ts
type DecipherNaughtyList<ListT extends string> = ListToArray<ListT>[number];

type ListToArray<ListT extends string> =
  ListT extends `${infer Name}/${infer Rest}`
    ? [Name, ...ListToArray<Rest>]
    : [ListT];
```

## Day Fifteen

```ts
type BoxToys<S, N extends number, A extends any[] = []> = N extends A["length"]
  ? A
  : BoxToys<S, N, [S, ...A]>;
```

## Day Sixteen

```ts
type FindSanta<TForest extends string[][]> = TForest extends [
  ...infer Head extends string[][],
  infer Tail extends string[]
]
  ? FindSantaArray<Tail> extends never
    ? FindSanta<Head>
    : [Head["length"], FindSantaArray<Tail>]
  : unknown;

type FindSantaArray<TForest extends string[]> = TForest extends [
  ...infer Head extends string[],
  infer Tail
]
  ? Tail extends "🎅🏼"
    ? Head["length"]
    : FindSantaArray<Head>
  : never;
```

## Day Seventeen

```ts
type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

type WhoWins<
  TOpponent extends RockPaperScissors,
  TYou extends RockPaperScissors
> = TOpponent extends TYou
  ? "draw"
  : TOpponent extends "👊🏻"
  ? TYou extends "🖐🏾"
    ? "win"
    : "lose"
  : TOpponent extends "🖐🏾"
  ? TYou extends "👊🏻"
    ? "lose"
    : "win"
  : TYou extends "👊🏻"
  ? "win"
  : "lose";
```

## Day Eighteen

```ts
type Count<ToySack, Toy> = Filter<ToySack, Toy>["length"];

type Filter<ToySack, Toy> = ToySack extends [infer Head, ...infer Tail]
  ? Head extends Toy
    ? [Head, ...Filter<Tail, Toy>]
    : Filter<Tail, Toy>
  : [];
```

## Day Nineteen

```ts
type NextItem = {
  "🛹": "🚲";
  "🚲": "🛴";
  "🛴": "🏄";
  "🏄": "🛹";
};

type Rebuild<List> = Flatten<RebuildArray<List>>;

type RebuildArray<List, Item extends keyof NextItem = "🛹"> = List extends [
  infer Head extends number,
  ...infer Tail
]
  ? [Repeat<Item, Head>, ...RebuildArray<Tail, NextItem[Item]>]
  : [];

type Repeat<S, N extends number, A extends any[] = []> = N extends A["length"]
  ? A
  : Repeat<S, N, [S, ...A]>;

type Flatten<T> = T extends [infer Head extends any[], ...infer Tail]
  ? [...Head, ...Flatten<Tail>]
  : [];
```

## Day Twenty

```ts
type Letters = {
  A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
  B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
  C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
  E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
  H: ["█ █ ", "█▀█ ", "▀ ▀ "];
  I: ["█ ", "█ ", "▀ "];
  M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
  N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
  P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
  R: ["█▀█ ", "██▀ ", "▀ ▀ "];
  S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
  T: ["▀█▀ ", "░█ ░", "░▀ ░"];
  Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
  W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
  " ": ["░", "░", "░"];
  ":": ["#", "░", "#"];
  "*": ["░", "#", "░"];
};

type ToAsciiArt<S extends string> = Flatten<ToAsciiArtLines<S>>;

type ToAsciiArtLines<S extends string> = S extends `${infer H}\n${infer T}`
  ? [ToAsciiArtLine<H>, ...ToAsciiArtLines<T>]
  : [ToAsciiArtLine<S>];

type ToAsciiArtLine<S extends string> = Joiner<ToAsciiArray<S>>;

type ToAsciiArray<S extends string> =
  Uppercase<S> extends `${infer H extends keyof Letters}${infer T}`
    ? [Letters[H], ...ToAsciiArray<T>]
    : [];

type Joiner<
  L extends [string, string, string][],
  Tops extends string = "",
  Middles extends string = "",
  Bottoms extends string = ""
> = L extends [
  [
    infer Top extends string,
    infer Middle extends string,
    infer Bottom extends string
  ],
  ...infer Tail extends [string, string, string][]
]
  ? Joiner<Tail, `${Tops}${Top}`, `${Middles}${Middle}`, `${Bottoms}${Bottom}`>
  : [Tops, Middles, Bottoms];

type Flatten<T> = T extends [infer Head extends any[], ...infer Tail]
  ? [...Head, ...Flatten<Tail>]
  : [];
```

## Day Twenty-One

```ts
type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTacToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTacToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type TicTacToe<
  Game extends TicTacToeGame,
  Move extends TicTacToePositions
> = IsMoveInvalid<Game, Move> extends true
  ? Game
  : {
      board: NextBoard<Game, Move>;
      state: VerifyState<NextBoard<Game, Move>, Game["state"]>;
    };

type IsMoveInvalid<Game extends TicTacToeGame, Move> = GetCell<
  Game,
  Move
> extends TicTacToeEmptyCell
  ? false
  : true;

type GetCell<Game extends TicTacToeGame, Move> = Game["board"][PositionYToIndex<
  MoveY<Move>
>][PositionXToIndex<MoveX<Move>>];

type PositionYToIndex<Position> = Position extends "top"
  ? 0
  : Position extends "middle"
  ? 1
  : 2;
type PositionXToIndex<Position> = Position extends "left"
  ? 0
  : Position extends "center"
  ? 1
  : 2;

type NextBoard<
  Game extends TicTacToeGame,
  Move extends TicTacToePositions
> = Game["state"] extends TicTacToeChip
  ? UpdateBoard<Game["board"], MoveY<Move>, MoveX<Move>, Game["state"]>
  : Game["board"];

type MoveX<Move> = Move extends `${string}-${infer X}` ? X : unknown;
type MoveY<Move> =
  Move extends `${infer Y extends TicTacToeYPositions}-${string}` ? Y : unknown;

type VerifyState<
  Board extends TicTacToeBoard,
  Chip extends TicTacToeState
> = SomeWin<Board, Chip> extends true
  ? `${Chip} Won`
  : SomeDraw<Board> extends true
  ? `Draw`
  : NextChip<Chip>;

type SomeWin<Board extends TicTacToeBoard, Chip> = SomeLineWin<
  Board,
  Chip
> extends true
  ? true
  : SomeColumnWin<Board, Chip> extends true
  ? true
  : SomeDiagonalWin<Board, Chip> extends true
  ? true
  : false;

type SomeDraw<Board extends TicTacToeBoard> = IsLineFull<Board[0]> extends false
  ? false
  : IsLineFull<Board[1]> extends false
  ? false
  : IsLineFull<Board[2]> extends false
  ? false
  : true;

type IsLineFull<Line extends TicTacToeCell[]> =
  Line[0] extends TicTacToeEmptyCell
    ? false
    : Line[1] extends TicTacToeEmptyCell
    ? false
    : Line[2] extends TicTacToeEmptyCell
    ? false
    : true;

type SomeLineWin<Board extends TicTacToeBoard, Chip> = LineWin<
  Board[0],
  Chip
> extends true
  ? true
  : LineWin<Board[1], Chip> extends true
  ? true
  : LineWin<Board[2], Chip> extends true
  ? true
  : false;

type LineWin<Line extends TicTacToeCell[], Chip> = Line[0] extends Chip
  ? Line[1] extends Chip
    ? Line[2] extends Chip
      ? true
      : false
    : false
  : false;

type SomeColumnWin<Board extends TicTacToeBoard, Chip> = LineWin<
  [Board[0][0], Board[1][0], Board[2][0]],
  Chip
> extends true
  ? true
  : LineWin<[Board[0][1], Board[1][1], Board[2][1]], Chip> extends true
  ? true
  : LineWin<[Board[0][2], Board[1][2], Board[2][2]], Chip>;

type SomeDiagonalWin<Board extends TicTacToeBoard, Chip> = LineWin<
  [Board[0][0], Board[1][1], Board[2][2]],
  Chip
> extends true
  ? true
  : LineWin<[Board[2][0], Board[1][1], Board[0][2]], Chip>;

type UpdateBoard<Board extends TicTacToeBoard, Y, X, Chip> = Y extends "top"
  ? [UpdateLine<Board[0], X, Chip>, Board[1], Board[2]]
  : Y extends "middle"
  ? [Board[0], UpdateLine<Board[1], X, Chip>, Board[2]]
  : [Board[0], Board[1], UpdateLine<Board[2], X, Chip>];

type UpdateLine<Cells extends TicTacToeCell[], X, Chip> = X extends "left"
  ? Cells[0] extends TicTacToeEmptyCell
    ? [Chip, Cells[1], Cells[2]]
    : Cells
  : X extends "center"
  ? Cells[1] extends TicTacToeEmptyCell
    ? [Cells[0], Chip, Cells[2]]
    : Cells
  : Cells[2] extends TicTacToeEmptyCell
  ? [Cells[0], Cells[1], Chip]
  : Cells;

type NextChip<State> = State extends "⭕" ? "❌" : "⭕";
```
