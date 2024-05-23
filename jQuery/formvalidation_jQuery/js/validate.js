$(document).ready(function() {
    $('#proceedLink').on('click', function(event) {
        if (validateForm()) {
        
        window.Location.href = "partners_preference_form.html";
        } 
    });
    
    function validateForm() {
        let isValid = true;
        const fields = [
            { id: 'firstname', error: 'First Name is required' },
            { id: 'lastname', error: 'Last Name is required' },
            { id: 'phone', error: 'Phone No is required', pattern: /^\d{10}$/, patternError: 'Phone No must be exactly 10 digits' },
            { id: 'office', error: 'Office No is required', pattern: /^\d*$/, patternError: 'Office No must contain only numbers' },
            { id: 'email', error: 'Email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternError: 'Email is not valid' },
            { id: 'password', error: 'Password is required', pattern: /^[a-zA-Z0-9]{8,12}$/, patternError: 'Password must be 8-12 alphanumeric characters' },
            { id: 'confirmPassword', error: 'Confirm Password is required', match: 'password', matchError: 'Passwords do not match' },
            { id: 'aboutYou', error: 'About You is required' }
        ];

        fields.forEach(field => {
            const input = $(`[name="${field.id}"]`);
            const errorElement = $(`#${field.id}Error`);
            if (!input.val().trim()) {
                displayError(errorElement, field.error);
                isValid = false;
            } else if (field.pattern && !field.pattern.test(input.val())) {
                displayError(errorElement, field.patternError);
                isValid = false;
            } else if (field.match && input.val() !== $(`[name="${field.match}"]`).val()) {
                displayError(errorElement, field.matchError);
                isValid = false;
            } else {
                clearError(errorElement);
            }
        });

        if (!$('input[name="gender"]:checked').length) {
            displayError($('#genderError'), 'Please select your gender');
            isValid = false;
        } else {
            clearError($('#genderError'));
        }

        if (!$('input[name="interest"]:checked').length) {
            displayError($('#interestError'), 'Please select at least one interest');
            isValid = false;
        } else {
            clearError($('#interestError'));
        }

        calculateAge();
        return isValid;
    }

    function displayError(element, message) {
        element.text(message).css('color', 'red');
    }

    function clearError(element) {
        element.text('');
    }

    function calculateAge() {
        const month = $('[name="month"]').val();
        const day = $('[name="day"]').val();
        const year = $('[name="year"]').val();
        const dob = new Date(`${year}-${month}-${day}`);
        const age = ((new Date()) - dob) / (1000 * 60 * 60 * 24 * 365.25);
        $('[name="age"]').val(age.toFixed(1));
    }

    (function populateYearOptions() {
        const yearSelect = $('[name="year"]');
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1900; i--) {
            yearSelect.append($('<option></option>').val(i).text(i));
        }
    });
});
