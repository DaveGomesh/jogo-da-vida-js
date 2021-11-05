function mudarClasse(id, isHover=false){
    if(isHover){
        const pincel = document.querySelector("input#modoPincel");
        if(!pincel.checked){
            return;
        }
        const td = document.querySelector(`td#${id}`);
        td.className = "viva";
        return;
    }
    const td = document.querySelector(`td#${id}`);
    const status = td.className == "viva" ? "morta":"viva";
    td.className = status;
}