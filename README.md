# rabbitx orderbook

Orderbook react UI component.

Orderbook designed via FSD (feature sliced design), Vite, yarn, react-router-dom.

Orderbook synchronizing via websockets. Websocket connection esteblished via Centrifuge-js SDK.

The code is self-documenting and written in such a way that it is human readable.

### Run application

1. install dependencies - `yarn`
2. run locally - `yarn dev`
3. build - `yarn build`

### Available functionality

1. Centrifuge

- `useCentrifugeContext` (centrifuge app context)
- `useCentrifuge` (subscrige, unsibscribe, resubscribe)

2. Orderbook

- `orderbook connection store` (all necessary operations and optimization of the store)
- helpers: `fillByDeltas`, `sortOrdersByPrice`, `fillOrdersWithDepth`, `fillOrdersWithTotal`, `ordersToNumbers`

3. Entities (blank for future integration with backend)

### Notice

The most difficult challenge is the implementation of the logic for using deltas and, in general, the formation of helpers for the order book

### Further improvements / todo's:

1. Improve UI (additional memoization of row elements)
2. Implement green/red background - logic is already there (depth as a fourth param - line length fill percentage)
3. Display currency pairs + other small things
4. Further targeted improvements to logic and optimization in case of disconnection or memory leaks
