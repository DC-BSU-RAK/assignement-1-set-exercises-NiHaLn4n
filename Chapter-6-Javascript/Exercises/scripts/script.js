// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all required elements
    const priceInput = document.getElementById('price');
    const litersInput = document.getElementById('liters');
    const calculateBtn = document.getElementById('calculate');
    const resultDisplay = document.getElementById('result');
    
    // Add click event listener to the calculate button
    calculateBtn.addEventListener('click', calculateTotalCost);
    
    // Function to calculate and display the total cost
    function calculateTotalCost() {
        // Get the input values and convert to numbers
        const price = parseFloat(priceInput.value);
        const liters = parseFloat(litersInput.value);
        
        // Calculate the total cost
        const totalCost = price * liters;
        
        // Display the result with 2 decimal places
        resultDisplay.textContent = `Total cost: £${totalCost.toFixed(2)}`;
    }
});