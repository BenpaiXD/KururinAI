$(document).ready(function() {
    console.log("here");
    // Get the slider element
    var slider = $("#rangeSlider");
    // Get the element to display the slider value
    var sliderValue = $("#slider-value");
    
    // Display the default slider value
    sliderValue.text(slider.val());

    // Update the slider value display when slider value changes
    slider.on("input", function() {
        sliderValue.text($(this).val());
    });
});