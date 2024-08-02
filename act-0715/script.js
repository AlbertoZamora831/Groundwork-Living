// * Remember to call the functions `twitter()` and `shop()` to see your
// * code run!
shop();

// Activity 1: Twitter Log In
function twitter() {
  // doc contains a reference to all the elements we'll be needing. This is to
  // avoid redundant calls to `document.get()`.
  const doc = {
    loginBtn: document.getElementById("tw-form-login-btn"),
    loginAlert: document.getElementById("tw-login-alert"),
    usernameInput: document.getElementById("tw-form-login-username"),
    passwordInput: document.getElementById("tw-form-login-password"),
  };
  // user defines the credential that we'll be validing user input against.
  // * (1) TODO: Update the name, username, and password properties to anything
  // * you like. Please don't use a real username or password.
  const user = {
    name: "Alberto Zamora",
    username: "Chronos",
    password: "Cronus-Son001",
    isBanned: false,
  };

  // * (2) TODO: Register an event listener to the "Log in" button, such that
  // * each time a user clicks on the button, the function `login()` is called.
  // * Recall that this button is already available for you in the `doc`
  // object.
  doc.loginBtn.addEventListener("click", login);

  // The login function displays an alert with a message, notifying the user of
  // their log in status (banned, success, invalid password).
  function login() {
    // Declare the alert message we'll display to the user.
    let alertMessage = "";
    // Add the "show" Bootstrap class to the login alert.
    doc.loginAlert.classList.add("show");

    // isValidUsername is a boolean expression, computed from checking if the
    // username input is equal to the username we stored in the `user` object.
    const isValidUsername = doc.usernameInput.value === user.username;
    // * (3) TODO: Assign isValidPassword to a boolean expression that results
    // * to the whether the password input by the user is equal to the password
    // * we stored in the `user` object.
    const isValidPassword = doc.usernameInput.value === user.password;
    // * (4) TODO: Assign areCredentialsValid to a boolean expression that
    // * checking if both the username and password are valid.
    const areCredentialsValid =
      doc.usernameInput.value === user.username &&
      doc.passwordInput.value === user.password;

    // Let's put it all together now. We have all the boolean expressions we
    // need to know whether a user was banned, logged in successfully, or if
    // if the credentials they entered were just invalid.
    //
    // Below are three functions that need to be executed, only if their
    // conditions are true. You will create the if-statements to make sure the
    // correct code executes each time.

    // This function must be called only if a user is banned.

    function alertBannedUser() {
      alertMessage = "Unable to login. You are banned.";
      doc.loginAlert.classList.add("alert-danger");
      doc.loginAlert.classList.remove("alert-success");
    }

    // This function must be called only if the username and password entered
    // by the user match the credentials in our `user` object.
    function alertLoggedIn() {
      alertMessage = `Welcome, ${user.name}`;
      doc.loginAlert.classList.add("alert-success");
      doc.loginAlert.classList.remove("alert-danger");
    }

    // This function must be called only if the credentials entered by the user
    // do not match those in our `user` object.
    function alertInvalidUsernameOrPassword() {
      alertMessage = "Invalid username or password.";
      doc.loginAlert.classList.add("alert-danger");
      doc.loginAlert.classList.remove("alert-success");
    }

    // * (5) TODO: Recall what we learned about conditional statements! Write
    // * if-statments to call the correct functions, depending on their
    // * conditions.
    // *
    // * Remember to use the variables we defined above for your conditions
    // * (areCredentialsValid, ..)
    if (user.isBanned === true) {
      alertBannedUser();
    } else if (areCredentialsValid === true) {
      alertLoggedIn();
    } else if (areCredentialsValid !== true) {
      alertInvalidUsernameOrPassword();
    }

    // Assign the alert message to the alert using innerText.
    doc.loginAlert.innerText = alertMessage;
  }
}

// Activity 2: Online Store
function shop() {
  // doc contains a reference to all the elements we'll be needing. This is to
  // avoid redundant calls to `document.get()`.
  const doc = {
    checkoutBtn: document.getElementById("sh-btn-checkout"),
    checkoutNumItemsLabel: document.getElementById("sh-btn-checkout-num-items"),
    itemsRow: document.getElementById("sh-row-items"),
    items: document.querySelectorAll(`[id^="sh-item-"]`),
    modalBagItems: document.getElementById("sh-modal-checkout-items"),
    modalTotalLabel: document.getElementById("sh-modal-checkout-total"),
    confirmOrderBtn: document.getElementById("sh-btn-confirm-order"),
  };

  // This function call inserts all the shop items into the HTML document
  // dynamically, after the page loads.
  loadDatabase();
  doc["items"] = document.querySelectorAll('[id^="sh-item-"]');

  // bag is the array which will store objects that represent an item in your
  // shop. It is initialized as an empty array using the `[]` syntax.
  let bag = [];

  // Registers an event listener to the checkout btn, listening for "click"
  // events and calling the `checkout()` function for each button click.
  doc.checkoutBtn.addEventListener("click", checkout);
  // `doc.items` is an array of elements, since we want to select all of our
  // shop items. For each element, we register a "click" event listener to
  // call `addOrRemoveItem()` after clicking on an item.
  doc.items.forEach((element) =>
    element.addEventListener("click", () => addOrRemoveItem(element))
  );
  // Registers a "click" event listener to the confirm order button, calling
  // `placeOrder()` after each click.
  doc.confirmOrderBtn.addEventListener("click", placeOrder);

  // This function dynamically loads all the shop items into the HTML document
  // after the page loads.
  function loadDatabase() {
    // database is an array of shop item objects. This variable mocks data we
    // would receive from an actual database.
    // * (1) TODO: This is optional. If you want your shop to sell different
    // * items, go online and search for some items you want to sell in your
    // * shop.
    // *
    // * Make sure you add the downloaded images into the `assets/images`
    // * folder, and reference them correctly as seen below.
    const database = [
      {
        image: {
          src: "assets/images/sh-item-1.png",
          alt: "A white short sleeve shirt.",
        },
        name: "H&M Relax fit short sleeve shirt",
        price: 19.99,
      },
      {
        image: {
          src: "assets/images/sh-item-2.png",
          alt: "A fancy looking watch with a metallic finish.",
        },
        name: "Tissot Men's watch, azure silver",
        price: 549.99,
      },
      {
        image: {
          src: "assets/images/sh-item-3.png",
          alt: "A soft, small hat with a ribbon on the bucket.",
        },
        name: "Docker Small white unisex hat",
        price: 45.99,
      },
      {
        image: {
          src: "assets/images/sh-item-4.png",
          alt: "Small gold flower earings with jewels.",
        },
        name: "Gold flower earings",
        price: 15.99,
      },
      {
        image: {
          src: "assets/images/sh-item-5.png",
          alt: "Leathery hand bag.",
        },
        name: "Gucci Leather handbag Noir edition",
        price: 2449.99,
      },
      {
        image: {
          src: "assets/images/sh-item-6.png",
          alt: "Women's summer shorts.",
        },
        name: "Women's olive green shorts",
        price: 24.99,
      },
      {
        image: {
          src: "assets/images/sh-item-7.png",
          alt: "Overpriced sippie cup",
        },
        name: "Stanley Salmon 40oz edition",
        price: 54.99,
      },
    ];

    // We have an array of items that we'd like to render in our page. To
    // display our items, we need to iterate over the array and render each
    // item..
    //
    // Let's break this problem down into a smaller problem. How can we
    // render just one item?

    /**
     * Renders a shop item into HTML code using Bootstrap classes.
     * @param {Object} item A shop item.
     * @param {number} id A unique identifier for the item.
     * @returns HTML code, rendering the shop item.
     */
    function render(item, id) {
      return `
        <div class="col-sm-6 col-md-4 col-lg-3 p-2">
          <div class="card sh-card-item">
            <div class="card-body p-3" id="sh-item-${id}">
              <img
                class="card-img-top"
                src="${item.image.src}"
                alt="${item.image.alt}"
              />
              <h5 class="card-title mt-2 sh-item-name">
                ${item.name}
              </h5>
              <h6 class="card-subtitle text-muted sh-item-price">
                $${item.price}
              </h6>
            </div>
          </div>
        </div>
      `;
    }

    // The function above can be produce HTML code as a string, representing a
    // shop item! How cool is that?!
    //
    // For example, we can render the first item in our database like so:
    // const firstItem = render(database[0], 0);
    //
    // We now have a string of HTML code, but how can we see the code actually
    // render?
    //
    // Easy. Append the string of HTML to `doc.itemsRow`. `doc.itemsRow` is the
    // parent of each element in `doc.items`. It's the div that stores each
    // item. By appending to `doc.itemsRow`'s innerHTML, we can render our item
    // dynamically in the HTML.

    // * (2) TODO: Recall what we learned about for-loops. Now that we know how
    // * to render a single item, we can repeat the process for each item in
    // * our `database` array.
    // *
    // * Write a for-loop that iterates over our `database` array. For each
    // * iteration, use string concatenation (adding strings together) and the
    // * `.innerHTML` property to append a rendered item to `doc.itemsRow`.
    // *
    // * Hint: when calling `render()`, use the loop index as the `id`
    // * function parameter.
    for (let i = 0; i < database.length; i++) {
      const item = render(database[i], i);
      doc.itemsRow.innerHTML += item;
    }
  }

  // This function adds or removes the `element` argument, modifying the `bag`
  // array and the document to reflect the changes.
  function addOrRemoveItem(element) {
    // `item` contains the name and price of the selected `element`.
    const item = {
      // The name of this item is the third child of the element. We use
      // `innerText` to extract the text of this node.
      name: element.childNodes[3].innerText,
      // The price of this item is the fifth child of the element. We use
      // `innerText` to extract the text of this node, then use the
      // `substring()` string method to omit the dollar sign in the price.
      //
      // We then use this value as the argument for `parseFloat()` to parse
      // this string as a float (a number with a decimal is called a float).
      price: parseFloat(element.childNodes[5].innerText.substring(1)),
    };

    // This value holds the index of the first value in the `bag` array,
    // where the name of the item matches the name of our `item`.
    //
    // If the item name is not found in the bag, an index of -1 is returned to
    // indicate that no such element exists.
    const indexOfItemInBag = bag.findIndex((i) => i.name === item.name);
    // The `counter` is a number with the amount of items in the bag.
    let counter = bag.length;

    // * (3) TODO: Write a boolean expression that evaluates to if the `item`
    // * exists in our `bag`.
    // *
    // * Hint: refer to the comments above for the variable `indexOfItemInBag`.
    const itemFound = indexOfItemInBag !== -1;

    if (itemFound) {
      // Decrements the counter.
      doc.checkoutNumItemsLabel.innerText = counter - 1;
      // Removes the item from the `bag` array.
      bag.splice(indexOfItemInBag, 1);
      // Update the styling to remove the selection.
      element.style.backgroundColor = "";
      element.style.border = "";
    } else {
      // Increment the counter.
      doc.checkoutNumItemsLabel.innerText = counter + 1;
      // Add the item to the `bag` array.
      bag.push(item);
      // Update the styling to add the selection style.
      element.style.backgroundColor = "var(--gray)";
      element.style.border = "solid 0.5px var(--primary)";
    }
  }

  // This function prepares the items in the `bag` array to be checked out.
  function checkout() {
    // Update the label in the checkout button to the number of items in the
    // `bag`.
    doc.checkoutNumItemsLabel.innerText = bag.length;
    // Reset the list of items div in the modal to an empty string. This is
    // because we want the div to be re-rendered each time the button is
    // clicked.
    doc.modalBagItems.innerHTML = "";

    // `total` is a variable that holds the total price of each item in the
    // `bag` array. It is initialized at 0.
    let total = 0;

    // The code below renders a the first item selected to be checked out.
    // * (4) TODO: Repeat this process for each item in the bag, also adding
    // * the price of each item to `total`.
    for (let i = 0; 1 <= bag.length; i++) {
      doc.modalBagItems.innerHTML += `
        <div class="row">
          <span class="col-2">x1</span>
          <span class="col-6">${bag[i].name}</span>
          <span class="col-4">$${bag[i].price}</span>
        </div>
        <hr />
    `;
      total += bag[i].price;
    }

    // If the `bag` is empty, then the HTML in the div is replaced with some
    // text that informs the user there is nothing in their bag.
    if (bag.length === 0) {
      doc.modalBagItems.innerHTML = `
        <div class="container-fluid text-center pb-5 pt-5">
          No items in bag. Click on an item to add it to your bag!
        </div>
      `;
    }

    // Finally, the label displaying the total is updated to the value of
    // `total` with a method call to `toFixed()` , setting the decimal
    // precision to 2 decimal places.
    doc.modalTotalLabel.innerText = `$${total.toFixed(2)}`;
  }

  // This function places an order. It resets the `bag` array to an empty array
  // and deselects all selected items.
  function placeOrder() {
    // * (5) TODO: Reset the `bag` array to be an empty array.
    // * Hint: how do you define an empty array? Look back at the beginning of
    // * the `shop()` function to see how an empty array is defined.
    bag = [];

    // For each item in our div of shop items, remove the selection styling.
    doc.items.forEach((element) => {
      element.style.backgroundColor = "";
      element.style.border = "";
    });
    // Finally, reset the label for the number of items selected back to 0.
    doc.checkoutNumItemsLabel.innerText = 0;
  }
}
