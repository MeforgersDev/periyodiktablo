(async () => {
    const response = await fetch('https://raw.githubusercontent.com/MeforgersGames/periyodiktablo/master/elementler.json');
    const text = await response.text();
    const data = JSON.parse(text);
    const container = document.getElementById("container");
    

    for (const elementName in data) {
        if (data.hasOwnProperty(elementName)) {
            const element = data[elementName];
            const block = document.createElement('div');
            block.classList.add('element');
            // `data-category` özelliğini ekleyin
            block.setAttribute('data-category', element.category);
            block.innerHTML = `<h4>${element.number}</h4><h1>${element.symbol}</h1><span class="tooltip">${element.summary} <a href="${element.source}" target="_blank">Devamını Oku...</a></span>`;
            block.id = `element${element.number}`;
            container.appendChild(block);
        }
    }

    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        const tooltip = document.getElementById('fixed-tooltip');
        
        element.addEventListener('mouseenter', (e) => {
            const elementData = data[e.target.id.replace('element', '')];
            if (elementData) {
                tooltip.innerHTML = `${elementData.summary} <a href="${elementData.source}" target="_blank">Devamını Oku...</a>`;
                tooltip.style.display = 'block'; // tooltip'i görünür yap
            }
        });
    
        element.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none'; // tooltip'i gizle
        });
    });
})();
