/**
 * Media
 */
var Media = function() {
    
    //Localiza��o da m�dia
    this.file = null;
    
    //Dura��o de exibi��o
    this.duration = null;
    
    //Seta a localiza��o da m�dia
    this.setFile = function(file) {
        this.file = file;
    }
    
    //Recupera a localiza��o da m�dia
    this.getFile = function() {
        return this.file;
    }
    
    //Recupera o delay
    this.getDuration = function() {
        return this.duration;
    }
    
    //Recupera a localiza��o da m�dia
    this.getFile = function() {
        return this.file;
    }
    
    //Seta a dura��o de exibi��o
    this.setDuration = function(duration) {
        this.duration = duration;
    }
}