# Installation instructions

Start by cloning the repository from Github:

```bash
git clone -b 1.0.0 https://github.com/sonnerberg/jsramverk-frontend
```

Change into the `frontend` directory:

```bash
cd jsramverk-frontend/
```

Install the necessary dependencies:

```bash
npm install
```

Start the web server:

```bash
npm run start
```

Open your browser and point to the url:

```bash
firefox localhost:3000
```

![Setup video available inside ./src/ on Github](../setup.svg)

## TODO

- [ ] Validate input fields with `yup`
- [ ] Use Formik for all inputs
- [ ] Change page title when going to different pages
- [ ] Get markdown styles from [GitHub - sindresorhus/github-markdown-css: The minimal amount of CSS to replicate the GitHub Markdown style](https://github.com/sindresorhus/github-markdown-css)
