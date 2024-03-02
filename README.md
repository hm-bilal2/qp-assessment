# GrocerPal

## Setup
1. Clone the repository.

2. Run the command.
`docker-compose up -d --build`

3. Import the following postman collection.
https://api.postman.com/collections/6819148-11d8c3fd-f0c0-48af-b7f4-ff398b1d6886?access_key=PMAT-01HQZXKDX8DCZ508VMS6J8XHF3

## API-Documentation

### Create User

#### Endpoint

- **Method:** POST
- **URL:** `/api/users`
- **Description:** This endpoint is used to create a new user with the provided credentials.

#### Request

##### Body

```json 
{
    "user": {
        "username": "string",
        "password": "string",
        "name": "string",
        "role": "string" [user,admin] (Defaulting to user)
    }
}
```

### Authenticate User

#### Endpoint

- **Method:** POST
- **URL:** `/api/login`
- **Description:** This endpoint is used to authenticate users and generate a JSON Web Token (JWT) for authorization purposes.

#### Request

##### Body

```json
{
    "username": "string",
    "password": "string"
}
```
### Add Items

#### Endpoint

- **Method:** POST
- **URL:** `/api/addItems`
- **Description:** This endpoint is used to add grocery items to the inventory.

#### Request

##### Body

```json
{
    "authorization": "string", (JSON Web Token (JWT) for user authentication)
    "groceryItems": [
        {
            "barcodeNumber": "string",
            "name": "string",
            "brand": "string",
            "price": "number",
            "quantity": "number"
        }
    ]
}
```

### Remove Items

#### Endpoint

- **Method:** POST
- **URL:** `/api/removeItems`
- **Description:** This endpoint is used to remove grocery items from the inventory.

#### Request

##### Headers

- `Content-Type` (string): Application/json

##### Body

```json
{
    "authorization": "string", (JSON Web Token (JWT) for user authentication)
    "groceryItems": [
        {
            "barcodeNumber": "string",
            "quantity": "number"  (optional) (if available then only mentioned quantity will be reduced)
        }
    ]
}
```

### Modify Items

#### Endpoint

- **Method:** POST
- **URL:** `/api/modifyItems`
- **Description:** This endpoint is used to modify the details of existing grocery items.

#### Request

##### Headers
- `Content-Type` (string): Application/json

##### Body

```json
{
    "authorization": "string", (JSON Web Token (JWT) for user authentication)
    "items": [
        {
            "barcodeNumber": "string",
            "fields": [
                {
                    "fieldName": "string",
                    "newValue": "string or number"
                }
            ]
        }
    ]
}
```

### Checkout

#### Endpoint

- **Method:** POST
- **URL:** `/api/checkout`
- **Description:** This endpoint is used to process the checkout of grocery items.

#### Request

##### Headers
- `Content-Type` (string): Application/json

##### Body

```json
{
    "authorization": "string", (JSON Web Token (JWT) for user authentication)
    "items": [
        {
            "barcodeNumber": "string",
            "quantity": "number"
        }
    ]
}
```
### View All Items

#### Endpoint

- **Method:** POST
- **URL:** `/api/viewAllItems`
- **Description:** This endpoint is used to retrieve all available grocery items.

#### Request

##### Headers

- `Content-Type` (string): Application/json

##### Body

```json
{
        "authorization": "string", (JSON Web Token (JWT) for user authentication)
}
```
