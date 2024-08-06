# TS-Jest + Typescript mixed commonjs/esm output tests

It is possible to mix ESM and CommonJS modules in a node project through `await import` (https://nodejs.org/api/esm.html#import-expressions) to load ESM dependencies.

Typescript supports this via `"module": "Node16"` in `tsconfig.json` (https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext)

However, when using ts-jest, it is difficult to get dynamic imports (`await import()`) to work correctly. This makes it very difficult to mix CommonJS and ESM modules in a single node project.

This repo has 3 sample projects:

## vanilla-js

This is a vanilla js + jest project demonstrating that dynamic imports work correctly with jest + node.

## ts-esm

This is a ts-jest + typescript + jest project that compiles to ESM however fails to import legacy CommonJS dependencies like lodash.

ie:

```sh
cd ts-esm
npm run test
```

## ts-node16-not-working

This is an example project that configures typescript to output Node16 code allowing both CommonJS and ESM modules to be imported. However, when configured like this, ts-jest causes the test to fail with `Must use import to load ES Module:`

```sh
cd ts-node16-not-working
npm run test
```

results in failed tests.

However, if running the tests on the output files emitted by typescript, the same jest tests work.

```sh
npm run test:compiled
```

This first compiles the project with typescript and runs tests using jest on the emitted files.

## ts-node16-working

This is an example project that successfully runs the tests using ts-jest & jest. It does this by removing the `"module": "Node16"` from `tsconfig.json`. In this case, it is possible to combine both CommonJS & ESM modules and successfully run tests.

However in this case, by removing `"module": "Node16"` from `tsconfig.json` typescript compilation fails with the following error indicating that this isn't a valid typescript configuration.

```
tsconfig.json:2:3 - error TS5110: Option 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

2   "compilerOptions": {
    ~~~~~~~~~~~~~~~~~


Found 1 error in tsconfig.json:2
```

```sh
cd ts-node16-working
npm run test #this succeeds
npm run test:compiled #this fails with the above typescript error
```
