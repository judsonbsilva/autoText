+function($){
	'use strict';
	
	/* Funcoes uteis */
	var fn = {
	/*  Recebe texto, e indice
		Retorna o texto que vem antes do indice */
		eachLetter: function(text, i){
			return text.substr(0,i);
		},
	/* Anula o loop do autoText, se textClean positivo o val do input fica vazio */
		clean: function( nodes , textClean){
			clearInterval(nodes.data('loop'));
			nodes.removeData('loop');
			if( textClean )
				nodes.val('');
			return nodes;
		}
	}


	/* Metodo do jQuery */

	$.fn.autoText = function( text, callback ){

		/* Argumentos this, a barra que fica piscando, e o indice*/
		var _this = this,
			bar = '',
			i = 0;

		/* Desativa o autoText */
		if( text === false ){
			fn.clean( _this , true);
			return _this;
		}

		/* Salva nestes nodes a funcao loop do interval */
		_this.data('loop', setInterval(function(){
			/* Se o indice for par, coloca a barra */
			bar =  (i % 2 == 0 || i != text.length ) ? '|' : '';
			/* Enquanto o indixe menor doque o texto */
			if( i <= text.length ) //Atribue o valor para o input
				_this.val( fn.eachLetter(text, i++) + bar ); 
			else {
				/* Quando a frase tiver terminado, limpa e chama callback */
				fn.clean( _this );
				setTimeout(function(){
					_this.val('');
					if( callback) callback.call(_this);
				}, 800);
			}
		}, 100));

		return _this;	
	};

	/* Desliga o autoText */
	$.fn.offText = function(){
		return $(this).autoText(false);
	};

}(jQuery);