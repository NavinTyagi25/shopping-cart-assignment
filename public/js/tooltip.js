(function () {
    var modal = document.getElementById('cart-modal');
    var btn = document.getElementById("mini-cart-section");

    var span = document.getElementsByClassName("close")[0];


    window.onload = function (e) {
        // When the user clicks the button, open the modal
        btn.addEventListener("mouseover", function () {
            modal.style.display = "block";
        }
        );

        // When the user clicks anywhere outside of the modal, close it
        window.onmouseover = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        // close the modal
        span.addEventListener("click", function () {
            modal.style.display = "none";
        }
        );
    }
})();