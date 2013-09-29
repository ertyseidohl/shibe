var moos = document.getElementById("myonoffswitch")

moos.onclick = function(){
	if(moos.checked){
		document.getElementById("shibe").className = "shibemode";
	} else{
		document.getElementById("shibe").className = "";
	}
};

document.getElementById("shakespeare").onclick = function(){
	;(function loadXMLDoc() {
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("input").value = xmlhttp.responseText;
			}
		}

		xmlhttp.open("GET", "./romeoandjuliet.txt", true);
		xmlhttp.send();
	})();
};
