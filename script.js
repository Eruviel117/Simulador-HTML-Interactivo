let bestFitBlocks = [];
let worstFitBlocks = [];
let processQueue = [];
let totalMemory = 0;


document.getElementById("btnInicializar").addEventListener("click", function () {

    totalMemory = parseInt(document.getElementById("totalMemory").value);
    let partitions = parseInt(document.getElementById("numPartitions").value);

    bestFitBlocks = [];
    worstFitBlocks = [];

    let sizePerPartition = Math.floor(totalMemory / partitions);

    for (let i = 0; i < partitions; i++) {
        let block = {
            size: sizePerPartition,
            free: true,
            process: null
        };

        bestFitBlocks.push({ ...block });
        worstFitBlocks.push({ ...block });
    }

    renderMemory();
    updateStats();
});


document.getElementById("btnAgregar").addEventListener("click", function () {

    let name = document.getElementById("processName").value;
    let size = parseInt(document.getElementById("processSize").value);

    if (!name || size <= 0) return;

    processQueue.push({ name, size });
    renderQueue();
});

// ================= EJECUTAR PASO =================
document.getElementById("btnPaso").addEventListener("click", function () {

    if (processQueue.length === 0) return;

    let process = processQueue.shift();

    bestFit(process.name, process.size);
    worstFit(process.name, process.size);

    renderMemory();
    renderQueue();
    updateStats();
});


document.getElementById("btnTodos").addEventListener("click", function () {

    while (processQueue.length > 0) {
        let process = processQueue.shift();
        bestFit(process.name, process.size);
        worstFit(process.name, process.size);
    }

    renderMemory();
    renderQueue();
    updateStats();
});

document.getElementById("btnReiniciar").addEventListener("click", function () {
    bestFitBlocks = [];
    worstFitBlocks = [];
    processQueue = [];
    renderMemory();
    renderQueue();
    updateStats();
});


function bestFit(name, size) {

    let bestIndex = -1;
    let minDiff = Infinity;

    for (let i = 0; i < bestFitBlocks.length; i++) {
        let block = bestFitBlocks[i];

        if (block.free && block.size >= size) {
            let diff = block.size - size;

            if (diff < minDiff) {
                minDiff = diff;
                bestIndex = i;
            }
        }
    }

    if (bestIndex !== -1) {
        let block = bestFitBlocks[bestIndex];

        // DIVIDIR BLOQUE (fragmentación real)
        bestFitBlocks.splice(bestIndex, 1,
            { size: size, free: false, process: name },
            { size: block.size - size, free: true, process: null }
        );
    }
}


function worstFit(name, size) {

    let worstIndex = -1;
    let maxDiff = -1;

    for (let i = 0; i < worstFitBlocks.length; i++) {
        let block = worstFitBlocks[i];

        if (block.free && block.size >= size) {
            let diff = block.size - size;

            if (diff > maxDiff) {
                maxDiff = diff;
                worstIndex = i;
            }
        }
    }

    if (worstIndex !== -1) {
        let block = worstFitBlocks[worstIndex];

        worstFitBlocks.splice(worstIndex, 1,
            { size: size, free: false, process: name },
            { size: block.size - size, free: true, process: null }
        );
    }
}


function renderMemory() {

    let bfContainer = document.getElementById("bestFitMemory");
    let wfContainer = document.getElementById("worstFitMemory");

    bfContainer.innerHTML = "";
    wfContainer.innerHTML = "";

    bestFitBlocks.forEach(block => {
        let div = document.createElement("div");
        div.className = "bloque " + (block.free ? "libre" : "ocupado");
        div.innerText = block.free ? 
            "Libre - " + block.size + " KB" :
            block.process + " - " + block.size + " KB";
        bfContainer.appendChild(div);
    });

    worstFitBlocks.forEach(block => {
        let div = document.createElement("div");
        div.className = "bloque " + (block.free ? "libre" : "ocupado");
        div.innerText = block.free ?
            "Libre - " + block.size + " KB" :
            block.process + " - " + block.size + " KB";
        wfContainer.appendChild(div);
    });
}


function renderQueue() {

    let container = document.getElementById("listaProcesos");
    container.innerHTML = "";

    processQueue.forEach(p => {
        let div = document.createElement("div");
        div.innerText = p.name + " - " + p.size + " KB";
        container.appendChild(div);
    });
}

// ================= ESTADÍSTICAS =================
function updateStats() {

    let bfFrag = calculateFragmentation(bestFitBlocks);
    let wfFrag = calculateFragmentation(worstFitBlocks);

    let bfUsed = calculateUsed(bestFitBlocks);
    let wfUsed = calculateUsed(worstFitBlocks);

    document.getElementById("bfFragmentacion").innerText = bfFrag + " KB";
    document.getElementById("wfFragmentacion").innerText = wfFrag + " KB";

    document.getElementById("bfUso").innerText = bfUsed.toFixed(1) + "%";
    document.getElementById("wfUso").innerText = wfUsed.toFixed(1) + "%";

    document.getElementById("bfProcesos").innerText = countProcesses(bestFitBlocks);
    document.getElementById("wfProcesos").innerText = countProcesses(worstFitBlocks);

    updateComparison();
}


function calculateFragmentation(blocks) {
    return blocks
        .filter(b => b.free)
        .reduce((sum, b) => sum + b.size, 0);
}

function calculateUsed(blocks) {
    let used = blocks
        .filter(b => !b.free)
        .reduce((sum, b) => sum + b.size, 0);

    return (used / totalMemory) * 100;
}

function countProcesses(blocks) {
    return blocks.filter(b => !b.free).length;
}


function updateComparison() {

    let table = document.getElementById("tablaComparacion");

    let bfFrag = calculateFragmentation(bestFitBlocks);
    let wfFrag = calculateFragmentation(worstFitBlocks);

    table.innerHTML = `
        <tr>
            <td>Fragmentación</td>
            <td>${bfFrag}</td>
            <td>${wfFrag}</td>
            <td>${bfFrag < wfFrag ? "Best Fit" : "Worst Fit"}</td>
        </tr>
    `;
}
