// script.js

// Initialize the slot machine immediately
(function() {
    const slotMachine = document.querySelector('.slot-machine');
    const spinButton = document.querySelector('.spin-button');

    const spin = () => {
        // Logic to spin the slot machine
    };

    spinButton.addEventListener('click', spin);
    // Immediate invocation to handle any necessary state on load
    spin();
})();