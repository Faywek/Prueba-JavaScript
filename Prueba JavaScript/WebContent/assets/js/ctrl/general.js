$( document ).ready(function() {
	$('#btnListado').on('click',function(){
		Listar_Peliculas();
	});
});


function Listar_Peliculas(){

	var url	=	"https://prod-61.westus.logic.azure.com/workflows/984d35048e064b61a0bf18ded384b6cf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6ZWKl4A16kST4vmDiWuEc94XI5CckbUH5gWqG-0gkAw";
	$.get(url, function(data, status){
		var arrayData	=	data.response;
		$('#tblePeliculas').removeClass("hiddeTable");
		$('#tblePeliculas').dataTable({
			"destroy"	: true,
			"data"		: arrayData,
	        "columns"	: [
				            { "data": "title" 		},
				            { "data": "year" 		},
				            { "data": "director" 	},
				            { "data": "metascore" 	},
				            { "data": "rating" 		}
				          ],
		    "order"		: [[ 4, "desc" ]],
		    "searching"	: false,
		    "paging"	: false,
		    "lengthChange": false
		});
		var ordenadoArray 	= arrayData.sort(MayorAMenor);
		var peliculas		= ordenadoArray.map(function(pelicula){return pelicula['title']});
		notificarLista(peliculas);
	});
}

function notificarLista(array){
	var url		=	"https://prod-62.westus.logic.azure.com/workflows/779069c026094a32bb8a18428b086b2c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=o_zIF50Dd_EpozYSPSZ6cWB5BRQc3iERfgS0m-4gXUo";
	var retorno	=	{
						"RUT":"18833580-2",
						"Peliculas":array
					};
	var	data	=	JSON.stringify(retorno);
	
	 $.ajax({
         type: 	"POST",
         url: 	url,
         data: 	data,
         contentType: "application/json; charset=utf-8",
         crossDomain: true,
         dataType: "json",
         success: function (data, status, jqXHR) {
        	 swal(data.message, " Estado : "+status, "success");
         },
         error: function (jqXHR, status) {
        	 swal("No Funciono :(", status, "error");
         }
      });
}

function MayorAMenor(elem1, elem2) {
	return elem2.metascore-elem1.metascore;
}

