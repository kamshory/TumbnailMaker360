document.addEventListener("DOMContentLoaded", function(e1) {

    document.body.addEventListener('paste', (e2) => {
        const item = e2.clipboardData.items[0];
        if (item.type.indexOf('image') === 0) {
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = function() {
                const imageUrl = reader.result;
                document.querySelector('.image').style.backgroundImage = `url('${imageUrl}')`;
            };
            reader.readAsDataURL(blob);
        }
    });

    document.querySelector('#title').addEventListener('click', function(e2){
        e2.target.setAttribute('contenteditable', 'true')
    });
    document.querySelector('#title').addEventListener('blur', function(e2){
        e2.target.removeAttribute('contenteditable')
    });

    document.querySelector('#logo').addEventListener('click', function(e2){
        e2.target.blur();
        html2canvas(document.querySelector("body")).then(canvas => {
            const dataURL = canvas.toDataURL("image/jpeg"); 
            let filename = document.querySelector('#title').textContent;
            filename = filename.trim();
            if(filename == '')
            {
                filename = 'thumbnail';
            }
            filename = filename + '.jpg';
            saveAs(dataURL, filename);
        });
    });
});

