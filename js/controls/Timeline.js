/**
 * Timeline
 */
var Timeline = function() {
    
    //Lista de layouts
    this.layouts = new Array();
    this.currentLayout = null;
    
    //Gera os objetos filhos a partir do conteúdo do xml
    this.dataToObjects = function(dataXml) {
        var thisObj = this;
        
        $(dataXml).each(function() {
            var layout = new Layout();
            layout.setWidth($(this).attr('width'));
            layout.setHeight($(this).attr('height'));
            
            var dataXmlRegions = $(this).find('region');
            layout.dataToObjects(dataXmlRegions);
            
            //Adiciona à lista de layouts
            thisObj.layouts.push(layout);
        });
    }
    
    //Renderiza o conteúdo
    this.render = function() {
        var layout = this.getCurrentLayout();
        layout.render();
    }
    
    //Recupera o layout atual
    this.getCurrentLayout = function() {
        if( this.layouts == null || this.layouts.length == 0 ) {
            return null;
        }
        if( this.currentLayout == null || this.currentLayout >= this.layouts.length ) {
            this.currentLayout = 0;
        }
        return this.layouts[this.currentLayout];
    }
    
    //Inicia a sequência de exibição
    this.play = function() {
        var layout = this.getCurrentLayout();
        layout.play();
    }
}