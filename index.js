(async () => {
    const response = await fetch('https://raw.githubusercontent.com/MeforgersGames/TheGameFile/master/trElementler.json');
    const text = await response.text();
    const data = JSON.parse(text);
    const container = document.getElementById("container");

    for (const elementName in data) {
        if (data.hasOwnProperty(elementName)) {
            const element = data[elementName];
            const block = document.createElement('div');
            block.classList.add('element');
            block.innerHTML = `<h4>${element.number}</h4><h1>${element.symbol}</h1><span class="tooltip">${element.summary} <a href="${element.source}" target="_blank">Devamını Oku...</a></span>`;
            block.id = `element${element.number}`;
            // ... Kategoriye göre arka plan rengini belirleme kodunuz ...
            if (element.category.includes('diatomik olmayan')) {
                block.style.backgroundColor = '#00c7ff';
            } else if (element.category.includes('alkali')) {
                block.style.backgroundColor = '#e000a0';
            } else if (element.category.includes('alkalin')) {
                block.style.backgroundColor = '#ff005e';
            } else if (element.category.includes('geçiş')) {
                block.style.backgroundColor = '#ff7a14';
            } else if (element.category.includes('sonra geçiş')) {
                block.style.backgroundColor = '#00ff6c';
            } else if (element.category.includes('soylu gaz')) {
                block.style.backgroundColor = '#004eae';
            } else if (element.category.includes('lantanidler')) {
                block.style.backgroundColor = '#00ffff';
            } else if (element.category.includes('aktinidler')) {
                block.style.backgroundColor = '#00ffcc';
            } else {
                block.style.backgroundColor = '#b8ff57';
            }
            container.appendChild(block);
        }
    }
    
    const elements = document.querySelectorAll('.element');

    elements.forEach(element => {
        const tooltip = document.getElementById('fixed-tooltip');

        const elements = document.querySelectorAll('.element');
        
        elements.forEach(element => {
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
    });
})();