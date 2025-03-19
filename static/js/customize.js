document.addEventListener("DOMContentLoaded", () => {
  // Mapping of color values to the exact file names in static/img/
  const tshirtImageMapping = {
    black: "blackshirt.png",
    white: "whiteshirt.png",
    gray: "grayshirt.png",
    // add more mappings if needed
  }

  const tshirtImage = document.getElementById("tshirtImage")
  const summaryColor = document.getElementById("summaryColor")
  const colorOptions = document.querySelectorAll('input[name="tshirtColor"]')

  // Update the t-shirt image based on the selected color
  function updateTshirtImage() {
    const selectedColor = document.querySelector('input[name="tshirtColor"]:checked').value
    const fileName = tshirtImageMapping[selectedColor] || "default.png"
    tshirtImage.innerHTML = `<img src="/static/img/${fileName}" alt="${selectedColor} t-shirt">`
    summaryColor.textContent = selectedColor
  }

  updateTshirtImage()

  colorOptions.forEach((option) => {
    option.addEventListener("change", updateTshirtImage)
  })

  // References to DOM elements
  const designUploadArea = document.getElementById("designUploadArea")
  const designUpload = document.getElementById("designUpload")
  const designPreviewArea = document.getElementById("designPreviewArea")
  const designThumbnail = document.getElementById("designThumbnail")
  const removeDesign = document.getElementById("removeDesign")

  // Handle design upload
  if (designUploadArea && designUpload) {
    designUploadArea.addEventListener("click", () => designUpload.click())
    designUpload.addEventListener("change", function () {
      const file = this.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          designThumbnail.src = e.target.result
          designPreviewArea.classList.remove("hidden")
        }
        reader.readAsDataURL(file)
      }
    })
  }

  if (removeDesign) {
    removeDesign.addEventListener("click", () => {
      designThumbnail.src = "/placeholder.svg"
      designPreviewArea.classList.add("hidden")
      designUpload.value = ""
    })
  }

  // Update order summary based on quantity
  function updateOrderSummary() {
    const quantity = Number.parseInt(quantityInput.value)
    summaryQuantity.textContent = quantity
    const total = (19.99 + 5.99) * quantity
    summaryTotal.textContent = `$${total.toFixed(2)}`
  }
  updateOrderSummary()

  decreaseQuantity.addEventListener("click", () => {
    let quantity = Number.parseInt(quantityInput.value)
    if (quantity > 1) {
      quantity--
      quantityInput.value = quantity
      updateOrderSummary()
    }
  })

  increaseQuantity.addEventListener("click", () => {
    let quantity = Number.parseInt(quantityInput.value)
    quantity++
    quantityInput.value = quantity
    updateOrderSummary()
  })

  quantityInput.addEventListener("change", updateOrderSummary)

  // Additional code for handling design position, scale, and rotation can be added here.
})
document.addEventListener("DOMContentLoaded", () => {
  // References to DOM elements
  const tshirtImage = document.getElementById("tshirtImage")
  const designUploadArea = document.getElementById("designUploadArea")
  const designUpload = document.getElementById("designUpload")
  const designPreviewArea = document.getElementById("designPreviewArea")
  const designThumbnail = document.getElementById("designThumbnail")
  const removeDesign = document.getElementById("removeDesign")
  const summaryColor = document.getElementById("summaryColor")
  const summarySize = document.getElementById("summarySize")
  const summaryQuantity = document.getElementById("summaryQuantity")
  const summaryTotal = document.getElementById("summaryTotal")
  const quantityInput = document.getElementById("quantity")
  const decreaseQuantity = document.getElementById("decreaseQuantity")
  const increaseQuantity = document.getElementById("increaseQuantity")
  const designPreview = document.getElementById("designPreview")
  const checkoutBtn = document.getElementById("checkoutBtn")
  const positionX = document.getElementById("positionX")
  const positionY = document.getElementById("positionY")
  const designScale = document.getElementById("designScale")
  const designRotation = document.getElementById("designRotation")
  const colorOptions = document.querySelectorAll('input[name="tshirtColor"]')
  const sizeSelect = document.getElementById("size")

  // Update the t-shirt image based on the selected color
  function updateTshirtImage() {
    const selectedColor = document.querySelector('input[name="tshirtColor"]:checked').value
    tshirtImage.innerHTML = `<img src="/static/img/tshirts/${selectedColor}-shirt.png" alt="${selectedColor} t-shirt">`
    summaryColor.textContent = selectedColor
  }

  // Initialize the t-shirt image
  if (tshirtImage) {
    updateTshirtImage()
  }

  // Add event listeners to color options
  if (colorOptions) {
    colorOptions.forEach((option) => {
      option.addEventListener("change", updateTshirtImage)
    })
  }

  // Update size in summary
  if (sizeSelect) {
    sizeSelect.addEventListener("change", function () {
      if (summarySize) {
        summarySize.textContent = this.value
      }
    })
  }

  // Handle design upload
  if (designUploadArea && designUpload) {
    designUploadArea.addEventListener("click", () => designUpload.click())
    designUpload.addEventListener("change", function () {
      const file = this.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          designThumbnail.src = e.target.result
          designPreviewArea.classList.remove("hidden")

          // Create image for the preview on t-shirt
          if (designPreview) {
            designPreview.innerHTML = `<img src="${e.target.result}" alt="Your design">`
            designPreview.style.display = "block"
            updateDesignPosition()
          }

          // Enable checkout button when design is uploaded
          if (checkoutBtn) {
            checkoutBtn.disabled = false
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  // Remove uploaded design
  if (removeDesign) {
    removeDesign.addEventListener("click", () => {
      if (designThumbnail) {
        designThumbnail.src = ""
        designPreviewArea.classList.add("hidden")
      }
      if (designUpload) {
        designUpload.value = ""
      }
      if (designPreview) {
        designPreview.innerHTML = ""
        designPreview.style.display = "none"
      }
      if (checkoutBtn) {
        checkoutBtn.disabled = true
      }
    })
  }

  // Update design position on t-shirt
  function updateDesignPosition() {
    if (!designPreview) return

    const x = positionX ? positionX.value : 50
    const y = positionY ? positionY.value : 30
    const scale = designScale ? designScale.value : 100
    const rotation = designRotation ? designRotation.value : 0

    designPreview.style.left = `${x}%`
    designPreview.style.top = `${y}%`
    designPreview.style.transform = `translate(-50%, -50%) scale(${scale / 100}) rotate(${rotation}deg)`
  }

  // Add event listeners for design controls
  if (positionX) positionX.addEventListener("input", updateDesignPosition)
  if (positionY) positionY.addEventListener("input", updateDesignPosition)
  if (designScale) designScale.addEventListener("input", updateDesignPosition)
  if (designRotation) designRotation.addEventListener("input", updateDesignPosition)

  // Update order summary based on quantity
  function updateOrderSummary() {
    if (!quantityInput || !summaryQuantity || !summaryTotal) return

    const quantity = Number.parseInt(quantityInput.value)
    summaryQuantity.textContent = quantity
    const total = (19.99 + 5.99) * quantity
    summaryTotal.textContent = `$${total.toFixed(2)}`
  }

  if (quantityInput) {
    updateOrderSummary()
  }

  // Quantity controls
  if (decreaseQuantity) {
    decreaseQuantity.addEventListener("click", () => {
      if (!quantityInput) return

      let quantity = Number.parseInt(quantityInput.value)
      if (quantity > 1) {
        quantity--
        quantityInput.value = quantity
        updateOrderSummary()
      }
    })
  }

  if (increaseQuantity) {
    increaseQuantity.addEventListener("click", () => {
      if (!quantityInput) return

      let quantity = Number.parseInt(quantityInput.value)
      quantity++
      quantityInput.value = quantity
      updateOrderSummary()
    })
  }

  if (quantityInput) {
    quantityInput.addEventListener("change", updateOrderSummary)
  }
})

