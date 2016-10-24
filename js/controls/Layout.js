/**
 * Layout
 */
var Layout = function() {
    
    //Lista de layouts
    this.regions = new Array();
    
    //Dimensões e posições
    this.width = null;
    this.height = null;
    
    //Define a largura do layout
    this.setWidth = function(width) {
        this.width = width;
    }
    
    //Define a altura do layout
    this.setHeight = function(height) {
        this.height = height;
    }
    
    //Gera os objetos filhos a partir do conteúdo do xml
    this.dataToObjects = function(dataXml) {
        var thisObj = this;
        $(dataXml).each(function() {
            var region = new Region();
            region.setWidth($(this).attr('width'));
            region.setHeight($(this).attr('height'));
            region.setX($(this).attr('x'));
            region.setY($(this).attr('y'));
            region.setMain($(this).attr('main'));
            
            //Recupera os nós de mídias
            var dataXmlMedias = $(this).find('media');
            region.dataToObjects(dataXmlMedias);
            
            //Adiciona à lista de regiões
            thisObj.regions.push(region);
        });
    }
    
    //Renderiza o conteúdo
    this.render = function() {
        if( this.regions.length > 0 ) {
            for( i = 0; i < this.regions.length; i++ ) {
                this.regions[i].render();
            }
        }
    }
    
    //Inicia a sequência de exibição
    this.play = function() {
        if( this.regions.length > 0 ) {
            for( i = 0; i < this.regions.length; i++ ) {
                this.regions[i].play();
            }
        }
    }
}