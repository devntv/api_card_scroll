# Burningbros assignment

![result](https://github.com/devntv/burningbross_assignment/blob/feature/update-readme/public/images/bb1.png)
![result](https://github.com/devntv/burningbross_assignment/blob/feature/update-readme/public/images/bb2.png)
![result](https://github.com/devntv/burningbross_assignment/blob/feature/update-readme/public/images/bb3.png)

### main Tech Stack:

`react` `mui`, `next`

## Features

- Infinite Scrolling
- Searching product name
- Display list of products,...
- Fetch and get datas from [dummyjson][f1]
- Easy to maintain and new features,...

# structure

```
projects
├── components
│   ├── BodyData
|   └── Header
|   └── Loading
|   └── Logo
|   └── Product
├── clients
|   └── clients.ts
|   └── index.ts
|   └── GetProdcutsClient.ts
├── constants
|   └── index.ts
|   └── defaultNumb.ts
├── hooks
|   └── index.ts
|   └── useTextHeaderDelay.ts
|   └── useInfiniteScroll.ts
|   └── useDebounce.ts
├── src
| └── app
|     └── layout.tsx
|     ├── page.tsx
|     └── page.module.tsx
|     └── globals.css
|     └── favicon.ico
└── data
|    └── headerData.ts
|    └── index.ts
├──public
|
└── tsconfig.json
└── ...
```

#Desciption

By default, we set the constant limit variable to 20 (`DEFAULT_FETCH_LIMIT = 20`). This allows us to fetch a quantity of 20 products from the API. Additionally, we implement infinite scrolling to dynamically load another set of 20 products from the API as the user scrolls.

We have organized the project's constants in the constant (`/constants`) directory, allowing us to easily maintain or modify them based on specific features. Additionally, the client directory (`/clients`) handles data fetching from the API and includes functions with various methods.

Remaining folders like `/hooks`, `/data`, `/service` will be essential for future developed features.

## Installation and run

Make sure you have `Node.js` installed. If not, install `Node.js` [here][nl]. Next, you can check the version of Node.js installed on your system by using the command `node -v`.

1. install git and run

```sh
  git clone  https://github.com/devntv/burningbross_assignment.git
```

2. at the root directory of the project -> run

```sh
    npm i
```

3. and then please run

```sh
    npm run dev
```

or can visit: `https://burningbross-assignment-vinh.vercel.app/`

## Plugins

| Plugin     | version |
| ---------- | ------- |
| node       | v18.6   |
| React      | 18.2.0  |
| Next       | 13.4.7  |
| uuid       | 9.0.0   |
| typescript | 5.1.3   |
| mui        | 5.13.6  |

## License

MIT

**devntv!**

[f1]: https://dummyjson.com/docs/products
[nl]: https://nodejs.org
