/**
 * Region
 */
var Region = function() {
    
    //Id �nico da regi�o
    this.id = String("region-" + Math.random()).replace('.', '');
    
    //Lista de layouts
    this.medias = new Array();
    this.currentMedia = null;
    
    //Dimens�es e posi��es
    this.width = null;
    this.height = null;
    this.x = null;
    this.y = null;
    
    //Identifica a regi�o principal do layout
    this.main = null;
    
    //Define a largura do layout
    this.setWidth = function(width) {
        this.width = width;
    }
    
    //Define a altura do layout
    this.setHeight = function(height) {
        this.height = height;
    }
    
    //Define a posi��o de x
    this.setX = function(x) {
        this.x = x;
    }
    
    //Define a posi��o de y
    this.setY = function(y) {
        this.y = y;
    }
    
    //Define a propriedade main
    this.setMain = function(main) {
        this.main = main;
    }
    
    //Gera os objetos filhos a partir do conte�do do xml
    this.dataToObjects = function(dataXml) {
        var thisObj = this;
        $(dataXml).each(function() {
            var media = new Media();
            media.setFile($(this).attr('file'));
            media.setDuration($(this).attr('duration'));

            //Adiciona � lista de m�dias
            thisObj.medias.push(media);
        });
    }
    
    //Cria o html
    this.render = function() {
        var iframe = $("<iframe />");
        iframe.attr("id", this.id);
        iframe.attr("src", "");
        iframe.attr("width", this.width+"px");
        iframe.attr("height", this.height+"px");
        iframe.css("left", this.x+"px");
        iframe.css("top", this.y+"px");

        App.appendHtml(iframe.get(0));
    }
    
    //Inicia a sequ�ncia de exibi��o
    this.play = function() {
        
        //Exibe a m�dia atual
        var media = this.getCurrentMedia();
        
        //Seta o caminho da m�dia
        this.setFile(media.getFile());
                
        //Agenda a pr�xima exibi��o
        this.scheduleNext();
    }
    
    //Avan�a para a pr�xima m�dia
    this.next = function() {
        if( this.medias == null || this.medias.length == 0 ) {
            return null;
        }
        if( this.currentMedia == null || this.currentMedia >= this.medias.length ) {
            this.currentMedia = 0;
        } else {
            this.currentMedia ++;
        }
        
        //Executa a nova m�dia
        this.play();
    }
    
    //Seta a m�dia que ser� exibida na regi�o
    this.setFile = function(file) {
        var iframe = this.getFrame();
        iframe.attr('src', file + '?nocache='+Math.random());
    }
    
    //Acessa o frame da regi�o
    this.getFrame = function() {
        return $("#"+this.id);
    }
    
    //Recupera a m�dia atual
    this.getCurrentMedia = function() {
        if( this.medias == null || this.medias.length == 0 ) {
            return null;
        }
        if( this.currentMedia == null || this.currentMedia >= this.medias.length ) {
            this.currentMedia = 0;
        }
        return this.medias[this.currentMedia];
    }
    
    //Agenda a pr�xima exibi��o
    this.scheduleNext = function() {
        var thisObj = this;
        var media = this.getCurrentMedia();
        var duration = media.getDuration() * 1000;
        if( duration ) {
            setTimeout(function() {
                thisObj.next();
            }, duration);
        }
    }
}