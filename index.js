
/**/
	
	/* DOM */
		const got = document.getElementById('got');
		got.addEventListener('click', JuegoDeTronos);
		got.addEventListener('click', siguientePregunta);
		got.addEventListener('click', function(){
			this.parentNode.style.display = 'none';
		})
		const app = document.getElementById('app');
		const reinit = document.getElementById('reinit');
		const footer = document.getElementById('footer');
		app.style.display = 'none';
		reinit.style.display = 'none';
		footer.style.display = 'none';
		

		const imagen = document.getElementById('imagen');
		const titleApp = document.getElementById('titleApp');
		const divText  = document.getElementById('divText');
		const textComplete = document.getElementById('textComplete');

		const preguntasRestantes = document.getElementById('preguntasRestantes');
		const puntos = document.getElementById('puntos');
			const puntosNum = document.getElementById('puntosNum');
			let puntosCount = 0;

		const infoControls = document.getElementById('infoControls');
			const btnPista = document.getElementById('btnPista');
			const btnComprobar = document.getElementById('btnComprobar');

		/*PopUp*/
		const popUp = document.getElementById('popUp');
		const popUpTitle = document.getElementById('popUpTitle');
		const popUpMensaje = document.getElementById('popUpMensaje');
		const next = document.getElementById('next');
		const back = document.getElementById('back');



	/*CATEGORIAS*/
		function JuegoDeTronos(){
			app.style.display = 'block';
			reinit.style.display = 'inline-block';
			footer.style.display = 'block';
			arrayDePreguntas  = [
				pregunta00 = ["¿Mi nombre es?", "img/01.png", "Arya"],
				pregunta01 = ["¿Mi nombre es?", "img/02.png", "Daenerys"],
				pregunta02 = ["¿Mi nombre es?", "img/03.png", "Jon"],
				pregunta03 = ["¿Mi nombre es?", "img/04.png", "Margaery"],
				pregunta04 = ["¿Mi nombre es?", "img/05.png", "Melisandre"],
				pregunta06 = ["¿Mi nombre es?", "img/06.png", "Drogo"],
				pregunta07 = ["¿Mi nombre es?", "img/07.png", "Missandei"],
				pregunta08 = ["¿Mi nombre es?", "img/08.png", "Gregor"],
				pregunta09 = ["¿Mi nombre es?", "img/09.png", "Varys"],
				pregunta10 = ["¿Mi nombre es?", "img/10.png", "Robb"],
				pregunta11 = ["¿Mi nombre es?", "img/11.png", "Ramsay"],
				pregunta12 = ["¿Mi nombre es?", "img/12.png", "Tyrion"],
				pregunta13 = ["¿Mi nombre es?", "img/13.png", "Eddard"],
				pregunta14 = ["¿Mi nombre es?", "img/14.png", "Petyr"],
				pregunta15 = ["¿Mi nombre es?", "img/15.png", "Daario"],
			];
		}

	/*FUNCION SIGUIENTE PREGUNTA*/
		
		function siguientePregunta() {
			
			textComplete.value = "";

			if (puntosCount > 0) {
				btnPista.disabled = false;
			} else {
				btnPista.disabled = true;
			}

			infoControls.style.display = "block";
			popUp.style.display = "none";

			longitud = arrayDePreguntas.length - 1;
			console.log(longitud);
			randomNum = Math.round(Math.random() * longitud);

			if(arrayDePreguntas[randomNum]){

				titleApp.textContent = arrayDePreguntas[randomNum][0];
				imagen.src = arrayDePreguntas[randomNum][1];
				respuesta = arrayDePreguntas[randomNum][2];

				preguntasRestantes.textContent = "Preguntas Restantes: " +(longitud + 1);

				if (longitud == 0) {
					preguntasRestantes.textContent = "ULTIMA PREGUNTA";
				}
				contentInput = document.createElement('div');
				for (var i = 0; i < respuesta.length; i++) {	
					input = document.createElement('input');
					input.setAttribute('class', 'letras');
					input.setAttribute('maxlength', '1');
					input.addEventListener('keyup',
						function (){
							if(this.value.length == this.getAttribute('maxlength')) {		
								if(this.nextSibling) {
									if(this.nextSibling.value == ""){
										this.nextSibling.focus();
									}else if(this.nextSibling != ""){
										if(this.nextSibling.nextSibling){
											this.nextSibling.nextSibling.focus();
										}
									}
								}
							}
							var key = event.which || event.keyCode || event.charCode;

							if (key == 8){
								if(this.previousSibling){
									this.previousSibling.focus();
								}
							}
						}
					);
					contentInput.appendChild(input);
				}
				divText.appendChild(contentInput);

				letras = document.getElementsByClassName('letras');
				letras[0].focus();
				arrayDePreguntas.splice(randomNum,1); // ELIMINANDO ARRAY

			} else {
				preguntasRestantes.parentNode.remove();
				titleApp.textContent = "has ganado ¡Felicidades!";
				imagen.src = "img/tenor.gif";
				imagen.style.width = "50%";
				textComplete.style.display = "none";
				imagen.parentNode.style.border = "none";
				botton = document.createElement("button");
				botton.setAttribute('class', 'btn');
				botton.textContent = "Empezar de Nuevo";

				btnComprobar.parentNode.appendChild(botton);
				botton.addEventListener('click', function(){location.reload()});
				btnComprobar.remove();
				btnPista.remove();
			}

			textComplete.setAttribute('maxlength', respuesta.length);
		}
	/* COMPROBAR LETRAS */
		function comprarLetras() {
			
			if (puntosCount > 0) {
				btnPista.disabled = false;
				
				letraAleatoria = Math.round(Math.random() * (respuesta.length-1));
				for (var i = 0; i < respuesta.length; i++) {
					if (letras[i].value != "") {
						continue;
					}
					if(letras[letraAleatoria].value == "") {
						letras[letraAleatoria].value = respuesta[letraAleatoria];
						letras[letraAleatoria].setAttribute('disabled', 'disabled');
						puntosCount = puntosCount - 15;
						puntosNum.textContent =  puntosCount;
						break;
					}else{
						letras[i].value = respuesta[i];
						letras[i].setAttribute('disabled', 'disabled');
						puntosCount = puntosCount - 15;
						puntosNum.textContent =  puntosCount;
						break;
					}
				}
				
			}
			if (puntosCount == 0) {
				puntosCount = 0;
				puntosNum.textContent =  puntosCount;
				btnPista.disabled = true;
			}
		}
		/* FUNCION COMPROBAR */
		function comprobar() {
			respuestaUser = [];
			stringUser = textComplete.value;
			stringUser = stringUser.toUpperCase();


			if (stringUser.length < respuesta.length) {

				for (var i = 0; i < letras.length; i++) {
					if (letras[i].value == "") {
						popUp.style.display = "block";
						popUpTitle.textContent = "Llena Todos Los Campos";
						next.parentNode.style.display = "none";
						back.textContent = "¡ ok !";
						back.style.display = "inline-block";
						break;
					}
					else{
						respuestaUser.push(letras[i].value);	
					}
				}
			}
			respuestaUser = respuestaUser.join("");
			respuestaUser = respuestaUser.toUpperCase();
			respuesta = respuesta.toUpperCase();
			
			

			/* VERIFICAR IGUALDAD*/
			if (respuestaUser.length == respuesta.length || stringUser.length == respuesta.length) {

				if(respuestaUser == respuesta || stringUser == respuesta) {
					puntosCount += 45;

					puntosNum.textContent =  puntosCount
					popUp.style.display = "block";
					popUpTitle.textContent = "¡ Bien Hecho !";
					popUpMensaje.textContent = "+ 45 Pts";
					next.parentNode.style.display = "block";
					next.style.display = "inline-block";
					next.textContent = "Ok, Continuar";
					back.style.display = "none";
				} else {
					puntosNum.textContent =  puntosCount
					popUp.style.display = "block";
					popUpTitle.textContent = "PARECE QUE NO ES...";
					popUpMensaje.textContent = "Intenta de Nuevo";
					next.parentNode.style.display = "block";
					next.style.display = "none";
					back.style.display = "inline-block";
					back.textContent = "¡ ok !";
				}
			}
		}
		function borrarYSiguiente(){
			contentInput.remove();
			siguientePregunta();
		}

		btnPista.addEventListener('click', comprarLetras);
		btnComprobar.addEventListener('click', comprobar);
		next.addEventListener('click', borrarYSiguiente);
		back.addEventListener('click', function(){popUp.style.display = "none"});



	