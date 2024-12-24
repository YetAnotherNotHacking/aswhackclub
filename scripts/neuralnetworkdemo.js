document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.network-container');
    const svg = container.querySelector('.connections');
    
    function updateConnections() {
        // Clear existing lines
        svg.innerHTML = '';
        
        // Set SVG dimensions
        const containerRect = container.getBoundingClientRect();
        svg.setAttribute('width', containerRect.width);
        svg.setAttribute('height', containerRect.height);
        
        // Get all nodes
        const nodes = container.querySelectorAll('.node');
        
        // Draw connections between layers
        nodes.forEach(fromNode => {
            const fromLayer = parseInt(fromNode.dataset.layer);
            const nextLayer = fromLayer + 1;
            
            // Find nodes in next layer
            const nextNodes = container.querySelectorAll(`.node[data-layer="${nextLayer}"]`);
            
            nextNodes.forEach(toNode => {
                // Get node positions
                const fromRect = fromNode.getBoundingClientRect();
                const toRect = toNode.getBoundingClientRect();
                
                // Calculate positions relative to container
                const x1 = fromRect.left - containerRect.left + (fromRect.width / 2);
                const y1 = fromRect.top - containerRect.top + (fromRect.height / 2);
                const x2 = toRect.left - containerRect.left + (toRect.width / 2);
                const y2 = toRect.top - containerRect.top + (toRect.height / 2);
                
                // Create line
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                line.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
                line.setAttribute('stroke-width', '1');
                
                svg.appendChild(line);
            });
        });
    }
    
    // Update connections initially and on window resize
    updateConnections();
    window.addEventListener('resize', updateConnections);
    
    // Add a small delay to initial update to ensure proper positioning
    setTimeout(updateConnections, 100);
});
