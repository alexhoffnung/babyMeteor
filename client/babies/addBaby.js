Template.addBaby.onRendered(function () {
	// set focus when modal is opened
	$('#modal-content').on('shown.bs.modal', function () {
	    $("#txtname").focus();
	});

	var currentUserId = Meteor.userId();
	var babyCount = Babies.find({owner:currentUserId}).count();
console.log("baby count = " + babyCount)
	if (babyCount === 0) {
		// show the modal onload
		$('#modal-content').modal({
		    show: true
		});
	}

	// everytime the button is pushed, open the modal, and trigger the shown.bs.modal event
	$('#openBtn').click(function () {
	    $('#modal-content').modal({
	        show: true
	    });
	});
});