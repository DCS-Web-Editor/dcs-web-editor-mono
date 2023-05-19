# DCS Web Editor mono repository

NPM workspaces repository for DCS Web Editor. Split into small packages installable via `npm i`. Node v18 / npm 8+ recommended
Clone the repo ( make sure you have at least node version >= 16 and npm >= 8 )

`npm i -ws` -- install node modules for workspaces
`npm run build` -- builds each package in the repository
`cd packages/abc && npm run dev` -- (if available) runs a package in development mode on localhost

## Plugin development

Regarding plugin development check out these examples. You can use any framework of your choice as long as it compiles to a esm module.
- **miz-js:** Vanilla Javascript
- **briefing-editor:** Vue3 + Naive ui
- **wx-editor:** Vue3 + Naive ui
- **coalition editor:** Vue3 + Naive ui
