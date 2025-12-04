export type Either<L, R> =
  | { kind: "left"; leftValue: L }
  | { kind: "right"; rightValue: R };

export type Either2<L, R> = {
  value: Either<L, R>;
};
