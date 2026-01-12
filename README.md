## Hello World

### Vite 솔루션 생성
``` bash
# https://vite.dev/
# npm create vite@latest
npm create vite@6

# dependencies install
npm install

# run - package.json -> scripts.dev
npm run dev
```

### Adding a Router
``` bash
npm install react-router-dom@6

```
  - First thing to do is create a Browser Router and configure our first route. This will enable client side routing for our web app.
  - The main.jsx file is the entry point. Open it up and we'll put React Router on the page.
  - This first route is what we often call the "root route" since the rest of our routes will render inside of it.
  - It will serve as the root layout of the UI, we'll have nested layouts as we get farther along.

  