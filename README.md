# qp-assessment - GrocerPal
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
        "role": "string"
    }
}
```

### Authenticate User API Documentation

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
### Add Items API Documentation

#### Endpoint

- **Method:** POST
- **URL:** `/api/addItems`
- **Description:** This endpoint is used to add grocery items to the inventory.

#### Request

##### Body

```json
{
    "authorization": "string",
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

