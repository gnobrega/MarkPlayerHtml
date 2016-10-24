/**
 * Media
 */
var Media = function() {
    
    //Localização da mídia
    this.file = null;
    
    //Duração de exibição
    this.duration = null;
    
    //Seta a localização da mídia
    this.setFile = function(file) {
        this.file = file;
    }
    
    //Recupera a localização da mídia
    this.getFile = function() {
        return this.file;
    }
    
    //Recupera o delay
    this.getDuration = function() {
        return this.duration;
    }
    
    //Recupera a localização da mídia
    this.getFile = function() {
        return this.file;
    }
    
    //Seta a duração de exibição
    this.setDuration = function(duration) {
        this.duration = duration;
    }
}