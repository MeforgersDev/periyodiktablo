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
            block.setAttribute('data-category', element.category);
            block.innerHTML = `<h4>${element.number}</h4><h1>${element.symbol}</h1><span class="tooltip">${element.summary} <a href="${element.source}" target="_blank">Devamını Oku...</a></span>`;
            block.id = `element${element.number}`;
            container.appendChild(block);
        }
    }
})();

function createElectronOrbit(orbitIndex) {
    const orbit = document.createElement('div');
    orbit.className = 'electron-orbit';
    orbit.style.width = `${30 + orbitIndex * 20}px`;
    orbit.style.height = `${30 + orbitIndex * 20}px`;
    return orbit;
}
  
function createElectron(orbit, orbitIndex) {
    const electron = document.createElement('div');
    electron.className = 'electron';
    electron.style.animation = `electron-orbit-animation ${5 + orbitIndex}s linear infinite`;
    electron.style.transformOrigin = `${15 + orbitIndex * 10}px center`;
    electron.style.transform = 'rotate(0deg) translateX(50px)';
    orbit.appendChild(electron);
}
  
function updateAtomModel(elementNumber) {
    const electronConfiguration = calculateElectronConfiguration(elementNumber);
    
    const container = document.getElementById('atom-model-container');
    container.innerHTML = '';
  
    const atomCore = document.createElement('div');
    atomCore.id = 'atom-core';
    container.appendChild(atomCore);
  
    electronConfiguration.forEach((electronsInShell, index) => {
        const orbit = createElectronOrbit(index);
        container.appendChild(orbit);
  
        for(let i = 0; i < electronsInShell; i++) {
            createElectron(orbit, index);
        }
    });
}
  
function calculateElectronConfiguration(atomNumber) {
    const shells = [2, 8, 8, 18];
    let electronsLeft = atomNumber;
    return shells.map(shellCapacity => {
        if (electronsLeft > shellCapacity) {
            electronsLeft -= shellCapacity;
            return shellCapacity;
        } else {
            const electronsInThisShell = electronsLeft;
            electronsLeft = 0;
            return electronsInThisShell;
        }
    }).filter(n => n > 0);
}

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let tooltipVisible = false;
let lastTouchedElement = null;

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        if (isMobileDevice) {
            element.addEventListener('touchstart', (e) => {
                const elementData = data[e.currentTarget.id.replace('element', '')];
                if (elementData) {
                    e.preventDefault(); // Ekstra tıklama olayını engelle
                    if (tooltipVisible && lastTouchedElement === e.currentTarget) {
                        tooltip.style.display = 'none';
                        tooltipVisible = false;
                        lastTouchedElement = null;
                    } else {
                        tooltip.innerHTML = `${elementData.summary} <a href="${elementData.source}" target="_blank">Devamını Oku...</a>`;
                        tooltip.style.display = 'block';
                        tooltipVisible = true;
                        lastTouchedElement = e.currentTarget;
                    }
                }
            });
        } else {
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
        }
    });
});