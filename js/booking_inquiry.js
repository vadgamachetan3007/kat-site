$(function() {
    $("#grab_email").animate({"left":"0",position:"relative",opacity: 1}, 2000);
    $("#grab_email").css("position", "relative");
});

$(document).ready(function(){
    $('.complete_inquiry').on('click', function(){
        event.preventDefault();
        var button = this;
        if($('#about_us').val().trim().length > 0){
            $(button).attr('disabled', true);
            $('#recaptcha').val($('#g-recaptcha-response-1').val());
            $('#review-about_us').val($('#about_us').val());
            $('#review-amount_of_days').val($('#booking_days_amount').val());

            $.ajax({
                url: "/booking_inquiry",
                method: 'POST',
                data: $('#booking_inquiry_form').serialize(),
                success: function(data) {
                    if(data.status == 'error'){
                        grecaptcha.reset(widgetId2);
                        $("#complete").animate({"left":"-999px",position:"absolute", opacity: 0}, 2000);
                        $("#select_service").animate({"left":"0",position:"relative",opacity: 1}, 2000);
                        $("#select_service").css("position", "relative");
                        toastr.error(data.message);
                        $(button).attr('disabled', false);
                    }else if(data.status == 'success'){
                        window.location.href = "/booking_inquiry_success";
                    };
                }
            });
        }else{
            toastr.error('Please specify how did you hear about us.');
        }
    });

    function completeForm(this_process) {
        switch(this_process){
            case 'budget':
                $('#review-client_rate').val($('#client_rate').val());
                return;
            case 'gender':
                $('#review-talent_gender').val($('#talent_gender').val());
                $('#review-talent_number').val($('#talents_number').val());
                return;
            case 'provision':
                $('#review-hair').val($('#checkbox-1').is(":checked"));
                $('#review-makeup').val($('#checkbox-2').is(":checked"));
                $('#review-wardrobe').val($('#checkbox-3').is(":checked"));
                $('#review-meal').val($('#checkbox-4').is(":checked"));
                return;
            case 'client':
                $('#form_client_name').val($('#client_name').val());
                $('#form_client_phone').val($('#client_phone').val());
                $('#form_client_company').val($('#client_company').val());
                return;
        }
    };

    $('#collect_email_submit_button').on('click', function(e){
        e.preventDefault();
        $("#grab_email").css({opacity: 1}).animate({"left":"-999px", opacity: 0}, 2000);
        $("#grab_email").css("position", "absolute");
        $('#client_email').val('');
        $('#client_email_form').val('');
        $('#select_service').animate({"left":"0",position:"relative",opacity: 1}, 2000);
        $("#select_service").css("position", "relative");
        // $.ajax({
        //     url: "/collect_email",
        //     method: 'POST',
        //     data: $('#collect_email_form').serialize(),
        //     success: function(data) {
        //         if(data.status == 'error'){
        //             grecaptcha.reset(widgetId1);
        //             toastr.error(data.message);
        //         }else if(data.status == 'success'){
        //             $("#grab_email").css({opacity: 1}).animate({"left":"-999px",position:"absolute", opacity: 0}, 2000);
        //             toastr.success(data.message);
        //             $('#client_email').val(data.email);
        //             $('#client_email_form').val(data.email);
        //             $('#select_service').animate({"left":"30px", opacity: 1}, 2000);
        //
        //         };
        //     }
        // });
    });

    $('.timepicker').timepicker();

    $('.select-type-button').on('click', function(){
        var service = $(this).data('booking_type');
        $('#review-booking_type').val(service);
        $('#select_service').animate({"left":"-999px",position:"absolute", opacity: 0}, 2000);
        $("#select_service").css("position", "absolute");
        $('#budget').animate({"left":"0",position:"relative",opacity: 1}, 2000);
        $("#budget").css("position", "relative");
    });

    $('#client_rate_radio_2').on('click', function(){
        if(!$('.budgeted_rate_amount').hasClass('hidden')){
            $('.budgeted_rate_amount').addClass('hidden');
            $('#client_rate').val('Without a budget');
        }
    });

    $('#client_rate_radio_1').on('click', function(){
        $('.budgeted_rate_amount').removeClass('hidden');
        $('#client_rate').val('Under 1,000');
    });

    $('.booking_inquiry_next_button').on('click', function(){
        var next_process = $(this).data('next_process');
        var this_process = $(this).data('this_process');

        completeForm(this_process);
        validateAndMoveForm(next_process, this_process);
    });

    function validateAndMoveForm(next_process, this_process){
        if(next_process=='shifts'){
            if($('#client_name').val().trim().length > 0 &&
                $('#client_email').val().trim().length > 0 &&
                $('#client_phone').val().trim().length > 0 &&
                $('#client_company').val().trim().length > 0)
            {
                $('#' + this_process).animate({"left":"-999px",position:"absolute", opacity: 0}, 800, function() {
                    $('#shifts').css({position: 'relative'});
                    $('#' + next_process).animate({"left":"0",position:"relative",opacity: 1}, 1200);
                });
            }else{
                toastr.error('Contact fields should not be blank.');
            }
        }else if(this_process=='shifts') {
            $('#shifts').css({position: 'absolute'});
            moveForm(next_process, this_process)
        }else if(this_process == 'location'){
            if(!$('#pac-inquiry-input').val().trim().length > 0){
                toastr.error('Location should present.');
            }else{
                moveForm(next_process, this_process)
            }
        }else{
            moveForm(next_process, this_process)
        }
    }

    function moveForm(next_process, this_process){
        $('#' + this_process).animate({"left":"-999px",position:"absolute", opacity: 0}, 2000);
        $('#' + next_process).animate({"left":"0",position:"relative",opacity: 1}, 2000);
    }

    function initMap() {
        var inquiry_map = new google.maps.Map(document.getElementById('map-container'), {
            center: {lat: 25.7616798, lng: -80.19179020000001},
            zoom: 13,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false
        });
        var inquiry_input = document.getElementById('pac-inquiry-input');


        var inquiry_autocomplete = new google.maps.places.SearchBox(inquiry_input);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        inquiry_autocomplete.bindTo('bounds', inquiry_map);

        var inquiry_marker = new google.maps.Marker({
            map: inquiry_map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        $('#create_new_booking').on('click', function() {
            if($('#inquiry_booking_location_address').val() != $('#pac-inquiry-input').val()){
                $('#inquiry_booking_location_ensure_location').val('true');
                inquiry_input.value = $(".pac-container").first().find('.pac-item:first').text();
                google.maps.event.trigger(inquiry_input, 'focus');
                google.maps.event.trigger(inquiry_input, 'keydown', {
                    keyCode: 13
                });
                return false
            }
        });

        inquiry_autocomplete.addListener('places_changed', function() {
            inquiry_marker.setVisible(false);
            var place = inquiry_autocomplete.getPlaces();
            if (place == undefined || place[0] == undefined || !place[0].geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            place = place[0];
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                inquiry_map.fitBounds(place.geometry.viewport);
            } else {
                inquiry_map.setCenter(place.geometry.location);
                inquiry_map.setZoom(17);  // Why 17? Because it looks good.
            }
            inquiry_marker.setPosition(place.geometry.location);
            inquiry_marker.setVisible(true);

            $('#review-location_address').val($('#pac-inquiry-input').val());
            $('#review-location_latitude').val(place.geometry.location.lat());
            $('#review-location_longitude').val(place.geometry.location.lng());

            findPlaceInquiry(place.place_id);
        });

        function findPlaceInquiry(placeId){
            var service = new google.maps.places.PlacesService(inquiry_map);

            service.getDetails({placeId: placeId}, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var component in place['address_components']) {
                        for (var i in place['address_components'][component]['types']) {
                            if (place['address_components'][component]['types'][i] == "locality"){
                                $('#review-location_city_name').val(place['address_components'][component]['long_name']);
                            }
                            if (place['address_components'][component]['types'][i] == "administrative_area_level_1") {
                                $('#review-location_state').val(place['address_components'][component]['long_name']);
                            }
                            if (place['address_components'][component]['types'][i] == "country") {
                                $('#review-location_country').val(place['address_components'][component]['long_name']);
                            }
                            if (place['address_components'][component]['types'][i] == "postal_code") {
                                $('#review-location_zipcode').val(place['address_components'][component]['long_name']);
                            }
                        }
                    }
                }
            });
        };
    }

    initMap();


    $('#booking_days_amount').on('change', function(){
        var amount_of_days = $(this).val();
        $('#review-amount_of_days').val(amount_of_days);
        var day_number = $('.day-container').length;

        if(day_number > amount_of_days){
            while(day_number > amount_of_days){
                removeDays(day_number);
                day_number--;
            }
        }else{
            while(amount_of_days > day_number) {
                addDay(day_number + 1);
                day_number++;
            }
        }
    });

    $('#all_shifts_the_same').on('click', function(){
        var day_number = $('.day-container').length;
        if($('#all_shifts_the_same:checked').length == 1){
            while(day_number > 1) {
                $('#start_time_' + day_number).addClass('hidden');
                $('#end_time_' + day_number).addClass('hidden');
                $('#arrival_time_' + day_number).addClass('hidden');
                $('label[for=start_time_' + day_number + ']').addClass('hidden');
                $('label[for=end_time_' + day_number + ']').addClass('hidden');
                $('label[for=arrival_time_' + day_number + ']').addClass('hidden');
                day_number--;
            }
        }else{
            while(day_number > 1) {
                $('#start_time_' + day_number).removeClass('hidden');
                $('#end_time_' + day_number).removeClass('hidden');
                $('#arrival_time_' + day_number).removeClass('hidden');
                $('label[for=start_time_' + day_number + ']').removeClass('hidden');
                $('label[for=end_time_' + day_number + ']').removeClass('hidden');
                $('label[for=arrival_time_' + day_number + ']').removeClass('hidden');
                day_number--;
            }
        }
    });

    $('#multiple-days-container').on('change', '.the_same_shift', function(){
        if($('#all_shifts_the_same:checked').length == 1){
            var shift_id = $(this).data('booking_id');
            var start = $('#start_time_' + shift_id).val();
            var end = $('#end_time_' + shift_id).val();
            var arrival = $('#arrival_time_' + shift_id).val();

            var amount_of_days = $('#booking_days_amount').val();

            while(amount_of_days > 0) {
                $('#start_time_' + amount_of_days).val(start);
                $('#end_time_' + amount_of_days).val(end);
                $('#arrival_time_' + amount_of_days).val(arrival);
                amount_of_days--;
            }
        }
    });

    $('#multiple-days-container').on('click', '.duplicate_shift_button', function(){
        var button_id = $(this).data('booking_id');
        var date = $('#booking_date_' + button_id).val();
        var start = $('#start_time_' + button_id).val();
        var end = $('#end_time_' + button_id).val();
        var arrival = $('#arrival_time_' + button_id).val();
        var day_number = $('.day-container').length;
        var next_day = day_number + 1;
        $('#booking_days_amount').val(next_day);
        $('#booking_days_amount').change();

        $('#booking_date_' + next_day).val(date);
        $('#start_time_' + next_day).val(start);
        $('#end_time_' + next_day).val(end);
        $('#arrival_time_' + next_day).val(arrival);
    });

    function removeDays(day){
        $('#day_' + day).remove();
    };

    function addDay(x){
        $('#multiple-days-container').append(dayHtml(x));
        $('.timepicker').timepicker();
        $('.multidate').datepicker({format: 'mm/dd/yyyy'});
    };

    function dayHtml(x){
        var hidden = $('#all_shifts_the_same:checked').length == 1 ? 'hidden' : '';
        return '<div id="day_' + x + '" class="day-container" style="border: 2px solid #B41A1C;border-radius: 1px;padding: 15px;">\
				<label for="">Day '+ x +'</label><button type="button" data-booking_id="'+ x +'" class="duplicate_shift_button pull-right text-uppercase btn btn-default">Duplicate</button><br/>\
				<label for="booking_date_' + x + '">Booking Date</label>\
				<input type="text" id="booking_date_' + x + '" autocomplete="off" name="[days][' + x + ']booking_date" value="" class="sm-form-control tleft multidate" placeholder="MM/DD/YYYY">\
						<label class="' + hidden + '" for="start_time_' + x + '">Start Time</label>\
				<input type="text" data-booking_id="' + x + '" autocomplete="off" id="start_time_' + x + '" name="[days][' + x + ']start_time" value="" class="' + hidden + ' the_same_shift timepicker sm-form-control tleft" placeholder="Start Time">\
						<label class="' + hidden + '" for="arrival_time_' + x + '">Arrival Time</label>\
				<input type="text" data-booking_id="' + x + '" autocomplete="off" id="arrival_time_' + x + '" name="[days][' + x + ']arrival_time" value="" class="' + hidden + ' the_same_shift timepicker sm-form-control tleft" placeholder="Arrival Time">\
						<label class="' + hidden + '" for="end_time_' + x + '">End Time</label>\
				<input type="text" data-booking_id="' + x + '" autocomplete="off" id="end_time_' + x + '" name="[days][' + x + ']end_time" value="" class="' + hidden + ' the_same_shift timepicker sm-form-control tleft" placeholder="End Time">\
						</div>'
    };

    $('.multidate').datepicker({format: 'mm/dd/yyyy'});
});