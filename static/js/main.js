document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Set current year in footer
  const currentYearElements = document.querySelectorAll("#currentYear")
  const currentYear = new Date().getFullYear()

  currentYearElements.forEach((element) => {
    element.textContent = currentYear
  })

  // Load cart count
  updateCartCount()

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      mobileMenu &&
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      mobileMenu.classList.remove("active")
    }
  })
})

function updateCartCount() {
  // This function would typically fetch cart data from a server or local storage
  // For now, we'll use a placeholder implementation

  const cartCountElements = document.querySelectorAll(".cart-count")

  // Implement logic to get the actual cart count
  // For demonstration, using a static count
  const count = localStorage.getItem("cartCount") || "0"

  cartCountElements.forEach((element) => {
    element.textContent = count
  })
}

