/**
 * Layout
 */
var Layout = function() {
    
    //Lista de layouts
    this.regions = new Array();
    
    //Dimens�es e posi��es
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
    
    //Gera os objetos filhos a partir do conte�do do xml
    this.dataToObjects = function(dataXml) {
        var thisObj = this;
        $(dataXml).each(function() {
            var region = new Region();
            region.setWidth($(this).attr('width'));
            region.setHeight($(this).attr('height'));
            region.setX($(this).attr('x'));
            region.setY($(this).attr('y'));
            region.setMain($(this).attr('main'));
            
            //Recupera os n�s de m�dias
            var dataXmlMedias = $(this).find('media');
            region.dataToObjects(dataXmlMedias);
            
            //Adiciona � lista de regi�es
            thisObj.regions.push(region);
        });
    }
    
    //Renderiza o conte�do
    this.render = function() {
        if( this.regions.length > 0 ) {
            for( i = 0; i < this.regions.length; i++ ) {
                this.regions[i].render();
            }
        }
    }
    
    //Inicia a sequ�ncia de exibi��o
    this.play = function() {
        if( this.regions.length > 0 ) {
            for( i = 0; i < this.regions.length; i++ ) {
                this.regions[i].play();
            }
        }
    }
}