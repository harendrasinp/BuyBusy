Filtering Products
Search:
Type in the search bar to filter products by matching text in the product title or category.

Price:
Use the range slider to set a maximum price filter. Only products with a price below or equal to this value will be displayed.

Category:
Use the checkboxes to select one or more categories. The product list updates dynamically based on the selected categories.

Adding Products to Cart
Click the "Add To Cart" button on any product card to add that product to your cart.
Cart management functions are handled via Firebase, ensuring data consistency across user sessions.
Customization
Styling:
Modify Home.module.css for custom styles.

Firebase Collections:
Change the Firestore collection names or structure if needed in both Home.js and userContext.js.


Cart Component
This is a React component that displays the shopping cart for an e-commerce application. The component integrates with a user context for managing cart data and total price calculation. It also provides functionality for modifying cart items (adding, deducting, and removing) and initiating the purchase process, which then navigates the user to an Orders page.

Features
Display Cart Items:
Renders a list of products added to the cart along with images, titles, prices, and quantities.

Cart Management:

Add to Cart: Increase the quantity of a product in the cart.
Deduct from Cart: Decrease the quantity of a product.
Remove from Cart: Remove a product from the cart completely.
Price Calculation:
Dynamically calculates the total price based on the products and their quantities.

Purchase Flow:
A "Purchase" button triggers the purchase action and navigates the user to the Orders page.

Technologies Used
React: For building the UI.
React Router DOM: For navigation (useNavigate hook).
CSS Modules: Scoped styling using Cart.module.css.
Context API: Consuming user and cart data via a custom context (useUserContext).

Firebase Setup:

The project uses Firebase for data storage and authentication. Ensure you have configured Firebase correctly in your project. Your Firebase initialization should be in a file like firebase/firebaseInit.js.


Usage
Cart Operations
Viewing Cart Items:
The Cart component renders all items added to the cart. Each cart item displays an image, product title, individual price, and quantity.

Modifying Quantities:

Click the "+" icon to increase the product quantity.
Click the "-" icon to decrease the product quantity.
Removing Items:
Click the "Remove from Cart" button to completely remove an item from the cart.

Purchasing Items:
The "Purchase" button calculates the total price and triggers the purchase function. Once completed, it navigates the user to the Orders page.

Code Overview
State Management:
Uses context (useUserContext) to access and update the cart state, total price, and purchase function.

Price Calculation:
Utilizes the useEffect hook to calculate the total price whenever the userCart state changes.

Navigation:
Uses useNavigate from react-router-dom to redirect the user after a successful purchase.

Customization
Styling:
Modify the styles in Cart.module.css to suit your design preferences.

Context Functions:
The functions (addtoCart, deductCart, removeCart, purchase, etc.) are defined in the user context (userContext.js). Update them as needed for your application requirements.