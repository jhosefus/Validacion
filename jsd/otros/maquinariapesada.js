var idBien;
var filaTablaMaquinariaPesada;
var filaTablaDocumentoMP;
var alertaValidacionMP="";
var tablaDocValidadosMaquinariaPesada = false;
var base_url;
function baseurl(enlace)
{
  base_url = enlace;
  //var  url = "<?= base_url()?>";
  //var base_url = '<?php echo base_url();?>';
  //var url = “<?php echo ; ?>” ;
   //alert(base_url);
}

function cargarTablaDocumentacionMaquinariaPesada(idbien){
    //var enlace = "http://127.0.0.1:8080/VALIDACIONDOCUMENTAL/index.php/maquinariapesada/";
    var enlace = base_url + "index.php/maquinariapesada/getDocumentos";
    $.ajax({
        type: "GET",
        url : enlace,
       data: {id: idbien},
        success: function (data) {
        $('#tablaDocumentacionMaquinariaPesada').html(data);
       }
    });
}

function filaDocumentoMaquinariaPesada(){ 
   if(filaTablaDocumentoMP){
      $("td:first", filaTablaDocumentoMP).parent().children().each(function(){$(this).removeClass('markrow');});
   }
   filaTablaDocumentoMP = this;
   $("td:first", this).parent().children().each(function(){$(this).addClass('markrow');}); 
   var a = $("td:first", this).text();
   idDocumentoBienMaquinariaPesada=a;
   $('#txtIdDocumentoMaquinariaPesada').val(a);
   $('#txtObservacionesMaquinariaPesada').val('');
   $('#btnGuardarValidacionMP').prop('disabled', false);
  
   verificarSiTieneValidacionMaquinariaPesada(a);
}

 
function abrirDialogValidacionMaquinariaPesada(idbien){
   
   //alert(idbien);
   $('#txtListaObservacionesMaquinariaPesada').val('');
   $('#txtObservacionesMaquinariaPesada').val('');
   $('#txtIdBienMaquinariaPesada').val(idbien);
   $('#divCondicionesValidacionMaquinariaPesada').hide();
   $('#divDatosValidacionMaquinariaPesada').hide(); 
   $('#divObservacionesMaquinariaPesada').hide(); 
   $('#divDatosValidacionDocProvisionalMP').hide();
   $('#cbNroDocumentoOpcionMPProv option[value="-1"]').prop('selected','selected');
   $('#txtNroDocumentoMPObservadoProv').val('');
   $('#btnGuardarValidacionMP').prop('disabled', true);
   cargarTablaDocumentacionMaquinariaPesada(idbien);
   cargarComboObservacionesMaquinariaPesada();
  getDatosParaValidarMaquinariapesada(idbien);
   $('#nombreEntidad4').text('Entidad: '+nombreEntidad);
   getEstadoBien(idbien);
   $('#ModalMaquinariaPesadaValidar').modal('show');//*/


}
function getEstadoBien(idbien){
    
    //alert(idbien);
    //var enlace = "http://127.0.0.1:8080/VALIDACIONDOCUMENTAL/index.php/maquinariapesada/";
    var enlace = base_url + "index.php/maquinariapesada/getDatosEstado";
    $.ajax({
        type: "GET",
        url : enlace,
       data: {id: idbien},
        success: function (data) {
            
            $('#estadoBien1').text('Estado: '+data);
       }
    });//*/
}

function VerificarSeleccionMaquinariaPesada(){

    //alert('holaaa');
    $('#cbAdjuntaMaquinariaPesada').change(function() {
        var valor = $('#cbAdjuntaMaquinariaPesada').val();
        if(valor=="f"){
            $('#cbLegibleMaquinariaPesada option[value="f"]').prop('selected','selected');
            $('#cbCorrespondeMaquinariaPesada option[value="1"]').prop('selected','selected');
        } 
        mostrarDatosValidacionMaquinariaPesada();        
    }); 
    $('#cbCorrespondeMaquinariaPesada').change(function() {
        mostrarDatosValidacionMaquinariaPesada();        
    }); 
    $('#cbLegibleMaquinariaPesada').change(function() {
        mostrarDatosValidacionMaquinariaPesada();        
    }); 
}

function mostrarDatosValidacionMaquinariaPesada(){
   var adjunto = $('#cbAdjuntaMaquinariaPesada').val();
   var corresponde = $('#cbCorrespondeMaquinariaPesada').val();
   var legible = $('#cbLegibleMaquinariaPesada').val();
   var tipoDocumento = $('#txtTipoDocumentoMaquinariaPesada').val();
   if(/*tipoDocumento==8 || */tipoDocumento==7){
       $('#cbEstadoDocumentacionMaquinariaPesada').val(1);
   }else{
       $('#cbEstadoDocumentacionMaquinariaPesada').val(2);   
   }
   if(/*tipoDocumento==8||*/tipoDocumento==7){
        if(adjunto=='t' && corresponde==0 && legible=='t'){
            $('#divDatosValidacionMaquinariaPesada').show();
            $('#divDatosValidacionDocProvisionalMP').hide();
            //$('#divObservacionesMaquinariaPesada').hide();
			$('#divObservacionesMaquinariaPesada').show();
        }else{ 
            if(adjunto=='f' || corresponde==1 || legible=='f'){
                $('#divDatosValidacionMaquinariaPesada').hide();
                $('#divObservacionesMaquinariaPesada').show();  
            }
        }
   }else{
        if(adjunto=='t' && corresponde==0 && legible=='t'){
            $('#divDatosValidacionMaquinariaPesada').hide();
            //$('#divObservacionesMaquinariaPesada').hide();
			$('#divObservacionesMaquinariaPesada').show();
            $('#divDatosValidacionDocProvisionalMP').show();
        }else{ 
            if(adjunto=='f' || corresponde==1 || legible=='f'){
                $('#divDatosValidacionMaquinariaPesada').hide();
                $('#divDatosValidacionDocProvisionalMP').hide();
                $('#divObservacionesMaquinariaPesada').show();  
            }
        } 
   }  
}

function getDatosParaValidarMaquinariapesada(idbien){       


      //var enlace = "http://127.0.0.1:8080/VALIDACIONDOCUMENTAL/index.php/maquinariapesada/";
      var enlace = base_url + "index.php/maquinariapesada/getDatosMaquinariaPesada";
    $.ajax({
        type: "GET",
        url: enlace,
        data: {id: idbien},
        success: function(data){
 
                var result = JSON.parse(data);
                $.each(result, function(i, datos){
                     

            $('#txtEquipoMaquinariaPesada').val(datos.descripcion);
            $('#txtMarcaMaquinariaPesada').val(datos.marca);
            $('#txtModeloMaquinariaPesada').val(datos.modelo);
            $('#txtChasisMaquinariaPesada').val(datos.nrochasis);
            $('#txtMotorMaquinariaPesada').val(datos.nromotor);
            $('#txtColorMaquinariaPesada').val(datos.color);
            $('#txtMensajeCabeceraMP').val('IdBien: '+idbien+', Descripcion: '+datos.descripcion+', Marca: '+datos.marca+', Modelo: '+datos.modelo+', Chasis: '+datos.nrochasis+', Motor: '+datos.nromotor+', Color: '+datos.color);


               });
        }

    });  
}


function comportamientoComboValidacion(elemento0,elemento1){
    var valor = $(elemento0).val();
    if (valor == 'f'){
        $(elemento1).attr('readonly', false);
    }else{
        $(elemento1).val('');
        $(elemento1).attr('readonly', true);
    }
}
function estadoCombos(){
    var combo = $('#cbNroDocumentoMaquinariaPesadaOpcion');
    var cajatexto = $("#txtNroDocumentoMaquinariaPesadaObservado");
    comportamientoComboValidacion(combo,cajatexto);
    combo = $('#cbEquipoMaquinariaPesadaOpcion');
    cajatexto = $("#txtEquipoMaquinariaPesadaObservado");
    comportamientoComboValidacion(combo,cajatexto);
    combo = $('#cbMarcaMaquinariaPesadaOpcion');
    cajatexto = $("#txtMarcaMaquinariaPesadaObservado");
    comportamientoComboValidacion(combo,cajatexto);
    combo = $('#cbModeloMaquinariaPesadaOpcion');
    cajatexto = $("#txtModeloMaquinariaPesadaObservado");
    comportamientoComboValidacion(combo,cajatexto);
    combo = $('#cbChasisMaquinariaPesadaOpcion');
    cajatexto =  $("#txtChasisMaquinariaPesadaObservado");
    comportamientoComboValidacion(combo,cajatexto);
    combo = $('#cbMotorMaquinariaPesadaOpcion');
    cajatexto =  $("#txtMotorMaquinariaPesadaObservado");
    comportamientoComboValidacion(combo,cajatexto);
    combo = $('#cbColorMaquinariaPesadaOpcion');
    cajatexto =  $("#txtColorMaquinariaPesadaObservado");
    comportamientoComboValidacion(combo,cajatexto);
    combo = $('#cbNroDocumentoOpcionMPProv');
    cajatexto =  $("#txtNroDocumentoMPObservadoProv");
    comportamientoComboValidacion(combo,cajatexto);
}
function eventosCombosValidacionMaquinariaPesada(){
    $('#cbNroDocumentoMaquinariaPesadaOpcion').on("change",function() {
        var cajatexto = $("#txtNroDocumentoMaquinariaPesadaObservado");
        comportamientoComboValidacion(this,cajatexto);
    }); 
    
    $('#cbEquipoMaquinariaPesadaOpcion').change(function() {
        var cajatexto = $("#txtEquipoMaquinariaPesadaObservado");
        comportamientoComboValidacion(this,cajatexto);
    });
    
    $('#cbMarcaMaquinariaPesadaOpcion').change(function() {
        var cajatexto = $("#txtMarcaMaquinariaPesadaObservado");
        comportamientoComboValidacion(this,cajatexto);
    });
    
    $('#cbModeloMaquinariaPesadaOpcion').change(function() {
        var cajatexto = $("#txtModeloMaquinariaPesadaObservado");
        comportamientoComboValidacion(this,cajatexto);
    });
    
    $('#cbChasisMaquinariaPesadaOpcion').change(function() {
        var cajatexto = $("#txtChasisMaquinariaPesadaObservado");
        comportamientoComboValidacion(this,cajatexto);
    });
    
    $('#cbMotorMaquinariaPesadaOpcion').change(function() {
        var cajatexto = $("#txtMotorMaquinariaPesadaObservado");
        comportamientoComboValidacion(this,cajatexto);
    });
    
    $('#cbColorMaquinariaPesadaOpcion').change(function() {
        var cajatexto = $("#txtColorMaquinariaPesadaObservado");
        comportamientoComboValidacion(this,cajatexto);
    });
    $('#cbNroDocumentoOpcionMPProv').change(function() {
        var cajatexto = $("#txtNroDocumentoMPObservadoProv");
        comportamientoComboValidacion(this,cajatexto);
    });
    
}
function comboMultiSelectMaquinariaPesada(){
    $('#cbObservacionesMaquinariaPesada').multiselect({
        buttonText: function(options, select) {
            if (options.length === 0) {
                return 'Ninguna opción seleccionada';
            }
            else if (options.length > 5) {
                return 'Todo ha sido seleccionado';
            }
            else {
                var labels = [];
                var valores = [];
                var listaIdBienes;
                options.each(function() {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                        valores.push($(this).val());

                    }
                    else {
                        labels.push($(this).html());
                        valores.push($(this).val());
                    }
                });
                listaIdBienes = valores.join("|");
                $('#txtListaObservacionesMaquinariaPesada').val(listaIdBienes);
	        return labels.join(', ') + ' ';
            }
        }
    });
}
function comboMultiSelectMaquinariaPesada(){

    $('#cbObservacionesMaquinariaPesada').multiselect({
        buttonText: function(options, select) {
            if (options.length === 0) {
                $('#txtListaObservacionesMaquinariaPesada').val('');
                return 'Ninguna opción seleccionada';

            }
            else if (options.length > 5) {
                return 'Todo ha sido seleccionado';
            }
            else {
                var labels = [];
                var valores = [];
                var listaIdBienes;
                options.each(function() {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                        valores.push($(this).val());

                    }
                    else {
                        labels.push($(this).html());
                        valores.push($(this).val());
                    }
                });
                listaIdBienes = valores.join("|");
                $('#txtListaObservacionesMaquinariaPesada').val(listaIdBienes);
          return labels.join(', ') + ' ';
            }
        }
    });
}

function cargarComboObservacionesMaquinariaPesada()
{
    var enlace = base_url + "index.php/maquinariapesada/obtenerObservaciones";
    var u = '1';
    $.ajax({
       type: "GET",
       url: enlace,
       data: {id: u},
       success: function (data) {
          $('#cbObservacionesMaquinariaPesada').html(data);
           $('#cbObservacionesMaquinariaPesada').multiselect('rebuild');
       }
    });
     
}

function getDatosDocumentoMaquinariaPesada(idDocumento){
    var url = "controladores/controlador.maquinariapesada.php";
    $.ajax({
        type: "GET",
        url : url,
        data: "accionMP=getDatosDocumento&iddocumento="+idDocumento,
        success: function (data) {
            datos = $.parseJSON(data);
            $('#txtNroDocumentoMaquinariaPesada').val(datos.nrodocumento);
            $('#txtTipoDocumentoMaquinariaPesada').val(datos.idtipodocumento);   
            $('#txtNroDocumentoMPProv').val(datos.nrodocumento);
        }
    });
}
function limpiartext()
{
          $('#cbAdjuntaMaquinariaPesada option[value="-1"]').prop('selected','selected');
              $('#cbCorrespondeMaquinariaPesada option[value="-1"]').prop('selected','selected');
              $('#cbLegibleMaquinariaPesada option[value=-1]').prop('selected','selected');
              $('#cbEstadoDocumentacionMaquinariaPesada').val('');
              
              $('#cbNroDocumentoMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbEquipoMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbMarcaMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbModeloMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbChasisMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbMotorMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbColorMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#txtIdValidacionMaquinariaPesada').val('');
              $('#txtNroDocumentoMaquinariaPesadaObservado').val('');
              $('#txtEquipoMaquinariaPesadaObservado').val('');
              $('#txtMarcaMaquinariaPesadaObservado').val('');
              $('#txtModeloMaquinariaPesadaObservado').val('');
              $('#txtChasisMaquinariaPesadaObservado').val('');
              $('#txtMotorMaquinariaPesadaObservado').val('');
              $('#txtColorMaquinariaPesadaObservado').val('');           
              $('#accionMP').val('nuevaValidacion');
              estadoCombos();
              $('#cbEstadoDocumentacionMaquinariaPesada').val('');
              $('#divCondicionesValidacionMaquinariaPesada').show();
              $('#divDatosValidacionMaquinariaPesada').hide();
              $('#divObservacionesMaquinariaPesada').hide();
              $('#divDatosValidacionDocProvisionalMP').hide();  
              $('#cbNroDocumentoOpcionMPProv option[value="-1"]').prop('selected','selected');
              $('#txtNroDocumentoMPObservadoProv').val('');
}

function verificarSiTieneValidacionMaquinariaPesada(iddocumento)
{
   $('#txtIdDocumentoMaquinariaPesada').val(iddocumento);
   $('#txtObservacionesMaquinariaPesada').val('');
   $('#btnGuardarValidacionMP').prop('disabled', false);

   limpiartext();
   
   


     //var enlace = "http://127.0.0.1:8080/VALIDACIONDOCUMENTAL/index.php/maquinariapesada/";
     var enlace = base_url + "index.php/maquinariapesada/verificarValidacion";
    $.ajax({
        type: "GET",
        url : enlace,
       data: {id: iddocumento},
        success: function (data) { 
           //alert(data);
           datos = $.parseJSON(data);
           $('#tablaDocumentacionMaquinariaPesada').html(datos.tabla);
           //alert(datos.tienevalidacion);
           if(datos.tienevalidacion=='true'){
              $('#txtNroDocumentoMaquinariaPesada').val(datos.nrodoc);
              $('#txtTipoDocumentoMaquinariaPesada').val(datos.idtipodocumento);
              $('#txtNroDocumentoMPProv').val(datos.nrodoc);
              $('#cbAdjuntaMaquinariaPesada option[value="'+datos.adjunta+'"]').prop('selected','selected');
              $('#cbCorrespondeMaquinariaPesada').val(datos.corresponde);
              $('#cbLegibleMaquinariaPesada option[value="'+datos.legible+'"]').prop('selected','selected');
              $('#accionMP').val('editarValidacion');
              var idTipoDoc = $('#txtTipoDocumentoMaquinariaPesada').val();
              if(idTipoDoc == 7 /*|| idTipoDoc==8*/){
                    $('#cbEstadoDocumentacionMaquinariaPesada').val(1);
                    $('#txtNroDocumentoMaquinariaPesadaObservado').val(datos.nrodocumento);
                    $('#txtEquipoMaquinariaPesadaObservado').val(datos.descripcion);
                    $('#txtMarcaMaquinariaPesadaObservado').val(datos.marca);
                    $('#txtModeloMaquinariaPesadaObservado').val(datos.modelo);
                    $('#txtChasisMaquinariaPesadaObservado').val(datos.nrochasis);
                    $('#txtMotorMaquinariaPesadaObservado').val(datos.nromotor);
                    $('#txtColorMaquinariaPesadaObservado').val(datos.color);
                    $('#cbNroDocumentoMaquinariaPesadaOpcion option[value="'+datos.correctodocumento+'"]').prop('selected','selected');
                    $('#cbEquipoMaquinariaPesadaOpcion option[value="'+datos.correctodescripcion+'"]').prop('selected','selected');
                    $('#cbMarcaMaquinariaPesadaOpcion option[value="'+datos.correctomarca+'"]').prop('selected','selected');
                    $('#cbModeloMaquinariaPesadaOpcion option[value="'+datos.correctomodelo+'"]').prop('selected','selected');
                    $('#cbChasisMaquinariaPesadaOpcion option[value="'+datos.correctonrochasis+'"]').prop('selected','selected');
                    $('#cbMotorMaquinariaPesadaOpcion option[value="'+datos.correctonromotor+'"]').prop('selected','selected');
                    $('#cbColorMaquinariaPesadaOpcion option[value="'+datos.correctocolor+'"]').prop('selected','selected');
                    
              }else{
                    $('#cbEstadoDocumentacionMaquinariaPesada').val(2);
                    $('#txtNroDocumentoMPObservadoProv').val(datos.nrodocumento);
                    $('#cbNroDocumentoOpcionMPProv option[value="'+datos.correctodocumento+'"]').prop('selected','selected');
                    
              }
              $('#txtObservacionesMaquinariaPesada').val(datos.observaciones);
              $('#txtIdValidacionMaquinariaPesada').val(datos.idvalidacion);

              $('#txtListaObservacionesMaquinariaPesada').val(datos.observaciondetalle);
              

              var dataarray=datos.observaciondetalle.split("|");
              $("#cbObservacionesMaquinariaPesada").val(dataarray);
              $("#cbObservacionesMaquinariaPesada").multiselect("refresh");

              estadoCombos();
              $('#divCondicionesValidacionMaquinariaPesada').show();
              $('#divDatosValidacionMaquinariaPesada').show();
              mostrarDatosValidacionMaquinariaPesada();
           }else{
              $('#txtNroDocumentoMaquinariaPesada').val(datos.nrodoc);
              $('#txtTipoDocumentoMaquinariaPesada').val(datos.idtipodocumento);
              $('#txtNroDocumentoMPProv').val(datos.nrodoc); 

              $('#cbAdjuntaMaquinariaPesada option[value="-1"]').prop('selected','selected');
              $('#cbCorrespondeMaquinariaPesada option[value="-1"]').prop('selected','selected');
              $('#cbLegibleMaquinariaPesada option[value=-1]').prop('selected','selected');
              $('#cbEstadoDocumentacionMaquinariaPesada').val('');
              
              $('#cbNroDocumentoMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbEquipoMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbMarcaMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbModeloMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbChasisMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbMotorMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              $('#cbColorMaquinariaPesadaOpcion option[value="-1"]').prop('selected','selected');
              
              $('#txtNroDocumentoMaquinariaPesadaObservado').val('');
              $('#txtEquipoMaquinariaPesadaObservado').val('');
              $('#txtMarcaMaquinariaPesadaObservado').val('');
              $('#txtModeloMaquinariaPesadaObservado').val('');
              $('#txtChasisMaquinariaPesadaObservado').val('');
              $('#txtMotorMaquinariaPesadaObservado').val('');
              $('#txtColorMaquinariaPesadaObservado').val('');           
              $('#accionMP').val('nuevaValidacion');
              estadoCombos();
              $('#cbEstadoDocumentacionMaquinariaPesada').val('');
              $('#divCondicionesValidacionMaquinariaPesada').show();
              $('#divDatosValidacionMaquinariaPesada').hide();
              $('#divObservacionesMaquinariaPesada').hide();
              $('#divDatosValidacionDocProvisionalMP').hide();  
              $('#cbNroDocumentoOpcionMPProv option[value="-1"]').prop('selected','selected');
              $('#txtNroDocumentoMPObservadoProv').val('');//*/
           }
        }
    });
    
}

function guardarValidacionMP(){
    //
    
    if(validarFormularioMP()){

       //alert('holass4545');
       //$('#btnGuardarValidacionInmueble').prop('disabled', true);
       
        //var enlace = "http://127.0.0.1:8080/VALIDACIONDOCUMENTAL/index.php/maquinariapesada/guardarvalidacion";
        var enlace = base_url + "index.php/maquinariapesada/guardarvalidacion";
        var datos = $('#formularioValidacionMaquinariaPesada').serialize();
        $.ajax({
            type: "GET",
            url: enlace,
            data: datos,
            success: function(data) 
             {
               // alert(data);
                datos=$.parseJSON(data); 
                  if (datos.aux == 2)
                  {
                       
                      alert("Se realizo la modificación correctamente"); 
                  }
                  else
                  {
                      $('#accionMP').val('editarValidacion');
                      $('#txtIdValidacionMaquinariaPesada').val(data.aux);
                      alert("Se realizo el registro correctamente");
                  } 
                $('#tablaDocumentacionMaquinariaPesada').html(datos.tabla); // */


                 
              
            }
        });
        //*/
    }else{
        alert("Las opciones de validación: "+alertaValidacionMP+" deberán ser seleccionados");
        alertaValidacionMP="";
    }       
}


function botonesDialogoValidacionMaquinariaPesada()
{   

    $('#btnGuardarValidacionMP').on('click',function(){
        //alert('hola');
        guardarValidacionMP();
    });
    $('#btnCancelarValidacionMP').on('click',function(){
        $('#ModalMaquinariaPesadaValidar').modal('hide');
    });
}

function validarFormularioMP(){
    var todook = true;
   
    if($('#cbAdjuntaMaquinariaPesada').val()=='-1'||$('#cbCorrespondeMaquinariaPesada').val()=='-1'||$('#cbLegibleMaquinariaPesada').val()=='-1'){
        todook = false;
        if($('#cbAdjuntaMaquinariaPesada').val()=='-1'){
            alertaValidacionMP += "adjunta";
        }
        if($('#cbCorrespondeMaquinariaPesada').val()=='-1'){
            alertaValidacionMP += " corresponde";
        }
        if($('#cbLegibleMaquinariaPesada').val()=='-1'){
            alertaValidacionMP += " legible";
        }
        if($('#cbAdjuntaMaquinariaPesada').val()=='f'||$('#cbCorrespondeMaquinariaPesada').val()=='1'||$('#cbLegibleMaquinariaPesada').val()=='f'){
            if($('#txtListaObservacionesMaquinariaPesada').val()==""){
               alertaValidacionMP += " Tipo de Observaciones"; 
            }
        }
    }else{
        if($('#cbAdjuntaMaquinariaPesada').val()=='t' && $('#cbCorrespondeMaquinariaPesada').val()=='0' && $('#cbLegibleMaquinariaPesada').val()=='t'){
            var tipoDocumento = $('#txtTipoDocumentoMaquinariaPesada').val();
            if(tipoDocumento==7){
                if($('#cbNroDocumentoMaquinariaPesadaOpcion').val()=='-1'||
                   $('#cbEquipoMaquinariaPesadaOpcion').val()=='-1'||
                   $('#cbMarcaMaquinariaPesadaOpcion').val()=='-1'||
                   $('#cbModeloMaquinariaPesadaOpcion').val()=='-1'||
                   $('#cbChasisMaquinariaPesadaOpcion').val()=='-1'||
                   $('#cbColorMaquinariaPesadaOpcion').val()=='-1'){
                    todook=false;
                    if($('#cbNroDocumentoMaquinariaPesadaOpcion').val()=='-1'){
                        alertaValidacionMP += "Nro. Documentación";
                    }
                    if($('#cbEquipoMaquinariaPesadaOpcion').val()=='-1'){
                        alertaValidacionMP += " Equipo";
                    }
                    if($('#cbMarcaMaquinariaPesadaOpcion').val()=='-1'){
                        alertaValidacionMP += " Marca";
                    }
                    if($('#cbModeloMaquinariaPesadaOpcion').val()=='-1'){
                        alertaValidacionMP += " Modelo";
                    }
                    if($('#cbChasisMaquinariaPesadaOpcion').val()=='-1'){
                        alertaValidacionMP += " Chasis";
                    }
                    if($('#cbColorMaquinariaPesadaOpcion').val()=='-1'){
                        alertaValidacionMP += " Color";
                    }
                }
            }else{
                if($('#cbNroDocumentoOpcionMPProv').val()=='-1'){
                    todook=false;
                    alertaValidacionMP += "Nro. Documentación";
                }
            }
        }else{
            if($('#txtListaObservacionesMaquinariaPesada').val()==""){
                todook=false;
                alertaValidacionMP += " Posibles Observaciones"; 
            }
        }
    }//*/
    return todook;
}

function pestanaValidadosMP(){
    $('#linkPestanaValidadoMP').on('click',function(){
        cargarTablaMaquinariaPesadaValidados();
        tablaDocValidadosMaquinariaPesada=true;
    });
}


