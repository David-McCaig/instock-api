## InStock

Instock is a warehouse and inventory management system that was built in a week by a team of four developers using Agile work flows (Jira) and GitFlow. 


![Home Page Screenshot](https://res.cloudinary.com/dui1zm17r/image/upload/v1686650943/david-mccaig-portfolio/in-stock_vacutk.png)

## Tech Stack

**Server:**
NodeJS, Express, MySQL, knex

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mysql)](https://skillicons.dev)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USER`
`DB_HOST`
`DB_PASSWORD`
`DB_DATABASE`

## Run Locally

Clone the project

```bash
  git clone git@github.com:David-McCaig/instock-api.git
```

Install dependencies

```bash
  npm install 
```

In server side 
run migration and seed files to set up your database.

```bash
  npx knex migrate:latest 
  npx knex seed:run 
```
Start the server on the server side 

```bash
  npm run dev 
```

Now the app should be live! 

## API Documentation


#### Get all Warehouses

```
  GET /warehouses
```

#### Get Warehouses by id

```
  GET /warehouses/:id
```

#### Get Warehouse Inventories 

```
  GET /warehouses/:id/inventories
```

#### Add a Warehouse

```
  POST /warehouses/:id
```

#### Edit a Warehouse

```
  PUT /warehouses/:id
```

#### Delete a Warehouse

```
  DELETE /warehouses/:id
```

#### Get all Inventory

```
  GET /inventories
```

#### Add a Inventory item

```
  POST /inventories
```

#### Get Inventory item by id

```
  GET /inventories/:id
```

#### Edit a Inventory item

```
  PUT /inventories/:id
```

#### Delete a Inventory item

```
  DELETE /inventories/:id
```
