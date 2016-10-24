/**
 * Classe principal
 */
var App = function() {
    
    //Lista de timelines
    this.timelines = new Array();
    this.currentTimeline = null;
    
    //In�cio
    this.initialize = function() {
        
        //Inicia a execu��o
        this.start();
    }
    
    //Carrega os dados do xml
    this.start = function() {
        var thisApp = this;
        
        //Carrega os dados da playlist
        $.ajax({
            url: App.DATA_FILE,
            success: function(rs) {
                
                //Conver os dados do xml em objeto
                var dataXml = $(rs).find('timeline');
                thisApp.dataToObjects(dataXml);
                
                //Renderiza o conte�do
                var currentTimeline = thisApp.getCurrentTimeline();
                currentTimeline.render();
                
                //Inicia a sequ�ncia de exibi��o
                currentTimeline.play();
            },
            contentType: 'text/xml'
        });
    };
    
    //Gera os objetos a partir do conte�do do xml
    this.dataToObjects = function(dataXml) {
        var thisApp = this;
        $(dataXml).each(function() {
            var timeline = new Timeline();
            var dataXmlLayout = $(this).find('layout');
            timeline.dataToObjects(dataXmlLayout);

            //Adiciona � lista de timelines
            thisApp.timelines.push(timeline);
        });
    }
    
    //Recupera a timeline atual
    this.getCurrentTimeline = function() {
        if( this.timelines == null || this.timelines.length == 0 ) {
            return null;
        }
        if( this.currentTimeline == null || this.currentTimeline >= this.timelines.length ) {
            this.currentTimeline = 0;
        }
        return this.timelines[this.currentTimeline];
    }
}

/**
 * Static
 */

//Localiza��o do arquivo de playlist
App.DATA_FILE = './data/data.xml';

//Design Pattern Singleton */
App.instance = null
App.getInstance = function() {
    if( this.instance == null ) {
        App.instance = new App();
    }
    return App.instance;
};

//Adiciona um conte�do � tela
App.appendHtml = function(element) {
    $("#content").append(element);
}