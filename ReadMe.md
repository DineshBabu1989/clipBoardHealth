# ClipBoardHealth tech challenge

## Refactor:

- Optimisation of control flow, The original function had unoptimised controlflow, for the cases (i) undefined event (ii) absence of partitionkey,
  controlflow involved traversing through lot of redundant logic.
- Have opted to use ternairy operators instead of if else, due to the fact its more readable.
- Reduced if else nesting using && operator to increase readability
