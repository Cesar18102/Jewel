if(window.platform.description.match(/Android|android|Mobile|mobile/)){
    document.write("<link rel = 'stylesheet' href = '../styles/" + document.children[0].id + "Mobile.css'/>");
    document.write("<link rel = 'stylesheet' href = '../styles/stylesGeneralMobile.css'/>");	
}
else{
    document.write("<link rel = 'stylesheet' href = '../styles/" + document.children[0].id + "PC.css'/>");
    document.write("<link rel = 'stylesheet' href = '../styles/stylesGeneralPC.css'/>");	
}