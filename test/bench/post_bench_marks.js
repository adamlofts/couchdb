
function generateReport() {
	var date = new Date();
	
	var report = {
		type: 'report',
		date: date.toISOString(),
		version: CouchDB.getVersion(),
		results: results
	};
	return report;
}

function submitReport(report) {
	var data = JSON.stringify(report);
	
	var xhr = CouchDB.newXhr();
	xhr.open('POST', 'http://pink.cloudant.com/benchmark/', false);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(data);
	
	if (xhr.status != 201) {
		throw new Error("Error submitting benchmark. Status: " + xhr.status + " Response: " + xhr.responseText);
	}
	
	var response = JSON.parse(xhr.responseText);
	console.log("Benchmark submitted: http://pink.cloudant.com/benchmark/" + response.id);
}

submitReport(generateReport());
