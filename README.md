# Backend install instructions

[![Build Status](https://travis-ci.com/sonnerberg/jsramverk-backend.svg?branch=master)](https://travis-ci.com/sonnerberg/jsramverk-backend) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-backend/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-backend/?branch=master)

To run the backend:

```bash
git clone https://github.com/sonnerberg/jsramverk-backend
```

```bash
cd jsramverk-backend
```

```bash
npm i
```

```bash
npm run resetdb
```

```bash
npm start
```

To run the frontend:

```bash
git clone https://github.com/sonnerberg/jsramverk-frontend
```

```bash
cd jsramverk-frontend
```

```bash
npm i
```

```bash
npm start
```

## TODO

- [ ] Remove validation with express-validate and use `joi` instead.
- [ ] Add GraphQL
- [ ] Add git hook to run npm install if `package.json` has been touched
