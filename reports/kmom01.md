# Installation instructions

[![Build Status](https://travis-ci.org/sonnerberg/jsramverk-frontend.svg?branch=master)](https://travis-ci.org/sonnerberg/jsramverk-frontend)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-frontend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-frontend/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-frontend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-frontend/?branch=master)

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

## TODO

- [ ] Validate input fields with `yup`
- [ ] Use Formik for all inputs
- [x] ~~Change page title when going to different pages~~
- [ ] Get markdown styles from [GitHub - sindresorhus/github-markdown-css: The minimal amount of CSS to replicate the GitHub Markdown style](https://github.com/sindresorhus/github-markdown-css)