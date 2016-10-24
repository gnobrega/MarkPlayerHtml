/**
 * Region
 */
var Region = function() {
    
    //Id único da região
    this.id = String("region-" + Math.random()).replace('.', '');
    
    //Lista de layouts
    this.medias = new Array();
    this.currentMedia = null;
    
    //Dimensões e posições
    this.width = null;
    this.height = null;
    this.x = null;
    this.y = null;
    
    //Identifica a região principal do layout
    this.main = null;
    
    //Define a largura do layout
    this.setWidth = function(width) {
        this.width = width;
    }
    
    //Define a altura do layout
    this.setHeight = function(height) {
        this.height = height;
    }
    
    //Define a posição de x
    this.setX = function(x) {
        this.x = x;
    }
    
    //Define a posição de y
    this.setY = function(y) {
        this.y = y;
    }
    
    //Define a propriedade main
    this.setMain = function(main) {
        this.main = main;
    }
    
    //Gera os objetos filhos a partir do conteúdo do xml
    this.dataToObjects = function(dataXml) {
        var thisObj = this;
        $(dataXml).each(function() {
            var media = new Media();
            media.setFile($(this).attr('file'));
            media.setDuration($(this).attr('duration'));

            //Adiciona à lista de mídias
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
    
    //Inicia a sequência de exibição
    this.play = function() {
        
        //Exibe a mídia atual
        var media = this.getCurrentMedia();
        
        //Seta o caminho da mídia
        this.setFile(media.getFile());
                
        //Agenda a próxima exibição
        this.scheduleNext();
    }
    
    //Avança para a próxima mídia
    this.next = function() {
        if( this.medias == null || this.medias.length == 0 ) {
            return null;
        }
        if( this.currentMedia == null || this.currentMedia >= this.medias.length ) {
            this.currentMedia = 0;
        } else {
            this.currentMedia ++;
        }
        
        //Executa a nova mídia
        this.play();
    }
    
    //Seta a mídia que será exibida na região
    this.setFile = function(file) {
        var iframe = this.getFrame();
        iframe.attr('src', file + '?nocache='+Math.random());
    }
    
    //Acessa o frame da região
    this.getFrame = function() {
        return $("#"+this.id);
    }
    
    //Recupera a mídia atual
    this.getCurrentMedia = function() {
        if( this.medias == null || this.medias.length == 0 ) {
            return null;
        }
        if( this.currentMedia == null || this.currentMedia >= this.medias.length ) {
            this.currentMedia = 0;
        }
        return this.medias[this.currentMedia];
    }
    
    //Agenda a próxima exibição
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