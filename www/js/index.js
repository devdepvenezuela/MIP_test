// Declaraci?n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;

// Guardamos en variables elementos para poder rescatarlos despu?s sin tener que volver a buscarlos
cuerpo = document.getElementById("cuerpo"),
menuprincipal = document.getElementById("menuprincipal"),
wrapper = document.getElementById("wrapper");

var xhReq = new XMLHttpRequest();

var app = {
    // Constructor de la app
    initialize: function() {
		
		//validate();
    	// Estado inicial mostrando capa cuerpo
    	estado="cuerpo";
    	
    	// Creamos el elemento style, lo a?adimos al html y creamos la clase cssClass para aplicarsela al contenedor wrapper
	    var heightCuerpo=window.innerHeight-46;
	    var style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = '.cssClass { position:absolute; z-index:2; left:0; top:46px; width:100%; height: '+heightCuerpo+'px; overflow:auto;}';
	    document.getElementsByTagName('head')[0].appendChild(style);
	    
	    // A?adimos las clases necesarias
		cuerpo.className = 'page center';
		menuprincipal.className = 'page center';
		wrapper.className = 'cssClass';
			
		// Leemos por ajax el archivos opcion1.html de la carpeta opciones
		xhReq.open("GET", "opciones/opcion0.html", false);
		xhReq.send(null);
		document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

		// Leemos por ajax el archivos menu.html de la carpeta opciones
		xhReq.open("GET", "opciones/menu.html", false);
		xhReq.send(null);
		document.getElementById("contenidoMenu").innerHTML=xhReq.responseText;
		
		// Creamos los 2 scroll mediante el plugin iscroll, uno para el men? principal y otro para el cuerpo
		myScrollMenu = new iScroll('wrapperMenu', {
                 hideScrollbar: true,
				 onBeforeScrollStart: function (e) {
            var target = e.target;
            while (target.nodeType != 1) target = target.parentNode;

            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
                e.preventDefault();
            } else {
                $(target).bind('blur', function(){
                    window.scrollTo(0,0);
                    myScrollMenu.refresh();
                });
            }
        }
    });
	
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
    	// Ejecutamos la funci?n FastClick, que es la que nos elimina esos 300ms de espera al hacer click
    	new FastClick(document.body);
		
		var name = localStorage.getItem("nombre");
		var ci = localStorage.getItem("ci");
		var telf = localStorage.getItem("telf");
		var centro = localStorage.getItem("centro");
		var email = localStorage.getItem("email");
		var pais = localStorage.getItem("pais");
		if(name == null && ci == null && telf == null && centro == null && email == null && pais == null)
		{
		navigator.notification.confirm(
        'Debe registrar sus datos, desea hacerlo ahora?', 
         onConfirm,            
        'MIP',           
        'Si,Ahora no'        
        );
		}
		else
		{
			navigator.notification.alert(
            'Hola ' + name + '!' ,
			 alertDismiss,
            'MIP',            
            'Hola MIP!'                  
        );
			}

    },
    
};

// Funci?n para a?adir clases css a elementos
function addClass( classname, element ) {
    var cn = element.className;
    if( cn.indexOf( classname ) != -1 ) {
    	return;
    }
    if( cn != '' ) {
    	classname = ' '+classname;
    }
    element.className = cn+classname;
}

// Funci?n para eliminar clases css a elementos
function removeClass( classname, element ) {
    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}

function menu(opcion){
	
	// Si pulsamos en el bot?n de "menu" entramos en el if
	if(opcion=="menu"){
		if(estado=="cuerpo"){
			cuerpo.className = 'page transition right';
			estado="menuprincipal";
		}else if(estado=="menuprincipal"){
			cuerpo.className = 'page transition center';
			estado="cuerpo";	
		}
	// Si pulsamos un bot?n del menu principal entramos en el else
	}else{
		
		// A?adimos la clase al li presionado
		addClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
		
		// Recogemos mediante ajax el contenido del html seg?n la opci?n clickeada en el menu
		xhReq.open("GET", "opciones/opcion"+opcion+".html", false);
		xhReq.send(null);
		document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
		
		// Refrescamos el elemento iscroll seg?n el contenido ya a?adido mediante ajax, y hacemos que se desplace al top
		/*myScroll.refresh();
		myScroll.scrollTo(0,0);
		myScrollMenu.refresh();
		myScrollMenu.scrollTo(0,0);
		document.body.style.height = screen.availHeight + 'px';*/
		var screens = parseInt(screen.availHeight) + 200;
		document.body.style.height = screens.toString() + 'px';
		if(opcion == '2')
		{
			var docname = document.getElementById("med_nombre");
			var docci = document.getElementById("med_ci");
			var doctelf = document.getElementById("med_telf");
			var doccentro = document.getElementById("med_centro");
			var docespecialidad = document.getElementById("med_especialidad");
			var docemail = document.getElementById("med_email");
			var docpais = document.getElementById("med_pais");
			var name = localStorage.getItem("nombre");
			var ci = localStorage.getItem("ci");
			var telf = localStorage.getItem("telf");
			var centro = localStorage.getItem("centro");
			var especialidad = localStorage.getItem("especialidad");
			var email = localStorage.getItem("email");
			var pais = localStorage.getItem("pais");
			if (name != null)
				{docname.value = name; }
			if (ci != null)
				{docci.value = ci; }
			if (telf != null)
				{doctelf.value = telf; }
			if (centro != null)
				{doccentro.value = centro;}
			if (especialidad != null)
				{docespecialidad.value = especialidad;}
			if (email != null)
				{docemail.value = email;} 
			if (pais != null)
				{docpais.value = pais; }	
			}
			
			$("#contenidoCuerpo").animate({ scrollTop: 0 }, "slow");
		
		// A?adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
		cuerpo.className = 'page transition center';
		estado="cuerpo";
		
		// Quitamos la clase a?adida al li que hemos presionado
		setTimeout(function() {
			removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
		}, 300);
		 
	 }

}
