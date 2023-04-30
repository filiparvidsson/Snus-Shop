
## Snusshop, for the course TDDD27 2021
#### By Filip Arvidsson (filar698)
### Vision
A online store with user and admin functionality. I want to create a online shop for snus. If you're logged in you can shop snus from the online stock. Something interesting to add would be to have live updates on stock, which means that if one user picks two items in the checkout, it'll disappear for everyone else too. 

The admin user has the ability to edit/add products and manage stock. When adding a new item the user can specify the name, box-color at more. When the item is added a .svg for the new snus will the generated.

### Technical
The app will be developed in React, intended to be a website. It'll provide a Google Log-In service, which is how you register on the website too. The database will be hosted on firebase and we'll use Graphql to communicate with it on the server part. The svg-files will either be generated on the client side or one time on the server and then stored in a database.

## Specifiactions

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)Front end
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) For handling store availability
- ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) For storing user and product info


## Authors

- [@filiparvidsson](https://github.com/filiparvidsson)

