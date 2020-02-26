# Wicked Vinyl
A full stack Node.js and React mock e-commerce app that showcases personally selected vinyl records and vinyl accessories.

# Technologies Used
- React.js
- Webpack 4
- Bootstrap 4
- PostgreSQL
- HTML5
- CSS3
- AWS EC2

# Live Demo
Link: https://wicked-vinyl.spenceruns.com/

# Features
- User can view list of all products
- User can view details of all products
- User can add products to their cart
- User can get to the checkout page
- User can enter their purchase information
- User can see and change quanity of product in cart.
- User's informations is validated on the checkout page.
- User can see a order confirmation after placing the order.

# Preview
![wv-preview](https://user-images.githubusercontent.com/51275230/73703655-8568af80-46a5-11ea-8224-64ae11e039f5.gif)

# Upcoming Features

- User will be able to navigate with the brower's arrow keys after React Router is implimented.
- User will see a home page when the website is first loaded.

## Development

#### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher

#### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/spenceruns/wicked-vinyl
    cd wicked-vinyl
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Import the example database to PostgreSQL.

    ```shell
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
